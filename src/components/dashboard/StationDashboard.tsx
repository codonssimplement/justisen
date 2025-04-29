import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserCheck, AlertTriangle, CheckCircle, Clock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const StationDashboard = () => {
  // In a real app, these would be fetched from your backend API
  const stats = {
    totalComplaints: 87,
    pendingAssignment: 9,
    ongoingInvestigations: 24,
    closedCases: 54,
    totalOfficers: 14,
    totalInvestigators: 8,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Commissariat</h1>
        <p className="text-muted-foreground">Commissariat de Paris Centre</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Plaintes Totales
            </CardTitle>
            <FileText className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">
              Toutes les plaintes enregistrées dans le commissariat
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
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.pendingAssignment}</div>
                <p className="text-xs text-muted-foreground">
                  Plaintes à affecter
                </p>
              </div>
              <Button size="sm" className="bg-police-navy hover:bg-opacity-90">
                Affecter
              </Button>
            </div>
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
              Officiers d'accueil
            </CardTitle>
            <UserCheck className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOfficers}</div>
            <p className="text-xs text-muted-foreground">
              Officiers d'accueil du commissariat
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Enquêteurs
            </CardTitle>
            <UserPlus className="h-4 w-4 text-police-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvestigators}</div>
            <p className="text-xs text-muted-foreground">
              Enquêteurs affectés au commissariat
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Plaintes à affecter</CardTitle>
            <CardDescription>
              Plaintes en attente d'affectation à un enquêteur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-md border border-l-4 border-l-police-red">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Vol avec effraction</p>
                  <p className="text-xs text-muted-foreground">10/04/2025 • Rue de Rivoli</p>
                </div>
                <Button size="sm" variant="outline">
                  Affecter
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border border-l-4 border-l-police-red">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Agression en voie publique</p>
                  <p className="text-xs text-muted-foreground">09/04/2025 • Place de la République</p>
                </div>
                <Button size="sm" variant="outline">
                  Affecter
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border border-l-4 border-l-police-red">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Dégradation de véhicule</p>
                  <p className="text-xs text-muted-foreground">08/04/2025 • Rue de la Paix</p>
                </div>
                <Button size="sm" variant="outline">
                  Affecter
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border border-l-4 border-l-police-red">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Vol à l'étalage</p>
                  <p className="text-xs text-muted-foreground">07/04/2025 • Avenue des Champs-Élysées</p>
                </div>
                <Button size="sm" variant="outline">
                  Affecter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Charges de travail des enquêteurs</CardTitle>
            <CardDescription>
              Nombre d'enquêtes assignées par enquêteur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dubois, Marie</span>
                  <span className="text-sm text-muted-foreground">5 enquêtes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-police-navy rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Leroy, Thomas</span>
                  <span className="text-sm text-muted-foreground">4 enquêtes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-police-blue rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Petit, Julie</span>
                  <span className="text-sm text-muted-foreground">6 enquêtes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Moreau, Michel</span>
                  <span className="text-sm text-muted-foreground">3 enquêtes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Simon, Claire</span>
                  <span className="text-sm text-muted-foreground">6 enquêtes</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StationDashboard;
