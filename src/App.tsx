// src/App.tsx
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "./hooks/use-toast";
import { hasRole, isAuthenticated, getCurrentUser } from "./utils/auth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/admin/Index";
import StationsPage from "./pages/admin/Index";
import AdminDashboard from "./pages/admin/Dashboard";
import RegionalDashboard from "./pages/regional/dashboard";
import RegionalStationsPage from "./pages/regional/stations";
import ManageStationsPage from "./pages/regional/stations/manage";
import CommissionerManagementPage from "./components/admin/commissioners/CommissionerManagementPage";
import UsersPage from "./pages/admin/users";
import SettingsPage from "./pages/admin/settings";
import ProfilePage from "./pages/admin/profile";
import UserManagementPage from "./pages/admin/user-management";
import DashboardLayout from "./components/layout/DashboardLayout";
import { logout } from "./utils/auth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Toaster } from "sonner";
import StationDashboardPage from "./pages/station/dashboard";
import StationAgentsPage from "./pages/station/complaints";
import StationAssignmentsPage from "./pages/station/assignments";
import StationReceptionPage from "./pages/station/reception";
import AssignedComplaintsPage from "./pages/station/investigator/AssignedComplaintsPage";
import ComplaintDetailPage from "./pages/station/investigator/ComplaintDetailPage";

const App = () => {
  const { toast } = useToast();

  // Créer une nouvelle instance de QueryClient
  const queryClient = new QueryClient();

  // Redirect index for /station based on role
  const StationIndexRedirect = () => {
    const user = getCurrentUser();
    if (user?.role === 'reception-officer') return <Navigate to="reception/form" replace />;
    if (user?.role === 'investigator') return <Navigate to="investigator" replace />;
    return <Navigate to="dashboard" replace />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Route admin protégée */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout onLogout={logout}>
                    <Routes>
                      <Route 
                        path="dashboard" 
                        element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="stations" 
                        element={
                          <ProtectedRoute>
                            <StationsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="commissioners" 
                        element={
                          <ProtectedRoute>
                            <CommissionerManagementPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="users" 
                        element={
                          <ProtectedRoute>
                            <UsersPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="settings" 
                        element={
                          <ProtectedRoute>
                            <SettingsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="profile" 
                        element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="user-management" 
                        element={
                          <ProtectedRoute>
                            <UserManagementPage />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Route régional - gestion commissariats (spécifique) */}
            <Route path="/regional/stations/manage" element={
              <ProtectedRoute>
                <DashboardLayout onLogout={logout}>
                  <ManageStationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Route regional-admin protégée */}
            <Route 
              path="/regional/*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout onLogout={logout}>
                    <Routes>
                      <Route 
                        path="dashboard" 
                        element={
                          <ProtectedRoute>
                            <RegionalDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route 
                        path="stations" 
                        element={
                          <ProtectedRoute>
                            <RegionalStationsPage />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            {/* Route station-admin protégée */}
            <Route path="/station/*" element={
              <ProtectedRoute>
                <DashboardLayout onLogout={logout}>
                  <Routes>
                    <Route index element={<StationIndexRedirect />} />
                    <Route path="dashboard" element={<StationDashboardPage />} />
                    <Route path="complaints" element={<StationAgentsPage />} />
                    <Route path="assignments" element={<StationAssignmentsPage />} />
                    <Route path="investigator" element={<AssignedComplaintsPage />} />
                    <Route path="investigator/:id" element={<ComplaintDetailPage />} />
                    <Route path="reception/*" element={<StationReceptionPage />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/reception/*" element={<Navigate to="/station/reception" replace />} />
            <Route path="/investigator/*" element={<Navigate to="/station/investigator" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;