import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import { Station, StationType } from "@/types";
import { useState } from "react";

const [showDeleteDialog, setShowDeleteDialog] = useState(false);

const StationRow = ({
  station,
  onEdit,
  onDelete
}: {
  station: Station;
  onEdit: (station: Station) => void;
  onDelete: (station: Station) => void;
}) => {
  const { toast } = useToast();

  const getStatusBadge = (status: "active" | "inactive") => {
    const color = status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {status === "active" ? "Actif" : "Inactif"}
      </span>
    );
  };

  const getStationTypeBadge = (type: StationType) => {
    const color = {
      regional: "bg-blue-100 text-blue-800",
      departmental: "bg-yellow-100 text-yellow-800",
      arrondissement: "bg-purple-100 text-purple-800"
    }[type];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {type === "regional" ? "Régional" : 
         type === "departmental" ? "Départemental" : 
         "Arrondissement"}
      </span>
    );
  };

  return (
    <TableRow>
      <TableCell>{station.name}</TableCell>
      <TableCell>{getStationTypeBadge(station.type)}</TableCell>
      <TableCell>{station.region}</TableCell>
      <TableCell>{station.address}</TableCell>
      <TableCell>{getStatusBadge(station.status)}</TableCell>
      <TableCell>
        {station.chiefId ? (
          <span className="text-green-600">Chef assigné</span>
        ) : (
          <span className="text-red-600">Pas de chef</span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(station)}
          >
            Modifier
          </Button>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <DialogTrigger asChild>
    <Button
      variant="destructive"
      size="sm"
      onClick={() => setShowDeleteDialog(true)}
    >
      Supprimer
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Supprimer le commissariat</DialogTitle>
      <DialogDescription>
        Êtes-vous sûr de vouloir supprimer le commissariat {station.name} ?
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
          onDelete(station);
          setShowDeleteDialog(false);
        }}
      >
        Supprimer
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StationRow;