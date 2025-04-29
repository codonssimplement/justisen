// Update UserRole type
export type UserRole = 
  | 'admin'       // National Director
  | 'regional-admin'    // Regional Commissioner
  | 'station-admin'     // Station Commissioner
  | 'reception-officer' // Reception Officer
  | 'investigator'     // Investigator
  | 'officer';         // Police Officer

// Add StationType
export type StationType =
  | 'regional'      // Régional
  | 'departmental'  // Départemental
  | 'arrondissement' // Arrondissement;

// Update Station interface
export interface Station {
  arrondissement: string;
  department: string;
  id: string;
  name: string;
  type: StationType;
  region: string;
  address: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  chiefId?: string;
}

// Update User interface
export interface User {
  regionId: string;
  id: string;
  matricule: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  stationId?: string; // ID of the station the user is assigned to
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

// Update Region interface
export interface Region {
  id: string;
  name: string;
  stations: Station[];
}

// Add StationStats interface

// Add UserStats interface
export interface UserStats {
  total: number;
  byRole: Record<UserRole, number>;
  byStation: Record<string, number>;
  chiefs: number;
}