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
import { Search, UserPlus, User } from "lucide-react";
import { Commissioner, initialCommissioners } from "@/utils/commissionerUtils";
import CommissionerForm from "./commissioners/CommissionerForm";
import CommissionerRow from "./commissioners/CommissionerRow";
import EmptyCommissioners from "./commissioners/EmptyCommissioners";

const CommissionersList = () => {
  const [commissioners, setCommissioners] = useState<Commissioner[]>(initialCommissioners);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCommissioner, setEditingCommissioner] = useState<Commissioner | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCommissioner, setSelectedCommissioner] = useState<Commissioner | null>(null);
  
  const { toast } = useToast();

  const filteredCommissioners = commissioners.filter(commissioner => {
    const searchLower = searchQuery.toLowerCase();
    return (
      commissioner.firstName.toLowerCase().includes(searchLower) ||
      commissioner.lastName.toLowerCase().includes(searchLower) ||
      commissioner.matricule.toLowerCase().includes(searchLower) ||
      commissioner.region.toLowerCase().includes(searchLower) ||
      commissioner.email.toLowerCase().includes(searchLower)
    );
  });

  const handleAddCommissioner = (formData: Omit<Commissioner, "id">) => {
    const newCommissioner = {
      id: `NEW${Date.now()}`,
      ...formData
    };
    
    setCommissioners([...commissioners, newCommissioner]);
    setShowAddDialog(false);
    
    toast({
      title: "Commissaire régional ajouté",
      description: `${formData.firstName} ${formData.lastName} a été ajouté à la liste des commissaires régionaux.`,
    });
  };

  const handleEditCommissioner = (formData: Omit<Commissioner, "id">) => {
    if (!editingCommissioner) return;
    
    const updatedCommissioners = commissioners.map(commissioner =>
      commissioner.id === editingCommissioner.id 
        ? { ...commissioner, ...formData } 
        : commissioner
    );
    
    setCommissioners(updatedCommissioners);
    setShowEditDialog(false);
    setEditingCommissioner(null);
    
    toast({
      title: "Commissaire régional modifié",
      description: `Les informations de ${formData.firstName} ${formData.lastName} ont été mises à jour.`,
    });
  };

  const handleDeleteCommissioner = () => {
    if (!selectedCommissioner) return;
    
    const updatedCommissioners = commissioners.filter(
      commissioner => commissioner.id !== selectedCommissioner.id
    );
    
    setCommissioners(updatedCommissioners);
    setShowDeleteDialog(false);
    
    toast({
      title: "Commissaire régional supprimé",
      description: `${selectedCommissioner.firstName} ${selectedCommissioner.lastName} a été retiré de la liste des commissaires régionaux.`,
      variant: "destructive",
    });
    
    setSelectedCommissioner(null);
  };

  const openEditDialog = (commissioner: Commissioner) => {
    setEditingCommissioner(commissioner);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (commissioner: Commissioner) => {
    setSelectedCommissioner(commissioner);
    setShowDeleteDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Commissaires Régionaux</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un commissaire
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un commissaire régional</DialogTitle>
              <DialogDescription>
                Créez un nouveau compte de commissaire régional.
              </DialogDescription>
            </DialogHeader>
            <CommissionerForm 
              onSubmit={handleAddCommissioner}
              onCancel={() => setShowAddDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center border rounded-md px-3 py-2 mb-4">
        <Search className="h-5 w-5 text-muted-foreground mr-2" />
        <Input
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          placeholder="Rechercher un commissaire..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Matricule</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommissioners.length > 0 ? (
              filteredCommissioners.map((commissioner) => (
                <CommissionerRow
                  key={commissioner.id}
                  commissioner={commissioner}
                  onEdit={openEditDialog}
                  onDelete={openDeleteDialog}
                />
              ))
            ) : (
              <EmptyCommissioners />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le commissaire régional</DialogTitle>
            <DialogDescription>
              Modifiez les informations du commissaire régional.
            </DialogDescription>
          </DialogHeader>
          {editingCommissioner && (
            <CommissionerForm 
              commissioner={editingCommissioner}
              onSubmit={handleEditCommissioner}
              onCancel={() => setShowEditDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertDescription>
              Êtes-vous sûr de vouloir supprimer le commissaire régional {selectedCommissioner?.firstName} {selectedCommissioner?.lastName} ?
              Cette action est irréversible.
            </AlertDescription>
          </Alert>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteCommissioner}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommissionersList;
