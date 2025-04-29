import { useState, useEffect, ReactNode } from "react";
import { 
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, logout, isAuthenticated } from "@/utils/auth";
import { getUnreadNotificationsCount } from "@/utils/notifications";
import { SidebarBranding } from "./navigation/SidebarBranding";
import { Navigation } from "./navigation/Navigation";
import { UserProfile } from "./navigation/UserProfile";
import { Header } from "./header/Header";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const DashboardLayout = ({ children, onLogout }: DashboardLayoutProps) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    // In a real app, you would subscribe to notification updates
    if (currentUser) {
      const unreadCount = getUnreadNotificationsCount(currentUser.id);
      setNotificationCount(unreadCount);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    onLogout();
  };

  const userInitials = currentUser 
    ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`
    : "PN";

  const roleTitles: Record<UserRole, string> = {
    'admin': 'Directeur Général',
    'regional-admin': 'Commissaire Régional',
    'station-admin': 'Commissaire de Poste',
    'reception-officer': 'Officier d\'accueil',
    'investigator': 'Enquêteur',
    officer: ""
  };

  const userRoleTitle = currentUser ? roleTitles[currentUser.role] : '';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className="hidden md:flex">
          <div className="px-1 py-4 flex flex-col h-full">
            <SidebarBranding />
            <SidebarContent className="flex-1 px-1">
              {currentUser && <Navigation userRole={currentUser.role} />}
            </SidebarContent>
            
            {currentUser && (
              <UserProfile 
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
                role={currentUser.role}
                onLogout={handleLogout}
              />
            )}
          </div>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="overflow-auto pt-1 mr-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
