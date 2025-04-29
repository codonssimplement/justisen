import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import RegionalDashboard from "@/components/dashboard/RegionalDashboard";
import StationDashboard from "@/components/dashboard/StationDashboard";
import OfficerDashboard from "@/components/dashboard/OfficerDashboard";
import InvestigatorDashboard from "@/components/dashboard/InvestigatorDashboard";
import { getCurrentUser, isAuthenticated, logout } from "@/utils/auth";

const Index = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = () => {
      if (!isAuthenticated()) {
        navigate("/login");
      } else {
        setIsUserAuthenticated(true);
        
        // Rediriger l'admin vers son tableau de bord spécifique
        const currentUser = getCurrentUser();
        if (currentUser?.role === "admin") {
          navigate("/admin");
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    logout().then(() => {
      setIsUserAuthenticated(false);
      navigate("/login");
    });
  };

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-police-navy"></div>
    </div>;
  }

  // Si l'utilisateur est authentifié, afficher le tableau de bord approprié
  if (isUserAuthenticated) {
    const currentUser = getCurrentUser();
    let dashboard;

    // Rendre le tableau de bord approprié en fonction du rôle de l'utilisateur
    switch (currentUser?.role) {
      case "regional-admin":
        dashboard = <RegionalDashboard />;
        break;
      case "station-admin":
        dashboard = <StationDashboard />;
        break;
      case "reception-officer":
        dashboard = <OfficerDashboard />;
        break;
      case "investigator":
        dashboard = <InvestigatorDashboard />;
        break;
      default:
        dashboard = <AdminDashboard stationStats={{
          total: 0,
          active: 0,
          byType: {
            regional: 0,
            departmental: 0,
            arrondissement: 0
          },
          byRegion: undefined,
          byStatus: undefined
        }} userStats={{
          total: 0,
          active: 0,
          byRole: undefined,
          byStation: undefined,
          chiefs: 0
        }} regions={[]} users={[]} stations={[]} commissioners={[]} onAssignChief={function (stationId: string, userId: string): void {
          throw new Error("Function not implemented.");
        } } onRemoveChief={function (stationId: string): void {
          throw new Error("Function not implemented.");
        } } />;
    }

    return (
      <DashboardLayout onLogout={handleLogout}>
        {dashboard}
      </DashboardLayout>
    );
  }

  // Cette partie ne devrait normalement pas s'exécuter car la redirection aura lieu
  return null;
};

export default Index;
