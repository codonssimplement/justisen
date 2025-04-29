import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

interface Commissariat { id: number; nom: string; chef: string; departement: string; }

const COMMISSARIAT_MOCKS: Commissariat[] = [
  { id: 1, nom: "Commissariat Central", chef: "Capitaine Akouété", departement: "Central" },
  { id: 2, nom: "Commissariat Plateau", chef: "Lieutenant Yao", departement: "Plateau" },
  { id: 3, nom: "Commissariat Nord", chef: "Commandant Tchalla", departement: "Nord" },
  { id: 4, nom: "Commissariat Sud", chef: "Capitaine Koffi", departement: "Sud" },
];

function Modal({ open, onClose, title, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-blue-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-blue-600 text-xl font-bold">×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function ManageStationsPage() {
  // State CRUD
  const [commissariats, setCommissariats] = useState<Commissariat[]>(() => {
    const data = localStorage.getItem("commissariats");
    return data ? JSON.parse(data) : COMMISSARIAT_MOCKS;
  });

  // Gestion ouverture modale
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | "add" | null>(null);
  const [selected, setSelected] = useState<Commissariat | null>(null);
  const [form, setForm] = useState<{ nom: string; chef: string; departement: string }>({ nom: "", chef: "", departement: "" });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const openModal = (type: "view" | "edit" | "delete", commissariat: Commissariat) => {
    setModalType(type);
    setSelected(commissariat);
    setForm({ nom: commissariat.nom, chef: commissariat.chef, departement: commissariat.departement });
    setError("");
    setSuccess("");
  };
  const openAddModal = () => {
    setModalType("add");
    setSelected(null);
    setForm({ nom: "", chef: "", departement: "" });
    setError("");
    setSuccess("");
  };
  const closeModal = () => {
    setModalType(null);
    setSelected(null);
    setForm({ nom: "", chef: "", departement: "" });
    setError("");
    setSuccess("");
  };

  // CREATE
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.chef.trim() || !form.departement.trim()) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    const newCommissariat: Commissariat = {
      id: Math.max(0, ...commissariats.map(c => c.id)) + 1,
      ...form,
    };
    setCommissariats([...commissariats, newCommissariat]);
    setSuccess("Commissariat ajouté avec succès.");
    setTimeout(closeModal, 900);
  };

  // UPDATE
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.chef.trim() || !form.departement.trim()) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    setCommissariats(commissariats.map(c => c.id === selected?.id ? { ...c, ...form } : c));
    setSuccess("Commissariat modifié avec succès.");
    setTimeout(closeModal, 900);
  };

  // DELETE
  const handleDelete = () => {
    if (!selected) return;
    setCommissariats(commissariats.filter(c => c.id !== selected.id));
    setSuccess("Commissariat supprimé.");
    setTimeout(closeModal, 900);
  };

  // Gestion du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // Mock données pour plaintes et enquêtes
  const complaintsData = [
    { station: 'Central', count: 12 },
    { station: 'Plateau', count: 9 },
    { station: 'Nord', count: 7 },
    { station: 'Sud', count: 5 },
    { station: 'Est', count: 6 },
    { station: 'Ouest', count: 3 },
  ];
  const investigationsData = [
    { station: 'Central', ongoing: 4 },
    { station: 'Plateau', ongoing: 3 },
    { station: 'Nord', ongoing: 2 },
    { station: 'Sud', ongoing: 1 },
  ];
  const closedComplaints = [
    { id: 101, title: 'Vol à l’arraché', station: 'Central', openedAt: '2025-03-15', closedAt: '2025-04-20', description: 'Victime a signalé un vol à l’arraché près du marché central.', resolvedBy: 'Capitaine Akouété', team: ['Agent Diallo', 'Agent Koné'], evidences: ['Vidéo de surveillance', 'Déclaration témoin'] },
    { id: 102, title: 'Atteinte à la personne', station: 'Plateau', openedAt: '2025-02-10', closedAt: '2025-04-18', description: 'Plainte pour coups et blessures suite à une altercation.', resolvedBy: 'Lieutenant Yao', team: ['Officier Diallo'], evidences: ['Rapport médical', 'Photos blessures'] },
    { id: 103, title: 'Détérioration de biens', station: 'Nord', openedAt: '2025-01-20', closedAt: '2025-04-15', description: 'Vandalisme sur propriété privée, vitres brisées.', resolvedBy: 'Commandant Tchalla', team: ['Surveillant Koffi'], evidences: ['Photos dommages', 'Témoignage du propriétaire'] },
  ];
  const barData = {
    labels: complaintsData.map(d => d.station),
    datasets: [{ label: 'Plaintes clôturées', data: complaintsData.map(d => d.count), backgroundColor: '#2563eb' }],
  };
  const doughnutData = {
    labels: investigationsData.map(d => d.station),
    datasets: [{ data: investigationsData.map(d => d.ongoing), backgroundColor: ['#2563eb', '#22c55e', '#a21caf', '#f59e42'], borderWidth: 1 }],
  };

  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<typeof closedComplaints[number] | null>(null);
  const openComplaintModal = (c: typeof closedComplaints[number]) => { setSelectedComplaint(c); setComplaintModalOpen(true); };
  const closeComplaintModal = () => { setSelectedComplaint(null); setComplaintModalOpen(false); };

  return (
    <div className="ml-64 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      <h1 className="col-span-full text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-6 border-b-2 border-blue-200 pb-4">Gestion des plaintes</h1>

      {/* 1. Statistiques plaintes */}
      <section className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 col-span-full md:col-span-2">
        <h2 className="text-xl font-semibold mb-2">Plaintes par commissariat</h2>
        <div className="flex-1">
          <Bar data={barData} className="h-60" />
        </div>
      </section>

      {/* 2. Suivi enquêtes */}
      <section className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Suivi global des enquêtes</h2>
        <div className="flex-1 flex items-center justify-center">
          <Doughnut data={doughnutData} className="h-60 w-60" />
        </div>
      </section>

      {/* 3. Détails des plaintes clôturées */}
      <section className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-auto col-span-full">
        <h2 className="text-xl font-semibold mb-2">Détails des plaintes clôturées</h2>
        <table className="min-w-full text-left divide-y divide-gray-200 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Commissariat</th>
              <th className="px-4 py-2">Date clôture</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {closedComplaints.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{c.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{c.title}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{c.station}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{c.closedAt}</td>
                <td className="px-4 py-2"><button onClick={() => openComplaintModal(c)} className="text-blue-600 hover:underline">Détails</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modale détails plainte */}
      <Modal open={complaintModalOpen} onClose={closeComplaintModal} title="Détails de la plainte">
        {selectedComplaint && (
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">ID:</span> {selectedComplaint.id}</p>
            <p><span className="font-semibold">Titre:</span> {selectedComplaint.title}</p>
            <p><span className="font-semibold">Ouverture:</span> {selectedComplaint.openedAt}</p>
            <p><span className="font-semibold">Clôture:</span> {selectedComplaint.closedAt}</p>
            <p><span className="font-semibold">Station:</span> {selectedComplaint.station}</p>
            <p><span className="font-semibold">Résolu par:</span> {selectedComplaint.resolvedBy}</p>
            <p><span className="font-semibold">Équipe mobilisée:</span> {selectedComplaint.team.join(', ')}</p>
            <p><span className="font-semibold">Description:</span> {selectedComplaint.description}</p>
            <div>
              <span className="font-semibold">Preuves:</span>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                {selectedComplaint.evidences.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
