import { ReactNode } from "react";
import { UserRole } from "@/types";
import {
  Home,
  FileText,
  Box,
  Users,
  Map,
  Settings,
  UserCog,
} from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

// Navigation.tsx
interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: UserRole[];
}
// Définir l'interface NavigationProps
interface NavigationProps {
  userRole: UserRole;
}
// Menu pour l'admin
const adminNavItems: NavItem[] = [
  {
    label: "Tableau de bord",
    icon: Home,
    href: "/admin/dashboard",
    roles: ["admin"]
  },
  {
    label: "Commissariats",
    icon: Map,
    href: "/admin/stations",
    roles: ["admin"]
  },
  {
    label: "Commissaires",
    icon: UserCog,
    href: "/admin/commissioners",
    roles: ["admin"]
  },
  {
    label: "Utilisateurs",
    icon: Users,
    href: "/admin/users",
    roles: ["admin"]
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/admin/settings",
    roles: ["admin"]
  },
  {
    label: "Gestion des accès",
    icon: UserCog,
    href: "/admin/user-management",
    roles: ["admin"]
  }
];

// Menu pour le commissaire régional
const regionalNavItems: NavItem[] = [
  {
    label: "Tableau de bord",
    icon: Home,
    href: "/regional/dashboard",
    roles: ["regional-admin"]
  },
  {
    label: "Gestion des plaintes",
    icon: Map,
    href: "/regional/stations/manage",
    roles: ["regional-admin"]
  },
  {
    label: "Gestion des commissariats",
    icon: UserCog,
    href: "/regional/stations",
    roles: ["regional-admin"]
  },
  
];

// Menu pour le commissaire de station
const stationNavItems: NavItem[] = [
  {
    label: "Tableau de bord",
    icon: Home,
    href: "/station/dashboard",
    roles: ["station-admin"]
  },
  {
    label: "Gestion des Agents",
    icon: Users,
    href: "/station/complaints",
    roles: ["station-admin"]
  },
  {
    label: "Gestion des Affectations",
    icon: FileText,
    href: "/station/assignments",
    roles: ["station-admin"]
  },
  // ... autres items spécifiques au rôle station
];

// Menu pour l'officier d'accueil
const receptionNavItems: NavItem[] = [
  {
    label: "Enregistrement de Plainte",
    icon: FileText,
    href: "/station/reception/form",
    roles: ["reception-officer"]
  },
  {
    label: "Historique des Plaintes",
    icon: Box,
    href: "/station/reception/history",
    roles: ["reception-officer"]
  }
];

// Menu pour l'enquêteur
const investigatorNavItems: NavItem[] = [
  {
    label: "Plaintes Assignées",
    icon: FileText,
    href: "/station/investigator",
    roles: ["investigator"]
  }
];

// Dans le composant Navigation
export const Navigation = ({ userRole }: NavigationProps) => {
  let navItems: NavItem[] = [];

  switch (userRole) {
    case "admin":
      navItems = adminNavItems;
      break;
    case "regional-admin":
      navItems = regionalNavItems;
      break;
    case "station-admin":
      navItems = stationNavItems;
      break;
    case "reception-officer":
      navItems = receptionNavItems;
      break;
    case "investigator":
      navItems = investigatorNavItems;
      break;
    // ... autres cas
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white/70 text-xs font-medium">
        MENU
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={`${item.href}-${item.label}`}>  {/* clé unique */}
              <SidebarMenuButton asChild>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-white/10 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export { type NavItem };
