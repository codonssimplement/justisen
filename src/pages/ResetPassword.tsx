import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulation de l'envoi d'un email de réinitialisation
    try {
      // Dans une vraie application, appeler une API pour envoyer un email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Succès
      setSuccess(true);
      toast.success("Email envoyé", {
        description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe"
      });
    } catch (err) {
      setError("Impossible d'envoyer l'email de réinitialisation. Veuillez réessayer plus tard.");
      toast.error("Erreur", {
        description: "Échec de l'envoi de l'email de réinitialisation"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white py-4">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md ">
              <img 
                src="/logo_police (1).png" 
                alt="Police Nationale du Sénégal" 
                className="h-8 w-8" 
              />
            </div>
            <h1 className="text-2xl font-bold text-police-navy">Police Nationale du Sénégal</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md shadow-lg border-t-4 border-t-police-navy">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Button 
              variant="ghost" 
              className="absolute left-4 top-4" 
              onClick={handleBackToLogin}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour
            </Button>
            <div className="w-16 h-16 rounded-full  flex items-center justify-center text-white mb-4">
              <img 
                src="/logo_police (1).png" 
                alt="Police Nationale du Sénégal" 
                className="h-8 w-8 mb-[-2]" 
              />
            </div>
            <CardTitle className="text-2xl text-center text-police-navy">Réinitialisation du mot de passe</CardTitle>
            <CardDescription className="text-center">
              {success 
                ? "Un email de réinitialisation a été envoyé à votre adresse" 
                : "Entrez votre email professionnel pour recevoir un lien de réinitialisation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-800">
                  Un email a été envoyé à <strong>{email}</strong> avec les instructions pour réinitialiser votre mot de passe.
                </p>
                <p className="text-green-700 mt-2 text-sm">
                  Vérifiez votre boîte de réception et suivez les instructions.
                </p>
                <Button 
                  className="mt-4 bg-police-navy hover:bg-opacity-90" 
                  onClick={handleBackToLogin}
                >
                  Retour à la page de connexion
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email professionnel</Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@police-nationale.fr"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4 mt-1" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-police-navy hover:bg-opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center border-t pt-5">
            <p className="text-xs text-center text-muted-foreground">
              En cas de problème, veuillez contacter votre administrateur système.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Police Nationale du Sénégal - Portail Sécurisé
        </div>
      </footer>
    </div>
  );
};

export default ResetPassword;
