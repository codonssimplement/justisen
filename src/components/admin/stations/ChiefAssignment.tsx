import { useState } from "react";


import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Station, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ChiefAssignmentProps {
  station: Station;
  users: User[];
  onAssign: (userId: string) => void;
  onRemove: () => void;
}

const ChiefAssignment = ({  
  station,
  users,
  onAssign,
  onRemove
}: ChiefAssignmentProps) => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // D'abord, la liste des commissaires éligibles pour ce commissariat
  const availableUsers = users.filter(user => 
    user.stationId === station.id && 
    user.role === 'station-admin' && 
    user.id !== station.chiefId
  );

  // Puis on filtre cette liste selon la recherche (matricule, email, nom...)
  const filteredUsers = availableUsers.filter(user =>
    user.matricule?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedUser) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un utilisateur",
        variant: "destructive"
      });
      return;
    }

    onAssign(selectedUser);
    setSelectedUser(null);
    toast({
      title: "Chef assigné",
      description: "Le chef de station a été assigné avec succès",
    });
  };

  const handleRemove = () => {
    onRemove();
    toast({
      title: "Chef retiré",
      description: "Le chef de station a été retiré avec succès",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Chef du Commissariat</h3>
      
      {station.chiefId ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium">Chef actuel</h4>
              <p className="text-sm text-muted-foreground">
                {users.find(user => user.id === station.chiefId)?.firstName} 
                {users.find(user => user.id === station.chiefId)?.lastName}
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleRemove}
            >
              Retirer
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Alert>
            <AlertDescription>
              Ce commissariat n'a pas de chef assigné. Veuillez sélectionner un 
              commissaire de station pour devenir le chef.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label htmlFor="chief-search">Matricule ou email du commissaire</Label>
            <input
              id="chief-search"
              type="text"
              className="input input-bordered w-full"
              placeholder="Filtrer par matricule, email, nom..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Label htmlFor="chief">Sélectionner le chef</Label>
            <Select 
              value={selectedUser || undefined}
              onValueChange={setSelectedUser}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un commissaire" />
              </SelectTrigger>
              <SelectContent>
                {filteredUsers.length === 0 ? (
                  <div className="px-4 py-2 text-muted-foreground text-sm">Aucun résultat</div>
                ) : (
                  filteredUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} — {user.matricule} — {user.email}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleAssign}
              disabled={!selectedUser}
            >
              Assigner le chef
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChiefAssignment;