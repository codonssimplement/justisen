import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  MapPin, 
  BarChart2, 
  PieChart 
} from "lucide-react";
import { 
    Bar, 
    BarChart, 
    CartesianGrid, 
    Legend, 
    Pie, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis,
    Cell
  } from "recharts";
  
  export interface StationStats {
    total: number;
    active: number;
    byType: {
      regional: number;
      departmental: number;
      arrondissement: number;
    };
    byRegion: Record<string, number>;
    byStatus: Record<"active" | "inactive", number>;
  }
  
  export interface UserStatsType {
    total: number;
    active: number;
    byRole: Record<string, number>;
    byStation: Record<string, number>;
    chiefs: number;
  }

interface StationStatsProps {
  stats: StationStats;
}

const StationStats = ({ stats }: StationStatsProps) => {
  // Data for charts
  const typeData = [
    { name: "Régional", value: stats.byType.regional },
    { name: "Départemental", value: stats.byType.departmental },
    { name: "Arrondissement", value: stats.byType.arrondissement }
  ];

  const regionData = Object.entries(stats.byRegion).map(([region, count]) => ({
    name: region,
    value: count
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Stations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des Commissariats</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total} commissariats actifs
          </p>
        </CardContent>
      </Card>

      {/* By Type */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Par Type</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
          <PieChart>
  <Pie
    data={typeData}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={80}
    fill="#8884d8"
    paddingAngle={5}
    dataKey="value"
  >
    {typeData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* By Region */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Par Région</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <ResponsiveContainer width="100%" height={200}>
  <BarChart>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar 
      data={regionData} 
      fill="#8884d8" 
      dataKey="value"  // This tells recharts to use the 'value' property for the bars
    />
  </BarChart>
</ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
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

export default StationStats;