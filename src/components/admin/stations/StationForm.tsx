import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Station, StationType, Region } from "@/types";

interface StationFormProps {
  station?: Station | null;
  onSubmit: (formData: Omit<Station, "id">) => void;
  onCancel: () => void;
  regions: Region[];
  onAddStation: (formData: Omit<Station, "id">) => void;
}

const StationForm = ({ 
  station = null, 
  onSubmit, 
  onCancel,
  regions 
}: StationFormProps) => {
  const [formData, setFormData] = useState({
    name: station?.name || "",
    type: station?.type || "regional",
    region: station?.region || "",
    department: station?.department || "",
    arrondissement: station?.arrondissement || "",
    address: station?.address || "",
    phone: station?.phone || "",
    email: station?.email || "",
    status: station?.status || "active" as "active" | "inactive",
    createdAt: station?.createdAt || new Date(),
    updatedAt: station?.updatedAt || new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      createdAt: formData.createdAt instanceof Date ? formData.createdAt : new Date(formData.createdAt),
      updatedAt: formData.updatedAt instanceof Date ? formData.updatedAt : new Date(formData.updatedAt)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du commissariat</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regional">Régional</SelectItem>
              <SelectItem value="departmental">Départemental</SelectItem>
              <SelectItem value="arrondissement">Arrondissement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="region">Région</Label>
        <Select 
          value={formData.region} 
          onValueChange={(value) => handleSelectChange("region", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner la région" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Département */}
        { (formData.type === "departmental" || formData.type === "arrondissement") && (
          <div className="space-y-2">
            <Label htmlFor="department">Département</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
              disabled={!formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le département" />
              </SelectTrigger>
              <SelectContent>
                {regions
                  .find(r => r.id === formData.region)?.departements
                  .map(dep => (
                    <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {/* Arrondissement */}
        { formData.type === "arrondissement" && (
          <div className="space-y-2">
            <Label htmlFor="arrondissement">Arrondissement</Label>
            <Select
              value={formData.arrondissement}
              onValueChange={(value) => handleSelectChange("arrondissement", value)}
              disabled={!formData.department}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner l'arrondissement" />
              </SelectTrigger>
              <SelectContent>
                {regions
                  .find(r => r.id === formData.region)?.departements
                  .find(dep => dep.id === formData.department)?.arrondissements
                  .map(arr => (
                    <SelectItem key={arr.id} value={arr.id}>{arr.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select 
          value={formData.status} 
          onValueChange={(value: "active" | "inactive") => handleSelectChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {station ? "Modifier" : "Ajouter"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default StationForm;