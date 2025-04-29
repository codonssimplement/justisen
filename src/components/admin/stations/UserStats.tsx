import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  UserX 
} from "lucide-react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis ,
  Cell
} from "recharts";
import { UserRole } from "@/types";
import { UserStatsType } from "./StationStats";

interface UserStatsProps {
    stats: UserStatsType;
  }
interface BarData {
    name: string;
    value: number;
  }
const UserStats = ({ stats }: UserStatsProps) => {
  // Data for charts
  const roleData = Object.entries(stats.byRole).map(([role, count]) => ({
    name: getRoleLabel(role as UserRole),
    value: count
  }));

  const stationData: BarData[] = Object.entries(stats.byStation).map(([station, count]) => ({
    name: station,
    value: count as number
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des Utilisateurs</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total} utilisateurs actifs
          </p>
        </CardContent>
      </Card>

      {/* By Role */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Par Rôle</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {roleData.map((entry, index) => (
  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* By Station */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Par Commissariat</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar data={stationData} fill="#8884d8" dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chiefs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chefs de Commissariat</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.chiefs}</div>
          <p className="text-xs text-muted-foreground">
            {stats.chiefs} chefs de commissariat assignés
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get role labels
const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return 'Directeur National';
    case 'regional-admin':
      return 'Commissaire Régional';
    case 'station-admin':
      return 'Commissaire de Station';
    case 'reception-officer':
      return 'Agent d\'Accueil';
    case 'investigator':
      return 'Enquêteur';
    case 'officer':
      return 'Agent';
    default:
      return role;
  }
};

// Colors for the pie chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff6b6b"
];

export default UserStats;