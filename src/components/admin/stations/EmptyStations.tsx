import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EmptyStations = ({
  onAddStation
}: {
  onAddStation: () => void;
}) => {
  return (
    <Alert>
      <AlertDescription className="text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Aucun commissariat trouvé</h3>
          <p className="text-muted-foreground">
            Il semble qu'il n'y ait aucun commissariat dans la base de données.
          </p>
          <Button 
            variant="outline" 
            onClick={onAddStation}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un nouveau commissariat
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default EmptyStations;