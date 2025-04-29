import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Search, FileText, MoreHorizontal, Eye } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for complaints history
const initialComplaints = [
  {
    id: "1",
    ref: "PN-DKR-2025-0001",
    title: "Vol avec effraction",
    status: "closed",
    date: new Date(2025, 3, 1),
    region: "Dakar",
    station: "Commissariat de Plateau",
    complainant: "Moussa Diouf",
    investigator: "Insp. Mbaye"
  },
  {
    id: "2",
    ref: "PN-TH-2025-0078",
    title: "Agression en voie publique",
    status: "closed",
    date: new Date(2025, 3, 2),
    region: "Thiès",
    station: "Commissariat Central de Thiès",
    complainant: "Aminata Sène",
    investigator: "Insp. Thiam"
  },
  {
    id: "3",
    ref: "PN-ZIG-2025-0045",
    title: "Fraude à la carte bancaire",
    status: "closed",
    date: new Date(2025, 3, 3),
    region: "Ziguinchor",
    station: "Commissariat Central de Ziguinchor",
    complainant: "Seydou Sarr",
    investigator: "Insp. Niang"
  },
  {
    id: "4",
    ref: "PN-SL-2025-0023",
    title: "Dégradation de véhicule",
    status: "closed",
    date: new Date(2025, 3, 5),
    region: "Saint-Louis",
    station: "Commissariat de Saint-Louis",
    complainant: "Mariama Gaye",
    investigator: "Insp. Ba"
  },
  {
    id: "5",
    ref: "PN-KLK-2025-0016",
    title: "Cambriolage de résidence",
    status: "closed",
    date: new Date(2025, 3, 6),
    region: "Kaolack",
    station: "Commissariat de Kaolack",
    complainant: "Modou Faye",
    investigator: "Insp. Ndour"
  }
];

// Mock regions
const regions = [
  "Toutes les régions",
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Ziguinchor",
  "Kaolack",
  "Diourbel",
  "Matam"
];

const ComplaintDetails = ({ complaint }) => {
  // Mock timeline data (would come from API in real app)
  const timeline = [
    {
      date: new Date(2025, 2, 25),
      action: "Dépôt de plainte",
      actor: "Agent d'accueil Martinez",
      details: "Enregistrement initial de la plainte"
    },
    {
      date: new Date(2025, 2, 26),
      action: "Assignation",
      actor: "Commissaire Bertrand",
      details: `Plainte assignée à l'inspecteur ${complaint.investigator}`
    },
    {
      date: new Date(2025, 2, 28),
      action: "Prise de déposition",
      actor: complaint.investigator,
      details: "Entretien avec la victime et recueil des preuves"
    },
    {
      date: new Date(2025, 3, 2),
      action: "Rapport d'enquête",
      actor: complaint.investigator,
      details: "Rapport final rédigé et soumis"
    },
    {
      date: new Date(2025, 3, 3),
      action: "Clôture",
      actor: "Commissaire Bertrand",
      details: "Enquête terminée, dossier archivé"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>Détails de la plainte</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Référence</dt>
                <dd className="text-sm font-semibold">{complaint.ref}</dd>
              </div>
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Titre</dt>
                <dd className="text-sm font-semibold">{complaint.title}</dd>
              </div>
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Plaignant</dt>
                <dd className="text-sm font-semibold">{complaint.complainant}</dd>
              </div>
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Date de dépôt</dt>
                <dd className="text-sm font-semibold">
                  {format(complaint.date, "d MMMM yyyy", { locale: fr })}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Traitement</CardTitle>
            <CardDescription>Informations sur le traitement de la plainte</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Région</dt>
                <dd className="text-sm font-semibold">{complaint.region}</dd>
              </div>
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Commissariat</dt>
                <dd className="text-sm font-semibold">{complaint.station}</dd>
              </div>
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Enquêteur principal</dt>
                <dd className="text-sm font-semibold">{complaint.investigator}</dd>
              </div>
              <div className="px-4 py-2 grid grid-cols-1 gap-1">
                <dt className="text-sm font-medium text-gray-500">Statut</dt>
                <dd className="text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Clôturée
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique de traitement</CardTitle>
          <CardDescription>Progression chronologique de l'enquête</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="relative border-l border-gray-200 ml-3 space-y-6">
            {timeline.map((item, index) => (
              <li key={index} className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  <FileText className="w-3 h-3 text-blue-800" />
                </span>
                <time className="block mb-1 text-sm font-normal leading-none text-gray-400">
                  {format(item.date, "d MMMM yyyy", { locale: fr })}
                </time>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                  {item.action}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-1">{item.actor}</p>
                <p className="text-sm text-gray-500">{item.details}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Toutes les régions");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = searchQuery === "" || 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.complainant.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRegion = selectedRegion === "Toutes les régions" || 
      complaint.region === selectedRegion;
      
    return matchesSearch && matchesRegion;
  });

  const viewComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Historique des Plaintes Traitées</h2>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center border rounded-md px-3 py-2 flex-1">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            placeholder="Rechercher une plainte..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Région" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Enquêteur</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.ref}</TableCell>
                  <TableCell>{complaint.title}</TableCell>
                  <TableCell>
                    {format(complaint.date, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{complaint.region}</TableCell>
                  <TableCell>{complaint.investigator}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center cursor-pointer"
                          onClick={() => viewComplaintDetails(complaint)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> Voir détails
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-lg font-medium">Aucune plainte trouvée</p>
                    <p className="text-sm text-muted-foreground">
                      Aucun résultat ne correspond à votre recherche
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Complaint Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de la plainte</DialogTitle>
            <DialogDescription>
              Référence: {selectedComplaint?.ref}
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <ComplaintDetails complaint={selectedComplaint} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplaintHistory;
