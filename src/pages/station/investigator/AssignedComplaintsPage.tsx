import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/utils/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReceptionComplaint {
  id: string;
  victimName: string;
  crimeType: string;
  status: string;
  assignment?: string;
  createdAt?: string;
  location?: string;
  date?: string;
  description?: string;
  files?: any[];
}

export default function AssignedComplaintsPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [complaints, setComplaints] = useState<ReceptionComplaint[]>([]);
  // Stats
  const total = complaints.length;
  const closedCount = complaints.filter(c => c.status === 'Clôturée').length;
  const inProgressCount = total - closedCount;

  useEffect(() => {
    if (!user) return;
    const data = localStorage.getItem('receptionComplaints');
    // Mock défaut pour cet enquêteur
    const defaultAssigned: ReceptionComplaint[] = [
      { id: '1001', victimName: 'Alice Sarr', crimeType: 'Vol simple', status: 'En cours', assignment: `${user.firstName} ${user.lastName}`, createdAt: new Date().toISOString(), location: 'Dakar', date: new Date().toLocaleDateString(), description: 'Description de la plainte', files: [] },
      { id: '1002', victimName: 'Mamadou Diop', crimeType: 'Atteinte à la personne', status: 'En cours', assignment: `${user.firstName} ${user.lastName}`, createdAt: new Date().toISOString(), location: 'Thiès', date: new Date().toLocaleDateString(), description: 'Autre plainte example', files: [] }
    ];
    if (!data) {
      localStorage.setItem('receptionComplaints', JSON.stringify(defaultAssigned));
      setComplaints(defaultAssigned);
      return;
    }
    const all: ReceptionComplaint[] = JSON.parse(data);
    const mine = all.filter(c => c.assignment === `${user.firstName} ${user.lastName}`);
    if (mine.length === 0) {
      localStorage.setItem('receptionComplaints', JSON.stringify([...all, ...defaultAssigned]));
      setComplaints(defaultAssigned);
    } else {
      setComplaints(mine);
    }
  }, [user]);

  return (
    <DashboardLayout onLogout={() => {}}>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {complaints.length === 0 ? (
          <div className="text-center p-6 text-gray-600">Vous n'avez pas de nouvelles plaintes assignées.</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-police-navy">Plaintes Assignées ({complaints.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Statistiques graphiques */}
              <div className="mb-6">
                <p className="text-sm text-gray-700">Total: {total} — En cours: {inProgressCount} — Clôturées: {closedCount}</p>
                <Bar
                  data={{
                    labels: ['En cours', 'Clôturées'],
                    datasets: [{
                      label: 'Plaintes',
                      data: [inProgressCount, closedCount],
                      backgroundColor: ['#3b82f6', '#ef4444']
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: { display: true, text: 'Statut des plaintes' }
                    }
                  }}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-police-navy">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase">Numéro</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase">Victime</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase">Statut</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {complaints.map((c, idx) => (
                      <tr key={c.id} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                        <td className="px-4 py-3 text-sm text-gray-800">{c.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{c.victimName}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{c.crimeType}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{c.status}</td>
                        <td className="px-4 py-3 text-right">
                          <Button size="sm" className="bg-police-navy text-white hover:bg-opacity-90" onClick={() => navigate(`/station/investigator/${c.id}`)}>Consulter</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
