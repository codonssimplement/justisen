import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import CommissionerManagement from "@/components/admin/commissioners/CommissionerManagement";
import CommissionerSupervision from "@/components/admin/commissioners/CommissionerSupervision";
import { Button } from "@/components/ui/button";
import { Commissioner } from "@/utils/commissionerUtils";
import CommissionerStats from "./CommissionerStats";

const CommissionerManagementPage = () => {
  const [commissioners, setCommissioners] = useState<Commissioner[]>([]);
  const [editingCommissioner, setEditingCommissioner] = useState<Commissioner | null>(null);
  const [selectedCommissioner, setSelectedCommissioner] = useState<Commissioner | null>(null);
  const { toast } = useToast();

  // Chargement initial depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem('commissioners');
    if (stored) setCommissioners(JSON.parse(stored));
  }, []);

  const handleAddCommissioner = (formData: Omit<Commissioner, "id">) => {
    const newCommissioner: Commissioner = {
      ...formData,
      id: String(Date.now())
    };
    setCommissioners(prev => {
      const updated = [...prev, newCommissioner];
      localStorage.setItem('commissioners', JSON.stringify(updated));
      return updated;
    });
    toast({
      title: "Commissaire ajouté",
      description: `${formData.firstName} ${formData.lastName} a été ajouté à la liste des commissaires régionaux.`,
    });
  };

  const handleEditCommissioner = (updated: Commissioner) => {
    const updatedCommissioners = commissioners.map(commissioner =>
      commissioner.id === updated.id 
        ? updated
        : commissioner
    );
    setCommissioners(updatedCommissioners);
    localStorage.setItem('commissioners', JSON.stringify(updatedCommissioners));
    setEditingCommissioner(null);
    toast({
      title: "Commissaire modifié",
      description: `Les informations de ${updated.firstName} ${updated.lastName} ont été mises à jour.`,
    });
  };

  const handleDeleteCommissioner = (id: string) => {
    setCommissioners(prev => {
      const updated = prev.filter(comm => comm.id !== id);
      localStorage.setItem('commissioners', JSON.stringify(updated));
      return updated;
    });
    toast({
      title: "Commissaire supprimé",
      description: `Le commissaire avec l'id ${id} a été retiré de la liste des commissaires.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4 ml-72">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Commissaires Régionaux</h1>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/admin/dashboard"}
        >
          Retour au tableau de bord
        </Button>
      </div>

      {/* Stats en haut */}
      <CommissionerStats commissioners={commissioners} />

      {/* Tableau de gestion en dessous */}
      <div className="space-y-4">
        <CommissionerManagement 
          commissioners={commissioners}
          onAddCommissioner={handleAddCommissioner}
          onEditCommissioner={handleEditCommissioner}
          onDeleteCommissioner={handleDeleteCommissioner}
          editingCommissioner={editingCommissioner}
          setEditingCommissioner={setEditingCommissioner}
        />
      </div>
    </div>
  );
};

export default CommissionerManagementPage;