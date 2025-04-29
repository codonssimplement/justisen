import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InvestigatorDashboard = () => {
  // In a real app, these would be fetched from your backend API
  const stats = {
    assignedCases: 5,
    completedCases: 31,
    urgentCases: 2,
    pendingValidation: 1,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mes Enquêtes</h1>
        <p className="text-muted-foreground">Commissariat de Paris Centre</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Enquêtes Actives
            </CardTitle>
            <Clock className="h-4 w-4 text-police-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedCases}</div>
            <p className="text-xs text-muted-foreground">
              Affaires en cours d'enquête
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Enquêtes Terminées
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCases}</div>
            <p className="text-xs text-muted-foreground">
              Affaires clôturées
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-danger">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Urgentes
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-police-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.urgentCases}</div>
            <p className="text-xs text-muted-foreground">
              Nécessitent une attention immédiate
            </p>
          </CardContent>
        </Card>
        <Card className="police-card-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              En attente de validation
            </CardTitle>
            <FileText className="h-4 w-4 text-police-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingValidation}</div>
            <p className="text-xs text-muted-foreground">
              Prêtes pour clôture
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mes enquêtes actives</CardTitle>
          <CardDescription>
            Affaires qui vous sont assignées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-md border border-l-4 border-l-police-red">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">Agression en voie publique</h3>
                  <Badge variant="destructive" className="bg-police-red">Urgent</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Place de la République • No. PNC-250409-02</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Assignée le 09/04/2025</span>
                  </span>
                  <span className="inline-block mx-2">•</span>
                  <span>2 témoins à interroger</span>
                </div>
              </div>
              <div>
                <Button>Voir détails</Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-md border border-l-4 border-l-police-red">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">Vol à main armée</h3>
                  <Badge variant="destructive" className="bg-police-red">Urgent</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Rue de Rivoli • No. PNC-250408-01</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Assignée le 08/04/2025</span>
                  </span>
                  <span className="inline-block mx-2">•</span>
                  <span>Caméras de surveillance à vérifier</span>
                </div>
              </div>
              <div>
                <Button>Voir détails</Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-md border">
              <div className="flex-1">
                <h3 className="font-medium mb-2">Dégradation de véhicule</h3>
                <p className="text-sm text-muted-foreground mb-2">Rue de la Paix • No. PNC-250407-04</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Assignée le 07/04/2025</span>
                  </span>
                  <span className="inline-block mx-2">•</span>
                  <span>Photos des dommages à examiner</span>
                </div>
              </div>
              <div>
                <Button>Voir détails</Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-md border">
              <div className="flex-1">
                <h3 className="font-medium mb-2">Vol à l'étalage</h3>
                <p className="text-sm text-muted-foreground mb-2">Avenue des Champs-Élysées • No. PNC-250406-03</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Assignée le 06/04/2025</span>
                  </span>
                  <span className="inline-block mx-2">•</span>
                  <span>Suspect identifié, à interroger</span>
                </div>
              </div>
              <div>
                <Button>Voir détails</Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-md border border-l-4 border-l-blue-400">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">Escroquerie en ligne</h3>
                  <Badge className="bg-blue-500">Clôture proposée</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">En ligne • No. PNC-250405-02</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Assignée le 05/04/2025</span>
                  </span>
                  <span className="inline-block mx-2">•</span>
                  <span>En attente de validation</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Modifier</Button>
                <Button>Détails</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Dernières actions sur vos enquêtes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Rapport ajouté</p>
                  <p className="text-xs text-muted-foreground">Vous avez ajouté un rapport d'enquête sur le dossier #PNC-250409-02</p>
                  <p className="text-xs text-muted-foreground mt-1">10/04/2025 à 09:45</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-1 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Témoin interrogé</p>
                  <p className="text-xs text-muted-foreground">Témoin principal interrogé dans l'affaire #PNC-250408-01</p>
                  <p className="text-xs text-muted-foreground mt-1">09/04/2025 à 16:20</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-1 bg-police-navy rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Clôture demandée</p>
                  <p className="text-xs text-muted-foreground">Vous avez demandé la clôture du dossier #PNC-250405-02</p>
                  <p className="text-xs text-muted-foreground mt-1">08/04/2025 à 11:15</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-1 bg-police-blue rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouvelle preuve ajoutée</p>
                  <p className="text-xs text-muted-foreground">Photos ajoutées au dossier #PNC-250407-04</p>
                  <p className="text-xs text-muted-foreground mt-1">07/04/2025 à 14:30</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistiques personnelles</CardTitle>
            <CardDescription>
              Vos performances d'enquête
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Taux de résolution</span>
                  <span className="text-sm text-muted-foreground">86%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "86%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Temps moyen de résolution</span>
                  <span className="text-sm text-muted-foreground">14 jours</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-police-navy rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Preuves collectées/affaire</span>
                  <span className="text-sm text-muted-foreground">6.2</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-police-blue rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Témoins interrogés/affaire</span>
                  <span className="text-sm text-muted-foreground">3.8</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "38%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestigatorDashboard;
