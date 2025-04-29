import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Plus, Clock } from "lucide-react";

const OfficerDashboard = () => {
  // In a real app, these would be fetched from your backend API
  const stats = {
    complaintsRegistered: 43,
    complaintsToday: 2,
    pendingAssignment: 7,
    totalClosed: 28,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accueil</h1>
          <p className="text-muted-foreground">Commissariat de Paris Centre</p>
        </div>
        <Button className="bg-police-navy hover:bg-opacity-90 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle Plainte</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Plaintes Enregistrées
            </CardTitle>
            <FileText className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.complaintsRegistered}</div>
            <p className="text-xs text-muted-foreground">
              Total des plaintes que vous avez enregistrées
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Aujourd'hui
            </CardTitle>
            <FileText className="h-4 w-4 text-police-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.complaintsToday}</div>
            <p className="text-xs text-muted-foreground">
              Plaintes enregistrées aujourd'hui
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-danger">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              En attente
            </CardTitle>
            <Clock className="h-4 w-4 text-police-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssignment}</div>
            <p className="text-xs text-muted-foreground">
              En attente d'affectation
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Clôturées
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClosed}</div>
            <p className="text-xs text-muted-foreground">
              Total des dossiers clôturés
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Plaintes récemment enregistrées</CardTitle>
            <CardDescription>
              Dernières plaintes que vous avez saisies dans le système
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
                  <p className="text-xs text-muted-foreground">10/04/2025 • Rue de Rivoli • No. PNC-250410-01</p>
                </div>
                <div className="complaint-status-pending">En attente</div>
                <Button size="sm" variant="secondary">Détails</Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Agression en voie publique</p>
                  <p className="text-xs text-muted-foreground">10/04/2025 • Place de la République • No. PNC-250410-02</p>
                </div>
                <div className="complaint-status-pending">En attente</div>
                <Button size="sm" variant="secondary">Détails</Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Dégradation de véhicule</p>
                  <p className="text-xs text-muted-foreground">09/04/2025 • Rue de la Paix • No. PNC-250409-04</p>
                </div>
                <div className="complaint-status-assigned">Assignée</div>
                <Button size="sm" variant="secondary">Détails</Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Vol à l'étalage</p>
                  <p className="text-xs text-muted-foreground">09/04/2025 • Avenue des Champs-Élysées • No. PNC-250409-03</p>
                </div>
                <div className="complaint-status-assigned">Assignée</div>
                <Button size="sm" variant="secondary">Détails</Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Harcèlement sur les réseaux sociaux</p>
                  <p className="text-xs text-muted-foreground">08/04/2025 • En ligne • No. PNC-250408-02</p>
                </div>
                <div className="complaint-status-in-progress">En cours</div>
                <Button size="sm" variant="secondary">Détails</Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-md border">
                <div className="h-9 w-9 rounded-full bg-police-lightblue flex items-center justify-center text-police-navy shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Escroquerie en ligne</p>
                  <p className="text-xs text-muted-foreground">07/04/2025 • En ligne • No. PNC-250407-05</p>
                </div>
                <div className="complaint-status-closed">Clôturée</div>
                <Button size="sm" variant="secondary">Détails</Button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">Voir toutes les plaintes</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accès rapide</CardTitle>
          <CardDescription>
            Formulaires et ressources fréquemment utilisés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 gap-3">
              <Plus className="h-6 w-6 text-police-navy" />
              <div className="text-center">
                <p className="font-medium">Nouvelle plainte</p>
                <p className="text-xs text-muted-foreground mt-1">Enregistrer une nouvelle plainte</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 gap-3">
              <FileText className="h-6 w-6 text-police-blue" />
              <div className="text-center">
                <p className="font-medium">Formulaire de déclaration</p>
                <p className="text-xs text-muted-foreground mt-1">Documents pour les déclarations</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 gap-3">
              <Clock className="h-6 w-6 text-police-navy" />
              <div className="text-center">
                <p className="font-medium">Statistiques</p>
                <p className="text-xs text-muted-foreground mt-1">Voir vos statistiques personnelles</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerDashboard;
