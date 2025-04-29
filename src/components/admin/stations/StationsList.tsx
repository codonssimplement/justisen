// src/components/admin/stations/StationsList.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useStations } from "@/hooks/useStations";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import StationStats from "./StationStats";
import ChiefAssignment from "./ChiefAssignment";
import StationForm from "./StationForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { REGIONS } from "@/data/senegal_locations";

interface Station {
  id: string;
  name: string;
  address: string;
  regionId: string;
  chiefId: string | null;
  type: 'central' | 'division' | 'district' | 'station';
  status: 'active' | 'pending' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export const StationsList = () => {
  const { stations, stats, isLoading, error, createStation, updateStation, deleteStation, users, assignChief, removeChief } = useStations();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("stations");

    const handleCreateStation = async (stationData: Omit<Station, 'id'>) => {
      try {
        await createStation(stationData);
        toast({
          title: 'Succès',
          description: 'Le commissariat a été créé avec succès.',
        });
        setShowForm(false);
      } catch (err) {
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la création du commissariat.',
          variant: 'destructive',
        });
      }
    };
  
    const handleUpdateStation = async (stationData: Station) => {
      try {
        await updateStation(stationData);
        toast({
          title: 'Succès',
          description: 'Le commissariat a été mis à jour avec succès.',
        });
        setShowForm(false);
      } catch (err) {
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la mise à jour du commissariat.',
          variant: 'destructive',
        });
      }
    };
  
    const handleDeleteStation = async (stationId: string) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commissariat ?')) {
        try {
          await deleteStation(stationId);
          toast({
            title: 'Succès',
            description: 'Le commissariat a été supprimé avec succès.',
          });
        } catch (err) {
          toast({
            title: 'Erreur',
            description: 'Une erreur est survenue lors de la suppression du commissariat.',
            variant: 'destructive',
          });
        }
      }
    };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive">
        Une erreur est survenue : {error.message}
      </div>
    );
  }

  // Filtrage
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(search.toLowerCase()) ||
    station.regionId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 ml-72">
      <div className="flex items-center gap-2 ">
        <h1 className="text-3xl font-bold tracking-tight text-police-navy">Commissariats</h1>
      </div>
      <Tabs
        defaultValue="stations"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        
        <TabsContent value="stations" className="space-y-4  ">
          {/* Header actions */}
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <StationStats stats={stats} />
              <Button
                onClick={() => {
                  setSelectedStation(null);
                  setShowForm(true);
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau commissariat
              </Button>
            </div>
          </div>
          {/* Tableau */}
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white mr-[-12px]">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Nom</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Région</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Statut</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Chef</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                      Aucun commissariat trouvé.
                    </td>
                  </tr>
                )}
                {filteredStations.map((station) => (
                  <tr key={station.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-medium text-gray-900">{station.name}</td>
                    <td className="px-4 py-2 text-gray-700">{station.regionId}</td>
                    <td className="px-4 py-2 text-gray-700">{station.type.charAt(0).toUpperCase() + station.type.slice(1)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(station.status)} bg-gray-50`}>
                        {station.status === 'active' && 'Actif'}
                        {station.status === 'pending' && 'En attente'}
                        {station.status === 'inactive' && 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {station.chiefId
                        ? users.find((u) => u.id === station.chiefId)?.firstName + ' ' + users.find((u) => u.id === station.chiefId)?.lastName
                        : <span className="italic text-gray-400">Non assigné</span>
                      }
                    </td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <ChiefAssignment
                        station={station}
                        users={users}
                        onAssignChief={assignChief}
                        onRemoveChief={removeChief}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedStation(station);
                          setShowForm(true);
                        }}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Éditer
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteStation(station.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Formulaire modal */}
          <Dialog open={showForm} onOpenChange={setShowForm}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{selectedStation ? 'Modifier le commissariat' : 'Ajouter un nouveau commissariat'}</DialogTitle>
      <DialogDescription>
        {selectedStation ? 'Modifiez les informations du commissariat.' : 'Remplissez le formulaire pour ajouter un nouveau commissariat.'}
      </DialogDescription>
    </DialogHeader>
    <StationForm
      station={selectedStation}
      onSubmit={(formData) => {
        if (selectedStation) {
          handleUpdateStation({ ...selectedStation, ...formData });
        } else {
          handleCreateStation(formData);
        }
      }}
      onCancel={() => setShowForm(false)}
      regions={REGIONS}
    />
    {/* Ajout de l’assignation chef si édition */}
    {selectedStation && (
      <div className="mt-6">
        <ChiefAssignment
          station={selectedStation}
          users={users}
          onAssign={async (userId) => {
            await assignChief(selectedStation.id, userId);
            // Optionnel : recharger la station sélectionnée pour afficher le nouveau chef
            const updated = stations.find(s => s.id === selectedStation.id);
            if (updated) setSelectedStation(updated);
          }}
          onRemove={async () => {
            await removeChief(selectedStation.id);
            const updated = stations.find(s => s.id === selectedStation.id);
            if (updated) setSelectedStation(updated);
          }}
        />
      </div>
    )}
  </DialogContent>
</Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};
  
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-700 border-green-200';
    case 'pending':
      return 'text-yellow-700 border-yellow-200';
    case 'inactive':
      return 'text-red-700 border-red-200';
    default:
      return 'text-gray-700 border-gray-200';
  }
};