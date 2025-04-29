import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { regions } from "@/utils/commissionerUtils";
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

import CommissionerStats from "./CommissionerStats";
import { Commissioner } from "@/utils/commissionerUtils";
import { PieChart } from "lucide-react";

interface CommissionerSupervisionProps {
  commissioners: Commissioner[];
}

const CommissionerSupervision = ({ commissioners }: CommissionerSupervisionProps) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column - Statistics */}
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
      </div>

      {/* Right Column - Supervision */}
      <div className="space-y-4">
        {/* Commissioner Hierarchy */}
        <Card>
          <CardHeader>
            <CardTitle>Supervision des Commissaires</CardTitle>
            <CardDescription>
              Vue hiérarchique et gestion des commissaires régionaux
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Region Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Région</CardTitle>
                  <CardDescription>
                    Nombre de commissaires par région
                  </CardDescription>
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

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Statut</CardTitle>
                  <CardDescription>
                    Répartition des commissaires par statut
                  </CardDescription>
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
          </CardContent>
        </Card>
      </div>
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

export default CommissionerSupervision;