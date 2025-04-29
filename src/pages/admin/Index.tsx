// src/pages/admin/Index.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Utiliser react-router-dom au lieu de next/router
import { StationsList } from "@/components/admin/stations/StationsList";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/auth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "./Dashboard";

export default function StationsPage() {
  const navigate = useNavigate(); // Utiliser navigate au lieu de router
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login"); // Utiliser navigate au lieu de router.push
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits nécessaires pour accéder à cette page.",
        variant: "destructive"
      });
    }
  }, [currentUser, navigate, toast]); // Mettre navigate au lieu de router dans les dépendances

  return (
    <DashboardLayout onLogout={() => {}}>
      <StationsList/>
    </DashboardLayout>
  );
}    