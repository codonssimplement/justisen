import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login, getCurrentUser } from "@/utils/auth";
import { Shield, Key, User, AlertTriangle, AlertCircle, Mail } from "lucide-react";
import { toast } from "sonner";

type ErrorType = "invalid-credentials" | "account-suspended" | "access-blocked" | null;

const errorMessages = {
  "invalid-credentials": "Identifiant ou mot de passe incorrect.",
  "account-suspended": "Votre compte a été suspendu. Veuillez contacter votre administrateur.",
  "access-blocked": "Accès temporairement bloqué suite à plusieurs échecs de connexion."
};

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorType(null);

    try {
      const user = await login(identifier, password);
      
      toast.success("Connexion réussie", {
        description: `Bienvenue, ${user.firstName} ${user.lastName}`,
      });

      // Redirection vers le tableau de bord en fonction du rôle
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "regional-admin":
          navigate("/regional/dashboard");
          break;
        case "station-admin":
          navigate("/station/dashboard");
          break;
        case "reception-officer":
          navigate("/station/reception/form", { replace: true });
          break;
        case "investigator":
          navigate("/station/investigator", { replace: true });
          break;
        default:
          navigate("/");
      }
    } catch (err: any) {
      // Gestion des différents types d'erreurs
      if (err.message === "Invalid credentials") {
        setErrorType("invalid-credentials");
      } else if (err.message?.includes("suspended")) {
        setErrorType("account-suspended");
      } else if (err.message?.includes("blocked")) {
        setErrorType("access-blocked");
      } else {
        setErrorType("invalid-credentials"); // Erreur par défaut
      }
      
      toast.error("Échec de la connexion", {
        description: "Vérifiez vos identifiants et réessayez.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/reset-password");
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
            <div className="w-16 h-16 rounded-full  flex items-center justify-center text-white mb-4">
              <img 
                src="/logo_police (1).png" 
                alt="Police Nationale du Sénégal" 
                className="h-8 w-8 mb-[-2]" 
              />
            </div>
            <CardTitle className="text-2xl text-center text-police-navy">Portail de connexion</CardTitle>
            <CardDescription className="text-center text-police-navy mb-4">
              Authentifiez-vous avec votre matricule ou email professionnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="identifier">Matricule / Email</Label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground">
                      {identifier.includes('@') ? <Mail className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <Input
                      id="identifier"
                      placeholder="PNXXX ou email@police-nationale.sn"
                      className="pl-10"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a 
                      href="#" 
                      onClick={handleForgotPassword}
                      className="text-sm text-police-blue hover:underline"
                    >
                      Mot de passe oublié?
                    </a>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {errorType && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4 mt-1" />
                    <AlertDescription>
                      {errorMessages[errorType]}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-police-navy hover:bg-opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center border-t pt-5">
            <p className="text-xs text-center text-muted-foreground">
              Ce portail est réservé au personnel de la Police Nationale du Sénégal.
              <br />Toute utilisation non autorisée est strictement interdite.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          {new Date().getFullYear()} Police Nationale du Sénégal - Portail Sécurisé
        </div>
      </footer>
    </div>
  );
};

export default Login;