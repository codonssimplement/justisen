import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Commissioner, regions } from "@/utils/commissionerUtils";
import { 
  Users, 
  MapPin, 
  BarChart2,
  PieChart, 
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


interface CommissionerStatsProps {
  commissioners: Commissioner[];
}

const CommissionerStats = ({ commissioners }: CommissionerStatsProps) => {
  // Calculate statistics
  const total = commissioners.length;
  const byRegion = regions.reduce((acc, region) => {
    acc[region] = commissioners.filter(c => c.region === region).length;
    return acc;
  }, {} as Record<string, number>);

  const byStatus = commissioners.reduce((acc, commissioner) => {
    acc[commissioner.status] = (acc[commissioner.status] || 0) + 1;
    return acc;
  }, { active: 0, inactive: 0 });

  const regionData = Object.entries(byRegion).map(([region, count]) => ({
    name: region,
    value: count
  }));

  const statusData = Object.entries(byStatus).map(([status, count]) => ({
    name: status === "active" ? "Actifs" : "Inactifs",
    value: count
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Commissioners */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des Commissaires</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">
            {total} commissaires régionaux
          </p>
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

      {/* By Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Statut</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
          <PieChart>
  <Pie
    data={statusData}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={80}
    fill="#8884d8"
    paddingAngle={5}
    dataKey="value"
  >
    {statusData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
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

export default CommissionerStats;