import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserCheck, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";

const RegionalDashboard = () => {
  // In a real app, these would be fetched from your backend API
  const stats = {
    totalComplaints: 342,
    pendingAssignment: 18,
    ongoingInvestigations: 57,
    closedCases: 267,
    totalStations: 8,
    totalOfficers: 64,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Régional</h1>
        <p className="text-muted-foreground">Supervision de la région de Dakar.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Plaintes Régionales
            </CardTitle>
            <FileText className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">
              Toutes les plaintes enregistrées dans la région
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-danger">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              En attente d'affectation
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-police-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssignment}</div>
            <p className="text-xs text-muted-foreground">
              Plaintes à affecter à des enquêteurs
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Enquêtes en cours
            </CardTitle>
            <Clock className="h-4 w-4 text-police-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ongoingInvestigations}</div>
            <p className="text-xs text-muted-foreground">
              Enquêtes assignées actuellement en traitement
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Affaires Classées
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.closedCases}</div>
            <p className="text-xs text-muted-foreground">
              Enquêtes résolues et dossiers clôturés
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Commissariats
            </CardTitle>
            <MapPin className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStations}</div>
            <p className="text-xs text-muted-foreground">
              Commissariats dans la région
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Agents
            </CardTitle>
            <UserCheck className="h-4 w-4 text-police-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOfficers}</div>
            <p className="text-xs text-muted-foreground">
              Officiers et enquêteurs actifs
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Plaintes Récentes</CardTitle>
            <CardDescription>
              Dernières plaintes enregistrées dans la région
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Vol avec effraction</p>
                  <p className="text-xs text-muted-foreground">Plateau, 10/04/2025</p>
                </div>
                <div className="complaint-status-pending">En attente</div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Véhicule vandalisé</p>
                  <p className="text-xs text-muted-foreground">Médina, 09/04/2025</p>
                </div>
                <div className="complaint-status-assigned">Assignée</div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Agression verbale</p>
                  <p className="text-xs text-muted-foreground">Grand Dakar, 08/04/2025</p>
                </div>
                <div className="complaint-status-in-progress">En cours</div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Cambriolage résidentiel</p>
                  <p className="text-xs text-muted-foreground">Pikine, 07/04/2025</p>
                </div>
                <div className="complaint-status-closed">Clôturée</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribution par Commissariat</CardTitle>
            <CardDescription>
              Répartition des affaires par commissariat de la région
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Plateau</span>
                  <span className="text-sm text-muted-foreground">86 plaintes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-police-navy rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Médina</span>
                  <span className="text-sm text-muted-foreground">62 plaintes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-police-blue rounded-full" style={{ width: "18%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Grand Dakar</span>
                  <span className="text-sm text-muted-foreground">54 plaintes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pikine</span>
                  <span className="text-sm text-muted-foreground">47 plaintes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300 rounded-full" style={{ width: "13%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Autres commissariats</span>
                  <span className="text-sm text-muted-foreground">93 plaintes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: "29%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegionalDashboard;
