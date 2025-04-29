import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types";

interface UserProfileProps {
  firstName: string;
  lastName: string;
  role: UserRole;
  onLogout: () => void;
}

const roleTitles: Record<UserRole, string> = {
  'admin': 'Directeur Général',
  'regional-admin': 'Commissaire Régional',
  'station-admin': 'Commissaire de Poste',
  'reception-officer': 'Officier d\'accueil',
  'investigator': 'Enquêteur',
  officer: ""
};

export const UserProfile = ({ firstName, lastName, role, onLogout }: UserProfileProps) => {
  const navigate = useNavigate();
  const userInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  const userRoleTitle = roleTitles[role];

  return (
    <div className="px-2 mt-auto pt-4 border-t border-white/10">
      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-white/20 text-white">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {firstName} {lastName}
          </p>
          <p className="text-white/70 text-xs truncate">{userRoleTitle}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
