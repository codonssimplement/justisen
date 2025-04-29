import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Modal pour afficher les détails des cartes
function Modal({ open, onClose, title, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function RegionalStatistics() {
  // Données fictives pour les graphiques
  const barData = {
    labels: ["Central", "Plateau", "Nord", "Sud", "Est", "Ouest"],
    datasets: [
      {
        label: "Plaintes",
        data: [12, 9, 7, 5, 6, 3],
        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#a21caf",
          "#f59e42",
          "#f43f5e",
          "#eab308"
        ],
        borderRadius: 8,
      },
    ],
  };
  const donutData = {
    labels: ["Résolues", "En cours", "Non traitées"],
    datasets: [
      {
        data: [12, 24, 6],
        backgroundColor: ["#22c55e", "#2563eb", "#f43f5e"],
        borderWidth: 1,
      },
    ],
  };

  const [modalType, setModalType] = useState<null|"complaints"|"stations"|"investigations">(null);
  const openModal = (type: "complaints"|"stations"|"investigations") => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="space-y-10">
      {/* Cards synthétiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center mx-auto w-11/12 max-w-4xl mt-4">
        <div onClick={() => openModal("complaints")} className="bg-blue-50 rounded-xl shadow p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
          <span className="text-lg font-semibold text-blue-900 mb-2">Plaintes ce mois</span>
          <span className="text-3xl font-bold text-blue-700">42</span>
          <span className="text-xs text-gray-500 mt-1">Dont 12 résolues</span>
        </div>
        <div onClick={() => openModal("stations")} className="bg-green-50 rounded-xl shadow p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
          <span className="text-lg font-semibold text-green-900 mb-2">Commissariats</span>
          <span className="text-3xl font-bold text-green-700">6</span>
          <span className="text-xs text-gray-500 mt-1">Sous votre responsabilité</span>
        </div>
        <div onClick={() => openModal("investigations")} className="bg-purple-50 rounded-xl shadow p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
          <span className="text-lg font-semibold text-purple-900 mb-2">Enquêtes en cours</span>
          <span className="text-3xl font-bold text-purple-700">15</span>
          <span className="text-xs text-gray-500 mt-1">Lecture seule</span>
        </div>
      </div>
      {/* Graphiques illustratifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Plaintes par commissariat</h3>
          <Bar data={barData} options={{
            plugins: { legend: { display: false } },
            responsive: true,
            scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { display: false } } }
          }} height={220} />
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Répartition des plaintes</h3>
          <Doughnut data={donutData} options={{
            plugins: { legend: { position: "bottom" as const } },
            cutout: "70%"
          }} height={220} />
        </div>
      </div>
      {modalType !== null && (
        <Modal
          open={modalType !== null}
          onClose={closeModal}
          title={
            modalType === "complaints" ? "Plaintes ce mois" :
            modalType === "stations" ? "Commissariats" :
            "Enquêtes en cours"
          }
        >
          <div className="space-y-2 text-center">
            {modalType === "complaints" && (
              <>
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-gray-500">Dont 12 résolues</div>
              </>
            )}
            {modalType === "stations" && (
              <>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-gray-500">Sous votre responsabilité</div>
              </>
            )}
            {modalType === "investigations" && (
              <>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-gray-500">Lecture seule</div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
