import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Type pour commissariat
interface Commissariat {
  id: number;
  nom: string;
  chef: string;
  departement: string;
}

const COMMISSARIAT_MOCKS: Commissariat[] = [
  { id: 1, nom: "Commissariat Central", chef: "Capitaine Akouété", departement: "Central" },
  { id: 2, nom: "Commissariat Plateau", chef: "Lieutenant Yao", departement: "Plateau" },
  { id: 3, nom: "Commissariat Nord", chef: "Commandant Tchalla", departement: "Nord" },
  { id: 4, nom: "Commissariat Sud", chef: "Capitaine Koffi", departement: "Sud" },
];

import React, { useState } from "react";

function Modal({ open, onClose, title, children }) {
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

export default function RegionalStationsPage() {
  // State CRUD
  const [commissariats, setCommissariats] = useState<Commissariat[]>(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("commissariats");
      if (data) return JSON.parse(data);
    }
    return COMMISSARIAT_MOCKS;
  });
  const [modalType, setModalType] = useState<null | "view" | "edit" | "delete" | "add">(null);
  const [selected, setSelected] = useState<Commissariat | null>(null);
  const [form, setForm] = useState<{ nom: string; chef: string; departement: string }>({ nom: "", chef: "", departement: "" });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Gestion ouverture modale
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

  // Persistance : sauvegarde à chaque changement
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("commissariats", JSON.stringify(commissariats));
    }
  }, [commissariats]);

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

  return (
    <div className="w-full px-2 md:px-8 py-8 space-y-8 md:pl-40">
      {/* Header sobre */}
      {/* Barre professionnelle pour le titre */}
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm px-4 py-6 flex items-center justify-center border-b-2 border-blue-50 mb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-wide uppercase text-center letter-spacing-wider">Liste des commissariats</h1>
      </div>
      {/* Bouton aligné à droite sous la barre */}
      <div className="w-full max-w-5xl mx-auto flex justify-end mb-8">
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-all shadow-sm" onClick={openAddModal}>
          <Plus className="w-5 h-5" />
          Ajouter un commissariat
        </Button>
      </div>
      {/* Card container autour du tableau */}
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-x-auto pb-2">
        <table className="min-w-full divide-y divide-gray-200 text-base">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-6 py-4 text-left text-base font-bold text-blue-900 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-4 text-left text-base font-bold text-blue-900 uppercase tracking-wider">Chef de poste</th>
              <th className="px-6 py-4 text-left text-base font-bold text-blue-900 uppercase tracking-wider">Département</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {commissariats.map((c) => (
              <tr key={c.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900 text-base md:text-lg">{c.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base md:text-lg">{c.chef}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base md:text-lg">{c.departement}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {/* Actions: voir, éditer, supprimer (CRUD) */}
                  <Button size="sm" variant="outline" className="mr-2" onClick={() => openModal("view", c)}>Voir</Button>
                  <Button size="sm" variant="secondary" className="mr-2" onClick={() => openModal("edit", c)}>Éditer</Button>
                  <Button size="sm" variant="destructive" onClick={() => openModal("delete", c)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Footer du tableau */}
        <div className="px-6 py-2 text-sm text-blue-800 bg-blue-50 rounded-b-xl border-t border-blue-100">
          Total : {commissariats.length} commissariats
        </div>
      </div>
      {/* TODO: Pagination, filtres, recherche, intégration API */}
      {/* Modale Voir */}
      <Modal open={modalType === "view"} onClose={closeModal} title="Détails du commissariat">
        {selected && (
          <div className="space-y-2">
            <div><span className="font-semibold">Nom :</span> {selected.nom}</div>
            <div><span className="font-semibold">Chef :</span> {selected.chef}</div>
            <div><span className="font-semibold">Département :</span> {selected.departement}</div>
          </div>
        )}
      </Modal>
      {/* Modale Éditer */}
      <Modal open={modalType === "edit"} onClose={closeModal} title="Modifier le commissariat">
        {selected && (
          <form className="space-y-3" onSubmit={handleEdit}>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Nom</label>
              <input name="nom" className="w-full border rounded px-3 py-2" value={form.nom} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Chef</label>
              <input name="chef" className="w-full border rounded px-3 py-2" value={form.chef} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Département</label>
              <input name="departement" className="w-full border rounded px-3 py-2" value={form.departement} onChange={handleChange} />
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
            <div className="flex justify-end mt-4">
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Enregistrer</button>
            </div>
          </form>
        )}
      </Modal>
      {/* Modale Supprimer */}
      <Modal open={modalType === "delete"} onClose={closeModal} title="Supprimer le commissariat ?">
        {selected && (
          <div>
            <p>Voulez-vous vraiment supprimer <span className="font-semibold text-blue-900">{selected.nom}</span> ?</p>
            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={closeModal}>Annuler</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700" onClick={handleDelete}>Supprimer</button>
            </div>
          </div>
        )}
      </Modal>
      {/* Modale Ajouter */}
      <Modal open={modalType === "add"} onClose={closeModal} title="Ajouter un commissariat">
        <form className="space-y-3" onSubmit={handleAdd}>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Nom</label>
            <input name="nom" className="w-full border rounded px-3 py-2" placeholder="Nom du commissariat" value={form.nom} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Chef</label>
            <input name="chef" className="w-full border rounded px-3 py-2" placeholder="Chef de poste" value={form.chef} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Département</label>
            <input name="departement" className="w-full border rounded px-3 py-2" placeholder="Département" value={form.departement} onChange={handleChange} />
          </div>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Ajouter</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
