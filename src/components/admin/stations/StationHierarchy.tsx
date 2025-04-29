import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChevronRight, 
  ChevronDown 
} from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Station, StationType, Region, User } from "@/types";
import ChiefAssignment from "./ChiefAssignment";

interface StationHierarchyProps {
  regions: Region[];
  users: User[];
  onAssignChief: (stationId: string, userId: string) => void;
  onRemoveChief: (stationId: string) => void;
}

const StationHierarchy = ({
  regions,
  users,
  onAssignChief,
  onRemoveChief
}: StationHierarchyProps) => {
  const renderStation = (station: Station, level: number) => {
    const indent = level * 20;
    const isChiefAssigned = station.chiefId !== undefined;

    return (
      <div key={station.id} className="pl-4">
        <div className="flex items-center">
          <div 
            className="flex items-center space-x-2"
            style={{ marginLeft: indent }}
          >
            <span className="text-sm font-medium">
              {station.name}
            </span>
            <span className="text-xs text-muted-foreground">
              ({station.type})
            </span>
          </div>
          <div className="ml-auto flex items-center">
            {isChiefAssigned ? (
              <span className="text-green-600">Chef assigné</span>
            ) : (
              <span className="text-red-600">Pas de chef</span>
            )}
          </div>
        </div>
        <div 
          className="ml-4 mt-2"
          style={{ marginLeft: indent }}
        >
          <ChiefAssignment
            station={station}
            users={users}
            onAssign={userId => onAssignChief(station.id, userId)}
            onRemove={() => onRemoveChief(station.id)}
          />
        </div>
      </div>
    );
  };

  const renderRegion = (region: Region, level: number) => {
    return (
      <Collapsible key={region.id} defaultOpen>
        <CollapsibleTrigger>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">
                {region.name}
              </span>
              <span className="text-sm text-muted-foreground">
                ({region.stations.length} commissariats)
              </span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {region.stations.map((station) => 
            renderStation(station, level + 1)
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hierarchie des Commissariats</CardTitle>
        <CardDescription>
          Vue hiérarchique des commissariats par région
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regions.map((region) => 
            renderRegion(region, 0)
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StationHierarchy;