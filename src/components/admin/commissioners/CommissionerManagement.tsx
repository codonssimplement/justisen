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
import { Commissioner } from "@/utils/commissionerUtils";
import CommissionerForm from "./CommissionerForm";
import EmptyCommissioners from "./EmptyCommissioners";
import { Plus, Search } from "lucide-react";

interface CommissionerManagementProps {
  commissioners: Commissioner[];
  onAddCommissioner: (formData: Omit<Commissioner, "id">) => void;
  onEditCommissioner: (commissioner: Commissioner) => void;
  onDeleteCommissioner: (id: string) => void;
  editingCommissioner: Commissioner | null;
  setEditingCommissioner: (comm: Commissioner | null) => void;
}

const CommissionerManagement = ({
  commissioners,
  onAddCommissioner,
  onEditCommissioner,
  onDeleteCommissioner
}: CommissionerManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCommissioner, setEditingCommissioner] = useState<Commissioner | null>(null);
  // Champs pour le formulaire d'ajout inline
  const [newLastName, setNewLastName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newMatricule, setNewMatricule] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCommissioner, setSelectedCommissioner] = useState<Commissioner | null>(null);
  const { toast } = useToast();

  const filteredCommissioners = commissioners.filter(commissioner => {
    const searchLower = searchQuery.toLowerCase();
    return (
      commissioner.firstName.toLowerCase().includes(searchLower) ||
      commissioner.lastName.toLowerCase().includes(searchLower) ||
      commissioner.email.toLowerCase().includes(searchLower) ||
      commissioner.region.toLowerCase().includes(searchLower) ||
      commissioner.matricule.toLowerCase().includes(searchLower)
    );
  });

  const handleAddCommissioner = (formData: Omit<Commissioner, "id">) => {
    onAddCommissioner(formData);
    setShowAddDialog(false);
    toast({
      title: "Commissaire ajouté",
      description: `Le commissaire ${formData.firstName} ${formData.lastName} a été ajouté avec succès.`,
    });
  };

  const handleEditCommissioner = (formData: Omit<Commissioner, "id">) => {
    if (!editingCommissioner) return;
    onEditCommissioner(formData);
    setEditingCommissioner(null);
    setShowEditDialog(false);
    toast({
      title: "Commissaire modifié",
      description: `Les informations de ${formData.firstName} ${formData.lastName} ont été mises à jour.`,
    });
  };

  const handleDeleteCommissioner = () => {
    if (!selectedCommissioner) return;
    onDeleteCommissioner();
    setSelectedCommissioner(null);
    setShowDeleteDialog(false);
    toast({
      title: "Commissaire supprimé",
      description: `Le commissaire ${selectedCommissioner.firstName} ${selectedCommissioner.lastName} a été supprimé.`,
    });
  };


  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau commissaire
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogHeader>
              
            </DialogHeader>
            <DialogContent className="sm:max-w-[425px]">
              <CommissionerForm 
                onSubmit={formData => {
                  onAddCommissioner(formData);
                  setShowAddDialog(false);
                  toast({
                    title: "Commissaire ajouté",
                    description: `Le commissaire ${formData.firstName} ${formData.lastName} a été ajouté avec succès.`,
                  });
                }}
                onClose={() => setShowAddDialog(false)}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={showEditDialog} onOpenChange={(open) => {
            setShowEditDialog(open);
            if (!open) setEditingCommissioner(null);
          }}>
            <DialogHeader>
              
            </DialogHeader>
            <DialogContent className="sm:max-w-[425px]">
              <CommissionerForm
                commissioner={editingCommissioner}
                onSubmit={formData => {
                  if (editingCommissioner) {
                    onEditCommissioner({ ...formData, id: editingCommissioner.id });
                    setShowEditDialog(false);
                    setEditingCommissioner(null);
                    toast({
                      title: "Commissaire modifié",
                      description: `Les informations de ${formData.firstName} ${formData.lastName} ont été mises à jour.`,
                    });
                  }
                }}
                onClose={() => {
                  setShowEditDialog(false);
                  setEditingCommissioner(null);
                }}
              />
            </DialogContent>
          </Dialog>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Input
                placeholder="Rechercher un commissaire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Matricule</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommissioners.length === 0 ? (
              <EmptyCommissioners />
            ) : (
              filteredCommissioners.map((commissioner) => (
                <TableRow key={commissioner.id}>
                  <TableCell>{commissioner.lastName}</TableCell>
                  <TableCell>{commissioner.firstName}</TableCell>
                  <TableCell>{commissioner.matricule}</TableCell>
                  <TableCell>{commissioner.region}</TableCell>
                  <TableCell>{commissioner.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCommissioner(commissioner);
                          setShowEditDialog(true);
                        }}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (window.confirm(`Êtes-vous sûr de vouloir supprimer le commissaire ${commissioner.firstName} ${commissioner.lastName} ?`)) {
                            onDeleteCommissioner(commissioner.id);
                            toast({
                              title: "Commissaire supprimé",
                              description: `Le commissaire ${commissioner.firstName} ${commissioner.lastName} a été supprimé.`,
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>


    </div>
  );
};

export default CommissionerManagement;