import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Map, CheckCircle, AlertTriangle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

// Mock data for the statistics panel
const nationalStats = {
  totalComplaints: 1247,
  pendingAssignment: 42,
  activeInvestigations: 156,
  closedComplaints: 1049,
  totalRegions: 14,
  regionalCommissioners: 15,
  stationCommissioners: 72,
  investigatingOfficers: 286,
};

// Mock data for the regions chart
const regionData = [
  { name: "Dakar", complaints: 320, solved: 290 },
  { name: "Thiès", complaints: 240, solved: 210 },
  { name: "Diourbel", complaints: 170, solved: 145 },
  { name: "Saint-Louis", complaints: 160, solved: 140 },
  { name: "Kaolack", complaints: 130, solved: 115 },
  { name: "Ziguinchor", complaints: 120, solved: 105 },
  { name: "Matam", complaints: 110, solved: 90 },
];

const AdminStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total des Plaintes
            </CardTitle>
            <FileText className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nationalStats.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">
              Toutes plaintes confondues
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              En Attente
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nationalStats.pendingAssignment}</div>
            <p className="text-xs text-muted-foreground">
              Plaintes non assignées
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enquêtes Actives
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nationalStats.activeInvestigations}</div>
            <p className="text-xs text-muted-foreground">
              Enquêtes en cours
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Plaintes Classées
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nationalStats.closedComplaints}</div>
            <p className="text-xs text-muted-foreground">
              Dossiers résolus
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Statistiques par Région</CardTitle>
            <CardDescription>
              Plaintes et résolutions par région administrative
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                complaints: {
                  label: "Plaintes déposées",
                  color: "#3b82f6",
                },
                solved: {
                  label: "Plaintes résolues",
                  color: "#22c55e",
                },
              }}
            >
              <BarChart data={regionData} layout="vertical" barCategoryGap={8}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent active={active} payload={payload} />
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="complaints" name="Plaintes déposées" fill="#3b82f6" />
                <Bar dataKey="solved" name="Plaintes résolues" fill="#22c55e" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Personnel National</CardTitle>
            <CardDescription>
              Répartition des effectifs par fonction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-10 w-10 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <Map className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Régions administratives</p>
                  <p className="text-sm text-muted-foreground">{nationalStats.totalRegions} régions couvertes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-10 w-10 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Commissaires régionaux</p>
                  <p className="text-sm text-muted-foreground">{nationalStats.regionalCommissioners} commissaires en poste</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-10 w-10 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Commissaires de poste</p>
                  <p className="text-sm text-muted-foreground">{nationalStats.stationCommissioners} commissaires à travers le pays</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-10 w-10 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Enquêteurs</p>
                  <p className="text-sm text-muted-foreground">{nationalStats.investigatingOfficers} officiers enquêteurs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatistics;
