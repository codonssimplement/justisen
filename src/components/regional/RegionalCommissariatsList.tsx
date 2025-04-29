import React from "react";

export default function RegionalCommissariatsList() {
  // TODO: remplacer par une vraie liste dynamique
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Liste des commissariats</h2>
      <ul className="divide-y divide-gray-100">
        <li className="py-2 flex justify-between items-center">
          <span>Commissariat Central</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Dakar</span>
        </li>
        <li className="py-2 flex justify-between items-center">
          <span>Commissariat Plateau</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Guédiawaye</span>
        </li>
        <li className="py-2 flex justify-between items-center">
          <span>Commissariat Nord</span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Pikine</span>
        </li>
      </ul>
    </div>
  );
}
