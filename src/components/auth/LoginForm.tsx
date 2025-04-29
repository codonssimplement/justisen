import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { login } from "@/utils/auth";
import { Shield, Key, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onLoginSuccess: (redirectTo: string) => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

// src/components/auth/LoginForm.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const user = await login(identifier, password);
    
    toast.success("Connexion réussie", {
      description: `Bienvenue, ${user.firstName} ${user.lastName}`,
    });
 // Déterminer la page de redirection selon le rôle
 let redirectPath = "/dashboard";
 switch (user.role) {
   case 'admin':
     redirectPath = "/admin/dashboard";
     break;
   case 'regional-admin':
     redirectPath = "/admin/dashboard";
     break;
   case 'station-admin':
     redirectPath = "/admin/stations";
     break;
   case 'reception-officer':
     redirectPath = "/dashboard";
     break;
   case 'investigator':
     redirectPath = "/dashboard";
     break;
 }
 
    
    onLoginSuccess(redirectPath);
  } catch (err) {
    setError("Identifiant ou mot de passe incorrect");
    toast.error("Échec de la connexion", {
      description: "Vérifiez vos identifiants et réessayez.",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Card className="w-full max-w-md shadow-lg border-t-4 border-t-police-navy">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-police-navy flex items-center justify-center text-white mb-4">
          <Shield size={32} />
        </div>
        <CardTitle className="text-2xl text-center">Portail Police Nationale</CardTitle>
        <CardDescription className="text-center">
          Connectez-vous avec votre matricule ou email professionnel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Matricule / Email</Label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="identifier"
                  placeholder="PNXXX ou email@police-nationale.fr"
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
                <a href="#" className="text-sm text-police-blue hover:underline">
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

            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-start gap-2 text-sm">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
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
          Ce portail est réservé au personnel de la Police Nationale.
          <br />Toute utilisation non autorisée est strictement interdite.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
