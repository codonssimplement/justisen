import React from "react";
import { getCurrentUser } from "@/utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, AtSign, Hash, Shield } from "lucide-react";

export default function ProfilePage() {
  const user = getCurrentUser();
  if (!user) return <div className="p-8">Utilisateur non connecté.</div>;
  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  const roleLabels: Record<string, string> = {
    'admin': 'Directeur Général',
    'regional-admin': 'Commissaire Régional',
    'station-admin': 'Commissaire de Poste',
    'reception-officer': "Officier d'accueil",
    'investigator': 'Enquêteur',
    'officer': 'Officier'
  };
  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 border-4 border-white shadow-md mb-2">
            {initials}
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight mb-0">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{user.firstName} {user.lastName}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <AtSign className="w-5 h-5 text-green-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Hash className="w-5 h-5 text-purple-500" />
              <span>{user.matricule || <span className="italic text-gray-400">-</span>}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Shield className="w-5 h-5 text-orange-500" />
              <Badge className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {roleLabels[user.role] || user.role}
              </Badge>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
