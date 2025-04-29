import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const mockComplaints = [
  { id: 1, title: 'Vol à l’arraché', assigned: true, closed: true },
  { id: 2, title: 'Atteinte à la personne', assigned: true, closed: false },
  { id: 3, title: 'Détérioration de biens', assigned: false, closed: false },
];
const notifications = [
  { id: 101, message: 'Plainte 1 clôturée par Agent Diallo' },
  { id: 102, message: 'Plainte 3 clôturée par Agent Koné' },
];

export default function StationDashboardPage() {
  const total = mockComplaints.length;
  const assigned = mockComplaints.filter(c => c.assigned).length;
  const closed = mockComplaints.filter(c => c.closed).length;
  const chartData = {
    labels: ['Total', 'Assignées', 'Clôturées'],
    datasets: [{ data: [total, assigned, closed], backgroundColor: ['#2563eb', '#22c55e', '#eab308'] }],
  };

  return (
    <DashboardLayout onLogout={() => {}}>
      <div className="ml-64 p-6 max-w-screen-xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-police-navy mb-8">Tableau de bord du Commissariat</h1>
        <Card className="shadow-lg mb-8">
          <CardHeader><CardTitle>Résumé rapide</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{label:'Total plaintes', value:total}, {label:'Plaintes assignées', value:assigned}, {label:'Plaintes clôturées', value:closed}].map((item) => (
                <div key={item.label} className="flex flex-col items-center p-4">
                  <p className="text-lg text-police-navy mb-2">{item.label}</p>
                  <p className="text-3xl font-semibold text-police-navy">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg mb-8">
          <CardHeader><CardTitle>Statistiques & Notifications</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4">
                <p className="text-lg text-police-navy mb-2">Statistiques</p>
                <div className="h-64"><Bar data={chartData} /></div>
              </div>
              <div className="p-4">
                <p className="text-lg text-police-navy mb-2">Notifications</p>
                <ul className="list-disc pl-5 space-y-2">{notifications.map(n=> <li key={n.id} className="text-gray-700">{n.message}</li>)}</ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader><CardTitle>Liste des plaintes</CardTitle></CardHeader>
          <CardContent>
            <table className="min-w-full text-left divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-police-navy">ID</th><th className="px-4 py-2 text-police-navy">Titre</th><th className="px-4 py-2 text-police-navy">Assignée</th><th className="px-4 py-2 text-police-navy">Clôturée</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{mockComplaints.map(c=> (<tr key={c.id}><td className="px-4 py-2">{c.id}</td><td className="px-4 py-2">{c.title}</td><td className="px-4 py-2">{c.assigned?'Oui':'Non'}</td><td className="px-4 py-2">{c.closed?'Oui':'Non'}</td></tr>))}</tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
