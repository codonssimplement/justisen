// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FileText, UserCheck, AlertTriangle, CheckCircle, Clock, UserPlus } from "lucide-react";

// const AdminDashboard = () => {
//   // In a real app, these would be fetched from your backend API
//   const stats = {
//     totalComplaints: 1247,
//     pendingAssignment: 42,
//     ongoingInvestigations: 156,
//     closedCases: 1049,
//     userAccounts: 523,
//     recentActivity: 24,
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord National</h1>
//         <p className="text-muted-foreground">Bienvenue sur le portail de la Police Nationale du Sénégal.</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="police-card-primary">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Plaintes Totales
//             </CardTitle>
//             <FileText className="h-4 w-4 text-police-navy" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalComplaints}</div>
//             <p className="text-xs text-muted-foreground">
//               Toutes les plaintes enregistrées dans le système
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="police-card-danger">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               En attente d'affectation
//             </CardTitle>
//             <AlertTriangle className="h-4 w-4 text-police-red" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.pendingAssignment}</div>
//             <p className="text-xs text-muted-foreground">
//               Plaintes à affecter à des enquêteurs
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="police-card-secondary">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Enquêtes en cours
//             </CardTitle>
//             <Clock className="h-4 w-4 text-police-blue" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.ongoingInvestigations}</div>
//             <p className="text-xs text-muted-foreground">
//               Enquêtes assignées actuellement en traitement
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="police-card-primary">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Affaires Classées
//             </CardTitle>
//             <CheckCircle className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.closedCases}</div>
//             <p className="text-xs text-muted-foreground">
//               Enquêtes résolues et dossiers clôturés
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="police-card-primary">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Utilisateurs Actifs
//             </CardTitle>
//             <UserCheck className="h-4 w-4 text-police-navy" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.userAccounts}</div>
//             <p className="text-xs text-muted-foreground">
//               Comptes utilisateurs sur la plateforme
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="police-card-primary">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Activités Récentes
//             </CardTitle>
//             <UserPlus className="h-4 w-4 text-police-blue" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.recentActivity}</div>
//             <p className="text-xs text-muted-foreground">
//               Activités des dernières 24 heures
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card className="col-span-1">
//           <CardHeader>
//             <CardTitle>Plaintes Récentes</CardTitle>
//             <CardDescription>
//               Dernières plaintes enregistrées sur le territoire national
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center gap-4 p-3 rounded-md border">
//                 <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
//                   <FileText className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-sm">Vol avec effraction</p>
//                   <p className="text-xs text-muted-foreground">Dakar Plateau, 10/04/2025</p>
//                 </div>
//                 <div className="complaint-status-pending">En attente</div>
//               </div>
              
//               <div className="flex items-center gap-4 p-3 rounded-md border">
//                 <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
//                   <FileText className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-sm">Agression en voie publique</p>
//                   <p className="text-xs text-muted-foreground">Médina, 09/04/2025</p>
//                 </div>
//                 <div className="complaint-status-assigned">Assignée</div>
//               </div>
              
//               <div className="flex items-center gap-4 p-3 rounded-md border">
//                 <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
//                   <FileText className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-sm">Fraude à la carte bancaire</p>
//                   <p className="text-xs text-muted-foreground">Thiès, 08/04/2025</p>
//                 </div>
//                 <div className="complaint-status-in-progress">En cours</div>
//               </div>
              
//               <div className="flex items-center gap-4 p-3 rounded-md border">
//                 <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
//                   <FileText className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-sm">Dégradation de véhicule</p>
//                   <p className="text-xs text-muted-foreground">Saint-Louis, 07/04/2025</p>
//                 </div>
//                 <div className="complaint-status-closed">Clôturée</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="col-span-1">
//           <CardHeader>
//             <CardTitle>Distribution par Région</CardTitle>
//             <CardDescription>
//               Répartition des affaires par région administrative
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium">Dakar</span>
//                   <span className="text-sm text-muted-foreground">416 plaintes</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-police-navy rounded-full" style={{ width: "38%" }}></div>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium">Thiès</span>
//                   <span className="text-sm text-muted-foreground">283 plaintes</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-police-blue rounded-full" style={{ width: "26%" }}></div>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium">Saint-Louis</span>
//                   <span className="text-sm text-muted-foreground">198 plaintes</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-blue-400 rounded-full" style={{ width: "18%" }}></div>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium">Ziguinchor</span>
//                   <span className="text-sm text-muted-foreground">156 plaintes</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-blue-300 rounded-full" style={{ width: "14%" }}></div>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium">Autres régions</span>
//                   <span className="text-sm text-muted-foreground">194 plaintes</span>
//                 </div>
//                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-slate-400 rounded-full" style={{ width: "17%" }}></div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import {  Station, User, Region } from "@/types";
import CommissionerStats from "@/components/admin/commissioners/CommissionerStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, UserCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import StationStats from "@/components/admin/stations/StationStats";
import StationHierarchy from "../admin/stations/StationHierarchy";
import UserStats from "@/components/admin/stations/UserStats";
import { Commissioner } from "@/utils/commissionerUtils";

interface AdminDashboardProps {
  stationStats: {
    total: number;
    active: number;
    byType: {
      regional: number;
      departmental: number;
      arrondissement: number;
    };
    byRegion: Record<string, number>;
    byStatus: Record<"active" | "inactive", number>;
  };
  userStats: {
    total: number;
    active: number;
    byRole: Record<string, number>;
    byStation: Record<string, number>;
    chiefs: number;
  };
  regions: Region[];
  users: User[];
  stations: Station[];
  commissioners: Commissioner[];
  onAssignChief: (stationId: string, userId: string) => void;
  onRemoveChief: (stationId: string) => void;
}

const AdminDashboard = ({
  stationStats,
  userStats,
  regions,
  users,
  stations,
  commissioners,
  onAssignChief,
  onRemoveChief
}: AdminDashboardProps) => {
  // Calculate additional statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const totalStations = stations.length;
  const activeStations = stations.filter(s => s.status === "active").length;
  const totalCommissioners = commissioners.length;
  const activeCommissioners = commissioners.filter(c => c.status === "active").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de Bord Administratif</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/admin/stations"}
          >
            Gestion des Commissariats
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/admin/commissioners"}
          >
            Gestion des Commissaires
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} actifs
            </p>
          </CardContent>
        </Card>

        {/* Total Stations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Commissariats</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStations}</div>
            <p className="text-xs text-muted-foreground">
              {activeStations} actifs
            </p>
          </CardContent>
        </Card>

        {/* Total Commissioners */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Commissaires</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommissioners}</div>
            <p className="text-xs text-muted-foreground">
              {activeCommissioners} actifs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Station & User Stats */}
        <div className="space-y-4">
          {/* Station Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Commissariats</CardTitle>
              <CardDescription>
                Vue d'ensemble des commissariats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StationStats stats={stationStats} />
            </CardContent>
          </Card>

          {/* User Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Utilisateurs</CardTitle>
              <CardDescription>
                Répartition des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserStats stats={userStats} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Commissioner & Supervision */}
        <div className="space-y-4">
          {/* Commissioner Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Commissaires</CardTitle>
              <CardDescription>
                Vue d'ensemble des commissaires régionaux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommissionerStats commissioners={commissioners} />
            </CardContent>
          </Card>

          {/* Station Hierarchy */}
          <Card>
            <CardHeader>
              <CardTitle>Supervision Nationale</CardTitle>
              <CardDescription>
                Vue hiérarchique et gestion des commissariats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StationHierarchy
                regions={regions}
                users={users}
                stations={stations}
                onAssignChief={onAssignChief}
                onRemoveChief={onRemoveChief}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;