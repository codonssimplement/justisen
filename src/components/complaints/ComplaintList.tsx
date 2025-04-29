import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Filter, User, Calendar, MapPin } from "lucide-react";
import { ComplaintStatus } from "@/types";

// Mock data for demonstration
const mockComplaints = [
  {
    id: "c1",
    registrationNumber: "PNS-250410-01",
    title: "Vol avec effraction",
    complaintDate: new Date(2025, 3, 10),
    incidentDate: new Date(2025, 3, 9),
    status: "pending-assignment" as ComplaintStatus,
    location: "Avenue Cheikh Anta Diop, Dakar",
    complaintType: "burglary",
  },
  {
    id: "c2",
    registrationNumber: "PNS-250410-02",
    title: "Agression verbale",
    complaintDate: new Date(2025, 3, 10),
    incidentDate: new Date(2025, 3, 10),
    status: "pending-assignment" as ComplaintStatus,
    location: "Place de l'Indépendance, Dakar",
    complaintType: "harassment",
  },
  {
    id: "c3",
    registrationNumber: "PNS-250409-03",
    title: "Vol à l'étalage",
    complaintDate: new Date(2025, 3, 9),
    incidentDate: new Date(2025, 3, 9),
    status: "assigned" as ComplaintStatus,
    location: "Marché Sandaga, Dakar",
    complaintType: "theft",
  },
  {
    id: "c4",
    registrationNumber: "PNS-250409-04",
    title: "Dégradation de véhicule",
    complaintDate: new Date(2025, 3, 9),
    incidentDate: new Date(2025, 3, 8),
    status: "assigned" as ComplaintStatus,
    location: "Rond-point Liberté 6, Dakar",
    complaintType: "vandalism",
  },
  {
    id: "c5",
    registrationNumber: "PNS-250408-05",
    title: "Fraude à la carte bancaire",
    complaintDate: new Date(2025, 3, 8),
    incidentDate: new Date(2025, 3, 7),
    status: "in-progress" as ComplaintStatus,
    location: "En ligne",
    complaintType: "fraud",
  },
  {
    id: "c6",
    registrationNumber: "PNS-250407-06",
    title: "Cambriolage résidentiel",
    complaintDate: new Date(2025, 3, 7),
    incidentDate: new Date(2025, 3, 6),
    status: "closed" as ComplaintStatus,
    location: "Quartier Sicap Baobab, Dakar",
    complaintType: "burglary",
  },
];

interface ComplaintListProps {
  onViewComplaint: (complaintId: string) => void;
}

const ComplaintList = ({ onViewComplaint }: ComplaintListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  // Filter complaints based on search term and filters
  const filteredComplaints = mockComplaints.filter((complaint) => {
    const matchesSearch = searchTerm === "" || 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      complaint.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "" || complaint.status === statusFilter;
    const matchesType = typeFilter === "" || complaint.complaintType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    }).format(date);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Liste des Plaintes</CardTitle>
        <CardDescription>
          Consultez et gérez les plaintes enregistrées
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, numéro ou lieu..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Statut" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="pending-assignment">En attente</SelectItem>
                  <SelectItem value="assigned">Assignée</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="closed">Clôturée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="theft">Vol</SelectItem>
                  <SelectItem value="assault">Agression</SelectItem>
                  <SelectItem value="burglary">Cambriolage</SelectItem>
                  <SelectItem value="fraud">Fraude</SelectItem>
                  <SelectItem value="vandalism">Vandalisme</SelectItem>
                  <SelectItem value="harassment">Harcèlement</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Complaints list */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <div className="py-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-4 text-muted-foreground">Aucune plainte correspondant à vos critères</p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <div 
                key={complaint.id}
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-md border hover:bg-muted/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-medium text-sm md:text-base truncate">
                      {complaint.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 md:mt-0">
                      <div className="text-xs text-muted-foreground">
                        {complaint.registrationNumber}
                      </div>
                      {renderStatusBadge(complaint.status)}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Incident: {formatDate(complaint.incidentDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{complaint.location}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>
                        {complaint.status === "assigned" || complaint.status === "in-progress" ? 
                          "Assignée à: Enquêteur" : 
                          complaint.status === "closed" ? 
                          "Clôturée par: Enquêteur" : 
                          "Non assignée"}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:self-center"
                  onClick={() => onViewComplaint(complaint.id)}
                >
                  Détails
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Pagination - would be implemented in a real app */}
        {filteredComplaints.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Affichage de {filteredComplaints.length} plainte(s)
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm" disabled>
                Suivant
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplaintList;
