import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/auth";

const SettingsPage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, []);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Simulate save profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profil mis à jour", description: "Vos informations ont bien été enregistrées." });
  };

  // Simulate password change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    toast({ title: "Mot de passe modifié", description: "Votre mot de passe a bien été changé." });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="ml-72 max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="password">Mot de passe</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSaveProfile}>
                <div className="flex gap-4">
                  <Input
                    placeholder="Prénom"
                    value={profile.firstName}
                    onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                  />
                  <Input
                    placeholder="Nom"
                    value={profile.lastName}
                    onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                  />
                </div>
                <Input
                  placeholder="Email"
                  value={profile.email}
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  type="email"
                />
                <Input
                  placeholder="Téléphone"
                  value={profile.phone}
                  onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                  type="tel"
                />
                <div className="flex justify-end">
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleChangePassword}>
                <Input
                  placeholder="Mot de passe actuel"
                  value={passwords.current}
                  onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                  type="password"
                />
                <Input
                  placeholder="Nouveau mot de passe"
                  value={passwords.new}
                  onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
                  type="password"
                />
                <Input
                  placeholder="Confirmer le nouveau mot de passe"
                  value={passwords.confirm}
                  onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                  type="password"
                />
                <div className="flex justify-end">
                  <Button type="submit">Changer le mot de passe</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
