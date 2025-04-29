import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Commissioner, regions } from "@/utils/commissionerUtils";

interface CommissionerFormProps {
  onSubmit: (formData: Omit<Commissioner, "id">) => void;
  onClose: () => void;
  commissioner?: Commissioner;
}

const CommissionerForm = ({ 
  onSubmit, 
  onClose,
  commissioner 
}: CommissionerFormProps) => {
  const [formData, setFormData] = useState({
    firstName: commissioner?.firstName || "",
    lastName: commissioner?.lastName || "",
    email: commissioner?.email || "",
    matricule: commissioner?.matricule || "",
    region: commissioner?.region || "",
    phone: commissioner?.phone || "",
    status: commissioner?.status || "active" as "active" | "inactive"
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="matricule">Matricule</Label>
        <Input
          id="matricule"
          name="matricule"
          value={formData.matricule}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email professionnel</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="region">Région</Label>
        <Select 
          value={formData.region} 
          onValueChange={(value) => handleSelectChange("region", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une région" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
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
  <Button type="button" variant="outline" onClick={onClose}>
    Annuler
  </Button>
  <Button type="submit">
    {commissioner ? "Modifier" : "Ajouter"}
  </Button>
</DialogFooter>
    </form>
  );
};

export default CommissionerForm;
