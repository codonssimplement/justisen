import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface ReceptionComplaint {
  id: string;
  victimName: string;
  location: string;
  date: string;
  crimeType: string;
  description: string;
  files: string[];
  status: string;
  assignment?: string;
  createdAt: string;
}

const defaultComplaints: ReceptionComplaint[] = [];

export default function StationReceptionPage() {
  const [activeTab, setActiveTab] = useState("form");
  const [complaints, setComplaints] = useState<ReceptionComplaint[]>(() => {
    const data = localStorage.getItem("receptionComplaints");
    return data ? JSON.parse(data) : defaultComplaints;
  });
  const [formData, setFormData] = useState({ victimName: "", location: "", date: "", crimeType: "", description: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("receptionComplaints", JSON.stringify(complaints));
  }, [complaints]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = () => {
    const dataFiles = files.map(f => f.name);
    if (editingId) {
      setComplaints(prev => prev.map(c => c.id === editingId ? {
        ...c,
        ...formData,
        files: dataFiles
      } : c));
      alert("Plainte mise à jour !");
      setEditingId(null);
    } else {
      const newComplaint: ReceptionComplaint = {
        id: Date.now().toString(),
        ...formData,
        files: dataFiles,
        status: "En attente d’assignation",
        createdAt: new Date().toISOString(),
      };
      setComplaints(prev => [...prev, newComplaint]);
      alert("Plainte soumise !");
    }
    setFormData({ victimName: "", location: "", date: "", crimeType: "", description: "" });
    setFiles([]);
  };

  const handleEdit = (id: string) => {
    const comp = complaints.find(c => c.id === id);
    if (comp) {
      setFormData({ victimName: comp.victimName, location: comp.location, date: comp.date, crimeType: comp.crimeType, description: comp.description });
      setFiles([]);
      setEditingId(id);
      setActiveTab("form");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer cette plainte ?")) {
      setComplaints(prev => prev.filter(c => c.id !== id));
      alert("Plainte supprimée !");
    }
  };

  return (
    <DashboardLayout onLogout={() => { }}>
      <div className="ml-64 p-6 max-w-screen-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-police-navy">Officier d’Accueil</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Enregistrement de Plainte</TabsTrigger>
            <TabsTrigger value="history">Historique des Plaintes</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Card>
              <CardHeader><CardTitle>Formulaire de Plainte</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Nom de la victime"
                  value={formData.victimName}
                  onChange={e => handleChange('victimName', e.target.value)}
                />
                <Input
                  placeholder="Lieu"
                  value={formData.location}
                  onChange={e => handleChange('location', e.target.value)}
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={e => handleChange('date', e.target.value)}
                />
                <Input
                  placeholder="Type de crime"
                  value={formData.crimeType}
                  onChange={e => handleChange('crimeType', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  className="w-full border rounded px-3 py-2"
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block"
                />
                <Button onClick={handleSubmit} className="bg-blue-600 text-white">
                  {editingId ? 'Mettre à jour' : 'Soumettre'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader><CardTitle>Historique des Plaintes</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                  <thead className="bg-police-navy">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Enquêteur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Date création</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {complaints.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-police-navy">{c.status}</td>
                        <td className="px-6 py-4 text-gray-700">{c.assignment || '-'}</td>
                        <td className="px-6 py-4 text-gray-700">{format(new Date(c.createdAt), 'dd/MM/yyyy')}</td>
                        <td className="px-6 py-4 space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(c.id)}>Éditer</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>Supprimer</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
