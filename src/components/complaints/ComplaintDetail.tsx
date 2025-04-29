import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, Clock, MapPin, User, Calendar, CheckCircle, 
  AlertTriangle, MessageSquare, Paperclip, ArrowLeft, Upload 
} from "lucide-react";
import { ComplaintStatus } from "@/types";
import { getCurrentUser, hasRole } from "@/utils/auth";
import { createNotification } from "@/utils/notifications";
import { toast } from "sonner";

// Mock complaint data
const mockComplaint = {
  id: "c1",
  registrationNumber: "PNC-250410-01",
  title: "Vol avec effraction",
  description: "Le plaignant a constaté en rentrant à son domicile que la porte d'entrée avait été forcée. Plusieurs objets de valeur ont été dérobés, notamment un ordinateur portable, des bijoux et du numéraire. Aucun témoin n'a été identifié à ce stade.",
  complaintDate: new Date(2025, 3, 10),
  incidentDate: new Date(2025, 3, 9),
  status: "pending-assignment" as ComplaintStatus,
  location: "Rue de Rivoli, Paris 1er",
  complaintType: "burglary",
  registeredById: "4", // ID of reception officer
  stationId: "s1",
  createdAt: new Date(2025, 3, 10, 10, 15),
  updatedAt: new Date(2025, 3, 10, 10, 15),
};

// Mock updates for the complaint
const mockUpdates = [
  {
    id: "u1",
    complaintId: "c1",
    content: "Création de la plainte suite à la déclaration du plaignant.",
    createdById: "4", // Reception officer
    createdAt: new Date(2025, 3, 10, 10, 15),
    userName: "Sophie Bernard",
    userRole: "Officier d'Accueil",
  },
];

// Mock investigators that can be assigned to the complaint
const mockInvestigators = [
  { id: "i1", name: "Dubois, Marie" },
  { id: "i2", name: "Leroy, Thomas" },
  { id: "i3", name: "Petit, Julie" },
  { id: "i4", name: "Moreau, Michel" },
  { id: "i5", name: "Simon, Claire" },
];

interface ComplaintDetailProps {
  complaintId: string;
  onBack: () => void;
}

const ComplaintDetail = ({ complaintId, onBack }: ComplaintDetailProps) => {
  // In a real app, you would fetch the complaint data based on the ID
  const [complaint] = useState(mockComplaint);
  const [updates, setUpdates] = useState(mockUpdates);
  const [selectedInvestigators, setSelectedInvestigators] = useState<string[]>([]);
  const [newUpdateContent, setNewUpdateContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const currentUser = getCurrentUser();
  const isStationAdmin = hasRole("station-admin");
  const isInvestigator = hasRole("investigator");

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleAssignInvestigators = () => {
    if (selectedInvestigators.length === 0) {
      toast.error("Sélection requise", {
        description: "Veuillez sélectionner au moins un enquêteur.",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Add an update to the complaint history
      const investigatorNames = selectedInvestigators.map(id => 
        mockInvestigators.find(inv => inv.id === id)?.name
      ).join(", ");
      
      const newUpdate = {
        id: `u${updates.length + 1}`,
        complaintId: complaint.id,
        content: `Plainte assignée à ${investigatorNames}`,
        createdById: currentUser?.id || "",
        createdAt: new Date(),
        userName: `${currentUser?.firstName} ${currentUser?.lastName}`,
        userRole: "Commissaire de Poste",
      };

      setUpdates([...updates, newUpdate]);
      
      // Notify that the complaint has been assigned
      if (currentUser) {
        createNotification(
          "Plainte assignée",
          `La plainte ${complaint.registrationNumber} a été assignée`,
          "success",
          currentUser.id
        );
      }

      // Reset state and show success message
      setSelectedInvestigators([]);
      setIsSubmitting(false);
      toast.success("Affectation réussie", {
        description: `La plainte a été assignée à ${investigatorNames}`,
      });
    }, 1000);
  };

  const handleAddUpdate = () => {
    if (!newUpdateContent.trim()) {
      toast.error("Contenu requis", {
        description: "Veuillez saisir le contenu de la mise à jour.",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Add the update to the complaint history
      const newUpdate = {
        id: `u${updates.length + 1}`,
        complaintId: complaint.id,
        content: newUpdateContent,
        createdById: currentUser?.id || "",
        createdAt: new Date(),
        userName: `${currentUser?.firstName} ${currentUser?.lastName}`,
        userRole: isInvestigator ? "Enquêteur" : "Officier d'Accueil",
      };

      setUpdates([...updates, newUpdate]);
      
      // Reset state and show success message
      setNewUpdateContent("");
      setIsSubmitting(false);
      toast.success("Mise à jour ajoutée", {
        description: "Votre mise à jour a été ajoutée à la plainte.",
      });
    }, 1000);
  };

  const handleCloseInvestigation = () => {
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Add closure update to the complaint history
      const newUpdate = {
        id: `u${updates.length + 1}`,
        complaintId: complaint.id,
        content: "Demande de clôture de l'enquête. En attente de validation par le commissaire.",
        createdById: currentUser?.id || "",
        createdAt: new Date(),
        userName: `${currentUser?.firstName} ${currentUser?.lastName}`,
        userRole: "Enquêteur",
      };

      setUpdates([...updates, newUpdate]);
      
      // Notify about the closure request
      if (currentUser) {
        createNotification(
          "Demande de clôture",
          `Une demande de clôture a été initiée pour la plainte ${complaint.registrationNumber}`,
          "info",
          currentUser.id
        );
      }

      // Reset state and show success message
      setIsSubmitting(false);
      toast.success("Demande envoyée", {
        description: "Votre demande de clôture a été transmise au commissaire.",
      });
    }, 1000);
  };

  // Function to render the status badge based on complaint status
  const renderStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case "pending-assignment":
        return <div className="complaint-status-pending">En attente</div>;
      case "assigned":
        return <div className="complaint-status-assigned">Assignée</div>;
      case "in-progress":
        return <div className="complaint-status-in-progress">En cours</div>;
      case "closed":
        return <div className="complaint-status-closed">Clôturée</div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{complaint.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{complaint.registrationNumber}</span>
            <span>•</span>
            <span>Enregistrée le {formatDate(complaint.complaintDate)}</span>
          </div>
        </div>
        <div className="ml-auto">
          {renderStatusBadge(complaint.status)}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations générales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium">Type de plainte</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {complaint.complaintType === "burglary" && "Cambriolage"}
                    {complaint.complaintType === "theft" && "Vol"}
                    {complaint.complaintType === "assault" && "Agression"}
                    {complaint.complaintType === "fraud" && "Fraude"}
                    {complaint.complaintType === "vandalism" && "Vandalisme"}
                    {complaint.complaintType === "harassment" && "Harcèlement"}
                    {complaint.complaintType === "other" && "Autre"}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Statut actuel</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {complaint.status === "pending-assignment" && "En attente d'assignation"}
                    {complaint.status === "assigned" && "Assignée à un enquêteur"}
                    {complaint.status === "in-progress" && "Enquête en cours"}
                    {complaint.status === "closed" && "Enquête clôturée"}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Date de l'incident</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(complaint.incidentDate)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Date d'enregistrement</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatDate(complaint.complaintDate)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Lieu de l'incident</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{complaint.location}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Enregistrée par</div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>Officier d'Accueil</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description détaillée</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{complaint.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pièces jointes</CardTitle>
              <CardDescription>Documents liés à cette plainte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-md border-muted">
                <Paperclip className="h-10 w-10 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">Aucune pièce jointe</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historique de la plainte</CardTitle>
              <CardDescription>Chronologie des actions et commentaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {updates.map((update, index) => (
                  <div key={update.id} className="relative pl-6 pb-6">
                    {/* Timeline connector */}
                    {index < updates.length - 1 && (
                      <div className="absolute left-2.5 top-2.5 bottom-0 w-0.5 bg-muted-foreground/20"></div>
                    )}
                    
                    {/* Timeline marker */}
                    <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-police-lightblue flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-police-blue"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-2">
                        <p className="font-medium text-sm">{update.userName} <span className="text-xs font-normal text-muted-foreground">({update.userRole})</span></p>
                        <p className="text-xs text-muted-foreground">{formatDateTime(update.createdAt)}</p>
                      </div>
                      <p className="text-sm">{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {isInvestigator || hasRole("reception-officer") ? (
                <div className="mt-6 border-t pt-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="new-update" className="text-sm font-medium">
                        Ajouter un commentaire ou une mise à jour
                      </label>
                      <Textarea
                        id="new-update"
                        placeholder="Saisissez votre mise à jour ici..."
                        className="mt-2"
                        rows={3}
                        value={newUpdateContent}
                        onChange={(e) => setNewUpdateContent(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        type="button"
                        className="flex items-center gap-1"
                      >
                        <Paperclip className="h-3.5 w-3.5" />
                        <span>Joindre un fichier</span>
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleAddUpdate}
                        disabled={isSubmitting || !newUpdateContent.trim()}
                        className="bg-police-navy hover:bg-opacity-90 flex items-center gap-1"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Soumettre</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="actions" className="space-y-6 mt-6">
          {isStationAdmin && complaint.status === "pending-assignment" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assigner à des enquêteurs</CardTitle>
                <CardDescription>
                  Sélectionnez un ou plusieurs enquêteurs pour traiter cette affaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select
                    value={selectedInvestigators.length > 0 ? selectedInvestigators[0] : ""}
                    onValueChange={(value) => setSelectedInvestigators([value])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un enquêteur principal" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInvestigators.map((investigator) => (
                        <SelectItem key={investigator.id} value={investigator.id}>
                          {investigator.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedInvestigators([])}
                      disabled={selectedInvestigators.length === 0}
                    >
                      Réinitialiser
                    </Button>
                    <Button
                      onClick={handleAssignInvestigators}
                      disabled={isSubmitting || selectedInvestigators.length === 0}
                      className="bg-police-navy hover:bg-opacity-90"
                    >
                      {isSubmitting ? "Assignation..." : "Assigner maintenant"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isInvestigator && complaint.status !== "closed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gestion de l'enquête</CardTitle>
                <CardDescription>
                  Actions disponibles pour cette enquête
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 gap-3">
                      <Paperclip className="h-6 w-6 text-police-blue" />
                      <div className="text-center">
                        <p className="font-medium">Ajouter des pièces</p>
                        <p className="text-xs text-muted-foreground mt-1">Joindre de nouvelles pièces au dossier</p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 gap-3">
                      <MessageSquare className="h-6 w-6 text-police-blue" />
                      <div className="text-center">
                        <p className="font-medium">Rapport d'enquête</p>
                        <p className="text-xs text-muted-foreground mt-1">Rédiger un rapport sur cette affaire</p>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button
                      className="w-full flex items-center gap-2"
                      variant="destructive"
                      onClick={handleCloseInvestigation}
                      disabled={isSubmitting}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>{isSubmitting ? "Traitement en cours..." : "Initier la clôture de l'enquête"}</span>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Cette action notifiera le commissaire pour validation finale
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {complaint.status === "closed" && (
            <Card>
              <CardHeader className="bg-green-50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-base text-green-800">Enquête clôturée</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-green-50">
                <p className="text-sm text-green-700">
                  Cette enquête a été officiellement clôturée. Aucune action supplémentaire n'est requise.
                </p>
              </CardContent>
            </Card>
          )}

          {!isStationAdmin && complaint.status === "pending-assignment" && (
            <Card>
              <CardHeader className="bg-amber-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-base text-amber-800">En attente d'assignation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-amber-50">
                <p className="text-sm text-amber-700">
                  Cette plainte n'a pas encore été assignée à un enquêteur par le commissaire de poste.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplaintDetail;
