import React from "react";
import RegionalStatistics from "@/components/regional/RegionalStatistics";
import RegionalCommissariatsList from "@/components/regional/RegionalCommissariatsList";
import RegionalComplaintHistory from "@/components/regional/RegionalComplaintHistory";

export default function RegionalDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 md:pl-40">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 pb-4 border-b-2 border-blue-200 text-center whitespace-normal break-words">Tableau de bord régional</h1>
      {/* Statistiques en ligne */}
      <div className="mb-10">
        <RegionalStatistics />
      </div>
      {/* Deux tableaux côte à côte sur desktop, l’un sous l’autre sur mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RegionalCommissariatsList />
        <RegionalComplaintHistory />
      </div>
    </div>
  );
}
