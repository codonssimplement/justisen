import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Station, StationType, Region } from "@/types";
import StationForm from "./StationForm";
import { Plus, Search } from "lucide-react";
import StationRow from "./StationRow";
import EmptyStations from "./EmptyStations";

interface StationManagementProps {
    stations: Station[];
    regions: Region[];
    onAddStation: (formData: Omit<Station, "id">) => void;
    onEditStation: (formData: Omit<Station, "id">) => void;
    onDeleteStation: (station: Station) => void;
  }
const StationManagement = ({
    
    stations,
    regions,
    onAddStation,
    onEditStation,
    onDeleteStation
  }: StationManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  
  const { toast } = useToast();

  const filteredStations = stations.filter(station => {
    const searchLower = searchQuery.toLowerCase();
    return (
      station.name.toLowerCase().includes(searchLower) ||
      station.region.toLowerCase().includes(searchLower) ||
      station.type.toLowerCase().includes(searchLower) ||
      station.address.toLowerCase().includes(searchLower)
    );
  });

  const handleAddStation = (formData: Omit<Station, "id">) => {
    const newStation = {
      id: `NEW${Date.now()}`,
      ...formData
    };
    
    onAddStation(newStation);
    setShowAddDialog(false);
    
    toast({
      title: "Commissariat ajouté",
      description: `${formData.name} a été ajouté à la liste des commissariats.`,
    });
  };

  const handleEditStation = (formData: Omit<Station, "id">) => {
    if (!editingStation) return;
    
    const updatedStation = {
      ...editingStation,
      ...formData
    };
    
    onEditStation(updatedStation);
    setShowEditDialog(false);
    setEditingStation(null);
    
    toast({
      title: "Commissariat modifié",
      description: `Les informations de ${formData.name} ont été mises à jour.`,
    });
  };

  const handleDeleteStation = () => {
    if (!selectedStation) return;
    
    onDeleteStation(selectedStation);
    setShowDeleteDialog(false);
    
    toast({
      title: "Commissariat supprimé",
      description: `${selectedStation.name} a été retiré de la liste des commissariats.`,
      variant: "destructive",
    });
    
    setSelectedStation(null);
  };

  const openEditDialog = (station: Station) => {
    setEditingStation(station);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (station: Station) => {
    setSelectedStation(station);
    setShowDeleteDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Commissariats</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un commissariat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un commissariat</DialogTitle>
              <DialogDescription>
                Créez un nouveau commissariat.
              </DialogDescription>
            </DialogHeader>
            <StationForm 
  onSubmit={handleAddStation}
  onCancel={() => setShowAddDialog(false)}
  regions={regions}
  onAddStation={handleAddStation}
/>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center border rounded-md px-3 py-2 mb-4">
        <Search className="h-5 w-5 text-muted-foreground mr-2" />
        <Input
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          placeholder="Rechercher un commissariat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>chef</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <StationRow
                  key={station.id}
                  station={station}
                  onEdit={openEditDialog}
                  onDelete={openDeleteDialog}
                />
              ))
            ) : (
              <EmptyStations />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier le commissariat</DialogTitle>
            <DialogDescription>
              Modifiez les informations du commissariat.
            </DialogDescription>
          </DialogHeader>
          {editingStation && (
           <StationForm 
           station={editingStation}
           onSubmit={handleEditStation}
           onCancel={() => {
             setEditingStation(null);
             setShowEditDialog(false);
           }}
           regions={regions}
           onAddStation={handleAddStation}
         /> 
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le commissariat</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le commissariat {selectedStation?.name} ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                handleDeleteStation();
                setShowDeleteDialog(false);
              }}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StationManagement;