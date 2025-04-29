// src/components/auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      toast({
        title: "Session expirée",
        description: "Veuillez vous reconnecter.",
        variant: "destructive"
      });
    }
  }, [toast]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};