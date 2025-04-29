import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, User, FileText } from "lucide-react";

interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  matricule: string;
  role: "reception-officer" | "investigator";
  assignment: string;
}

export const initialAgents: Agent[] = [
  { id: 1, firstName: "Sophie", lastName: "Dupont", matricule: "ROPN001", role: "reception-officer", assignment: "Poste 1" },
  { id: 2, firstName: "Ahmed", lastName: "Diallo", matricule: "IENQ002", role: "investigator", assignment: "Poste A" },
  { id: 3, firstName: "Marie", lastName: "Durand", matricule: "IENQ003", role: "investigator", assignment: "Poste B" },
  { id: 4, firstName: "Koffi", lastName: "Yao", matricule: "IENQ004", role: "investigator", assignment: "Poste C" },
  { id: 5, firstName: "Aïssatou", lastName: "Ndiaye", matricule: "IENQ005", role: "investigator", assignment: "Poste D" },
];

export default function StationAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(() => {
    const data = localStorage.getItem('stationAgents');
    return data ? JSON.parse(data) as Agent[] : initialAgents;
  });
  const [form, setForm] = useState<Omit<Agent, 'id'>>({ firstName: "", lastName: "", matricule: "", role: "reception-officer", assignment: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    if (editingId == null) {
      const newAgent: Agent = { id: Date.now(), ...form };
      setAgents(prev => [...prev, newAgent]);
    } else {
      setAgents(prev => prev.map(a => a.id === editingId ? { id: editingId, ...form } as Agent : a));
    }
    setForm({ firstName: "", lastName: "", matricule: "", role: "reception-officer", assignment: "" });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) {
      return;
    }
    setAgents(agents.filter(a => a.id !== id));
  };

  const handleEdit = (agent: Agent) => {
    setEditingId(agent.id);
    const { id, ...rest } = agent;
    setForm(rest);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ firstName: "", lastName: "", matricule: "", role: "reception-officer", assignment: "" });
  };

  useEffect(() => {
    localStorage.setItem('stationAgents', JSON.stringify(agents));
  }, [agents]);

  return (
    <DashboardLayout onLogout={() => {}}>
      <div className="ml-64 p-6 max-w-screen-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des Agents</h1>

        <Card className="shadow-md">
          <CardHeader><CardTitle>Ajouter un Agent</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="firstName" placeholder="Prénom" value={form.firstName} onChange={handleChange} />
              <Input name="lastName" placeholder="Nom" value={form.lastName} onChange={handleChange} />
              <Input name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} />
              <div>
                <label className="block mb-1 text-sm text-gray-700">Rôle</label>
                <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value="reception-officer">Officier d'accueil</option>
                  <option value="investigator">Enquêteur</option>
                </select>
              </div>
              <Input name="assignment" placeholder="Affectation" value={form.assignment} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter>
            {editingId == null ? (
              <Button
                variant="primary"
                onClick={handleSave}
                className="px-6 py-2 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >Ajouter</Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700 transition"
                >Mettre à jour</Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >Annuler</Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader><CardTitle>Liste des Agents</CardTitle></CardHeader>
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prénom</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nom</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Matricule</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rôle</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Affectation</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {agents.map(agent => (
                  <tr key={agent.id}>
                    <td className="px-4 py-2">{agent.firstName}</td>
                    <td className="px-4 py-2">{agent.lastName}</td>
                    <td className="px-4 py-2">{agent.matricule}</td>
                    <td className="px-4 py-2">{agent.role === 'reception-officer' ? 'Officier d\'accueil' : 'Enquêteur'}</td>
                    <td className="px-4 py-2">{agent.assignment}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(agent)}>Éditer</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(agent.id)}>Supprimer</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
