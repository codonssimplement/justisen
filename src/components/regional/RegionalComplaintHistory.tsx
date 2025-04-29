import React from "react";

export default function RegionalComplaintHistory() {
  // TODO: remplacer par un vrai historique dynamique
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Historique des plaintes</h2>
      <ul className="divide-y divide-gray-100">
        <li className="py-2 flex justify-between items-center">
          <span>Plaintes résolues</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">12</span>
        </li>
        <li className="py-2 flex justify-between items-center">
          <span>Plaintes en cours</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">30</span>
        </li>
        <li className="py-2 flex justify-between items-center">
          <span>Plaintes non traitées</span>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">5</span>
        </li>
      </ul>
    </div>
  );
}
