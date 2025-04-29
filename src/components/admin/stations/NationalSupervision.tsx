import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import { User, Region } from "@/types";

import StationHierarchy from "@/components/admin/stations/StationHierarchy";
import { StationStats as StationStatsType } from "@/types";
import StationStats from "@/components/admin/stations/StationStats";
import { UserStats as UserStatsType } from "@/types";
import UserStats from "@/components/admin/stations/UserStats";

interface NationalSupervisionProps {
    stationStats: StationStatsType;
    userStats: UserStatsType;
    regions: Region[];
    users: User[];
    onAssignChief: (stationId: string, userId: string) => void;
    onRemoveChief: (stationId: string) => void;
  }

  const NationalSupervision = ({
    stationStats,
    userStats,
    regions,
    users,
    onAssignChief,
    onRemoveChief
  }: NationalSupervisionProps) => {

   
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column - Statistics */}
      <div className="space-y-4">
        {/* Station Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques des Commissariats</CardTitle>
            <CardDescription>
              Vue d'ensemble des commissariats
            </CardDescription>
          </CardHeader>
          <CardContent>
          <StationStats stats={stationStats} />
          </CardContent>
        </Card>

        {/* User Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques des Utilisateurs</CardTitle>
            <CardDescription>
              Répartition des utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserStats stats={userStats} />
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Supervision */}
      <div className="space-y-4">
        {/* Station Hierarchy */}
        <Card>
          <CardHeader>
            <CardTitle>Supervision Nationale</CardTitle>
            <CardDescription>
              Vue hiérarchique et gestion des commissariats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StationHierarchy
              regions={regions}
              users={users}
              onAssignChief={onAssignChief}
              onRemoveChief={onRemoveChief}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NationalSupervision;