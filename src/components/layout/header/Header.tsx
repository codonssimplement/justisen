import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, User, Settings, LogOut } from "lucide-react";
import { UserRole } from "@/types";

interface HeaderProps {
  notificationCount: number;
  userInitials: string;
  firstName: string;
  lastName: string;
  userRoleTitle: string;
  onLogout: () => void;
}

export const Header = ({
  notificationCount,
  userInitials,
  firstName,
  lastName,
  userRoleTitle,
  onLogout,
}: HeaderProps) => {
  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="md:hidden flex items-center">
          <SidebarTrigger>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        </div>

        <div className="md:hidden flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-police-navy" />
            <span className="font-bold text-lg text-police-navy">PN</span>
          </div>
        </div>

        <div className="hidden md:flex-1 md:flex">
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-10 bg-muted/40 border-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-police-red text-[10px]"
                variant="destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {firstName} {lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userRoleTitle}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
      </div>
    </header>
  );
};
