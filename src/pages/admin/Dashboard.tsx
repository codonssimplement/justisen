import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminStatistics from "@/components/admin/AdminStatistics";
import CommissionersList from "@/components/admin/CommissionersList";
import ComplaintHistory from "@/components/admin/ComplaintHistory";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("statistics");

  return (
    <div className="space-y-6 ml-72">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-police-navy">Administrateur</h1>
      </div>
      <Tabs
        defaultValue="statistics"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="statistics">Statistiques Nationales</TabsTrigger>
          <TabsTrigger value="commissioners">Commissaires Régionaux</TabsTrigger>
          <TabsTrigger value="complaints">Plaintes Traitées</TabsTrigger>
        </TabsList>
        <TabsContent value="statistics" className="space-y-4">
          <AdminStatistics />
        </TabsContent>
        <TabsContent value="commissioners" className="space-y-4">
          <CommissionersList />
        </TabsContent>
        <TabsContent value="complaints" className="space-y-4">
          <ComplaintHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;