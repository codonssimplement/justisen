// Types for commissioners
export interface Commissioner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  matricule: string;
  region: string;
  phone: string;
  status: "active" | "inactive";
}

// Liste initiale vide pour les commissaires
export const initialCommissioners: Commissioner[] = [];

// Mock data for regions
export const regions: string[] = [
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Diourbel",
  "Fatick",
  "Kaffrine",
  "Kaolack",
  "Kédougou",
  "Kolda",
  "Louga",
  "Matam",
  "Sédhiou",
  "Tambacounda",
  "Ziguinchor"
];
