import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Station, StationType, Region, User, StationStats, UserStats, UserRole } from "@/types";
import StationManagement from "@/components/admin/stations/StationManagement";
import NationalSupervision from "@/components/admin/stations/NationalSupervision";
import { Button } from "@/components/ui/button";

const mockData = {
  stations: [
    {
      id: "1",
      name: "Commissariat Régional de Dakar",
      type: "regional" as StationType,
      region: "Dakar",
      address: "Adresse du commissariat",
      phone: "123456789",
      email: "contact@commissariat-dakar.sn",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    // Add more mock stations as needed
  ],
  regions: [
    {
      id: "1",
      name: "Dakar",
      stations: []
    }
    // Add more mock regions as needed
  ],
  users: [
    {
      id: "1",
      matricule: "001",
      email: "director@police.sn",
      firstName: "John",
      lastName: "Doe",
      role: "admin" as UserRole,
      stationId: "1",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    // Add more mock users as needed
  ]
};

const StationManagementPage = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const { toast } = useToast();

  // Calculate statistics
  const stationStats = {
    total: stations.length,
    byType: {
      regional: stations.filter(s => s.type === "regional").length,
      departmental: stations.filter(s => s.type === "departmental").length,
      arrondissement: stations.filter(s => s.type === "arrondissement").length
    },
    byRegion: regions.reduce((acc, region) => {
      acc[region.name] = region.stations.length;
      return acc;
    }, {} as Record<string, number>)
  };

  const userStats = {
    total: users.length,
    byRole: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>),
    byStation: stations.reduce((acc, station) => {
      const stationUsers = users.filter(u => u.stationId === station.id);
      acc[station.name] = stationUsers.length;
      return acc;
    }, {} as Record<string, number>),
    chiefs: stations.filter(s => s.chiefId !== undefined).length
  };

  useEffect(() => {
    // Initialize with mock data
    setStations(mockData.stations);
    setRegions(mockData.regions);
    setUsers(mockData.users);
  }, []);

  const handleAddStation = (formData: Omit<Station, "id">) => {
    const newStation: Station = {
      id: `NEW${Date.now()}`,
      ...formData,
      status: formData.status as "active" | "inactive"
    };
    
    setStations(prev => [...prev, newStation]);
    toast({
      title: "Commissariat ajouté",
      description: `${formData.name} a été ajouté à la liste des commissariats.`,
    });
  };

  const handleEditStation = (formData: Omit<Station, "id">) => {
    if (!editingStation) return;
    
    const updatedStations = stations.map(station =>
      station.id === editingStation.id 
        ? { ...station, ...formData } 
        : station
    );
    
    setStations(updatedStations);
    setEditingStation(null);
    
    toast({
      title: "Commissariat modifié",
      description: `Les informations de ${formData.name} ont été mises à jour.`,
    });
  };

  const handleDeleteStation = () => {
    if (!selectedStation) return;
    
    const updatedStations = stations.filter(
      station => station.id !== selectedStation.id
    );
    
    // Update the region's stations array
    const updatedRegions = regions.map(region => ({
      ...region,
      stations: region.stations.filter(
        station => station.id !== selectedStation.id
      )
    }));
    
    setStations(updatedStations);
    setRegions(updatedRegions);
    setSelectedStation(null);
    
    toast({
      title: "Commissariat supprimé",
      description: `${selectedStation.name} a été retiré de la liste des commissariats.`,
      variant: "destructive",
    });
  };

  const handleAssignChief = (stationId: string, userId: string) => {
    const updatedStations = stations.map(station =>
      station.id === stationId 
        ? { ...station, chiefId: userId } 
        : station
    );
    
    setStations(updatedStations);
    toast({
      title: "Chef assigné",
      description: `Le chef a été assigné au commissariat ${updatedStations.find(s => s.id === stationId)?.name}`,
    });
  };

  const handleRemoveChief = (stationId: string) => {
    const updatedStations = stations.map(station =>
      station.id === stationId 
        ? { ...station, chiefId: undefined } 
        : station
    );
    
    setStations(updatedStations);
    toast({
      title: "Chef retiré",
      description: `Le chef a été retiré du commissariat ${updatedStations.find(s => s.id === stationId)?.name}`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Commissariats</h1>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/admin"}
        >
          Retour au tableau de bord
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Management */}
        <div className="space-y-4">
        <StationManagement 
  stations={stations}
  regions={regions}
  onAddStation={handleAddStation}
  onEditStation={handleEditStation}
  onDeleteStation={handleDeleteStation}
/>
        </div>

        {/* Right Column - Supervision */}
        <div className="space-y-4">
          <NationalSupervision
            stationStats={stationStats}
            userStats={userStats}
            regions={regions}
            users={users}
            onAssignChief={handleAssignChief}
            onRemoveChief={handleRemoveChief}          />
                    </div>
      </div>
    </div>
  );
};

export default StationManagementPage;