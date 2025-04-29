import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MOCK_USERS } from "@/utils/auth";

interface Complaint {
  id: number;
  title: string;
  assigned: boolean;
  assignment?: string;
  assignmentId?: string;
}

const defaultComplaints: Complaint[] = [
  { id: 1, title: 'Vol à l’arraché', assigned: false },
  { id: 2, title: 'Atteinte à la personne', assigned: true },
  { id: 3, title: 'Détérioration de biens', assigned: false },
];

// Liste des enquêteurs depuis MOCK_USERS
const investigators = MOCK_USERS.filter(u => u.role === 'investigator');

export default function StationAssignmentsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const data = localStorage.getItem('stationComplaints');
    return data ? JSON.parse(data) as Complaint[] : defaultComplaints;
  });
  // Selections stockées en string: id de l'enquêteur sélectionné
  const [selections, setSelections] = useState<Record<number, string>>({});
  // Pour saisie rapide matricule
  const [quickMatricules, setQuickMatricules] = useState<Record<number,string>>({});
  // IDs déjà assignés
  const assignedIds = complaints.filter(c => c.assignmentId).map(c => c.assignmentId as string);
  // Enquêteurs libres
  const availableInvestigators = investigators.filter(u => !assignedIds.includes(u.id));

  useEffect(() => {
    localStorage.setItem('stationComplaints', JSON.stringify(complaints));
  }, [complaints]);

  const handleAssign = (complaintId: number) => {
    // Recherche prioritaire par matricule rapide
    const mq = quickMatricules[complaintId];
    let agent = mq
      ? investigators.find(u => u.matricule === mq)
      : investigators.find(u => u.id === Number(selections[complaintId]));
    if (!agent) return alert('Enquêteur introuvable.');
    const names = `${agent.firstName} ${agent.lastName}`;
    setComplaints(prev => prev.map(c => c.id === complaintId
      ? { ...c, assigned: true, assignment: names, assignmentId: agent.id }
      : c));
    alert(`Assigné à : ${names}`);
    setSelections(prev => ({ ...prev, [complaintId]: '' }));
    setQuickMatricules(prev => ({ ...prev, [complaintId]: '' }));
  };

  return (
    <DashboardLayout onLogout={() => {}}>
      <div className="ml-64 p-6 max-w-screen-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-police-navy mb-6">Gestion des Affectations</h1>
        {/* Liste des enquêteurs disponibles */}
        <Card className="shadow mb-8">
          <CardHeader>
            <CardTitle>Enquêteurs Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {availableInvestigators.map(u => (
                <li key={u.id} className="text-police-navy">
                  {u.firstName} {u.lastName} ({u.matricule})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plaintes en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-police-navy">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Assignation</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {complaints.filter(c => !c.assigned).map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-police-navy">{c.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{c.title}</td>
                      <td className="px-6 py-4">
                        {/* Saisie rapide matricule */}
                        <input
                          type="text"
                          placeholder="Matricule"
                          className="border rounded px-2 py-1 mb-2 w-full"
                          value={quickMatricules[c.id] || ''}
                          onChange={e => setQuickMatricules(prev => ({ ...prev, [c.id]: e.target.value }))}
                        />
                        <Select
                          value={selections[c.id] || c.assignmentId || ''}
                          onValueChange={val => setSelections(prev => ({ ...prev, [c.id]: val }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choisir enquêteur" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableInvestigators.map(u => (
                              <SelectItem key={u.id} value={u.id}>
                                {u.firstName} {u.lastName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Button onClick={() => handleAssign(c.id)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                          {c.assigned ? 'Réaffecter' : 'Assigner'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
