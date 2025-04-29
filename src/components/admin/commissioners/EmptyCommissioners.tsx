import { User } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

const EmptyCommissioners = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-10">
        <div className="flex flex-col items-center justify-center">
          <User className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-lg font-medium">Aucun commissaire trouvé</p>
          <p className="text-sm text-muted-foreground">
            Aucun résultat ne correspond à votre recherche
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyCommissioners;