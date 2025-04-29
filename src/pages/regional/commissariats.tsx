import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Building2, UserCheck } from "lucide-react";

export default function RegionalCommissariats() {
  // TODO: fetch commissariats and units from backend or localStorage
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-6 pb-4 border-b-2 border-blue-200">Gestion des commissariats</h1>
        <Button variant="default" className="gap-2"><Plus className="w-4 h-4" /> Nouveau commissariat</Button>
      </div>
      <Card className="mb-6">
        <CardHeader className="pb-2 border-b-2 border-blue-200 mb-4">
          <CardTitle>Liste des commissariats</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: Table CRUD commissaires de commissariat */}
          <div className="text-gray-500 italic">Aucun commissariat pour le moment.</div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader className="pb-2 border-b-2 border-blue-200 mb-4">
          <CardTitle>Unités (Départements / Arrondissements)</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: CRUD unités */}
          <div className="text-gray-500 italic">Aucune unité créée.</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 border-b-2 border-blue-200 mb-4">
          <CardTitle>Attribution des chefs de poste</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: Attribution chefs de poste (select user) */}
          <div className="text-gray-500 italic">Aucun chef de poste attribué.</div>
        </CardContent>
      </Card>
    </div>
  );
}
