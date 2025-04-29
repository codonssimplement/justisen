// src/pages/admin/stations/index.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StationsList } from "@/components/admin/stations/StationsList";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/auth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "../Dashboard";

export default function StationsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      toast({
        title: "Session expirée",
        description: "Veuillez vous reconnecter.",
        variant: "destructive"
      });
    }
  }, [currentUser, navigate, toast]);

  return (
    <DashboardLayout onLogout={() => {}}>
      <StationsList />
    </DashboardLayout>
  );
}