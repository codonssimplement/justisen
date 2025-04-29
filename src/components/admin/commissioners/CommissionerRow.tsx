import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Commissioner } from "@/utils/commissionerUtils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface CommissionerRowProps {
  commissioner: Commissioner;
  onEdit: (commissioner: Commissioner) => void;
  onDelete: (commissioner: Commissioner) => void;
}

const CommissionerRow = ({ commissioner, onEdit, onDelete }: CommissionerRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {commissioner.firstName} {commissioner.lastName}
      </TableCell>
      <TableCell>{commissioner.matricule}</TableCell>
      <TableCell>{commissioner.region}</TableCell>
      <TableCell>{commissioner.email}</TableCell>
      <TableCell>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          commissioner.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}>
          {commissioner.status === "active" ? "Actif" : "Inactif"}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center cursor-pointer"
              onClick={() => onEdit(commissioner)}
            >
              <Pencil className="mr-2 h-4 w-4" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center text-red-600 cursor-pointer"
              onClick={() => onDelete(commissioner)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default CommissionerRow;
