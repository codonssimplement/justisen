// Toutes les régions, départements et arrondissements du Sénégal (extrait simplifié)
// Vous pouvez compléter cette liste selon vos besoins réels

export interface Arrondissement {
  id: string;
  name: string;
}

export interface Departement {
  id: string;
  name: string;
  arrondissements: Arrondissement[];
}

export interface Region {
  id: string;
  name: string;
  departements: Departement[];
}

export const REGIONS: Region[] = [
  {
    id: "01",
    name: "Dakar",
    departements: [
      {
        id: "0101",
        name: "Dakar",
        arrondissements: [
          { id: "010101", name: "Plateau" },
          { id: "010102", name: "Médina" },
          { id: "010103", name: "Parcelles Assainies" },
        ],
      },
      {
        id: "0102",
        name: "Guédiawaye",
        arrondissements: [
          { id: "010201", name: "Golf Sud" },
          { id: "010202", name: "Sam Notaire" },
        ],
      },
    ],
  },
  {
    id: "02",
    name: "Thiès",
    departements: [
      {
        id: "0201",
        name: "Thiès",
        arrondissements: [
          { id: "020101", name: "Thiès Nord" },
          { id: "020102", name: "Thiès Sud" },
        ],
      },
      {
        id: "0202",
        name: "Mbour",
        arrondissements: [
          { id: "020201", name: "Mbour Arrondissement" },
        ],
      },
    ],
  },
  // Ajoutez toutes les autres régions du Sénégal ici...
];
