import { User } from ".";

// src/types/station.ts
export interface Station {
  id: string;
  name: string;
  address: string;
  regionId: string;
  chiefId: string | null;
  type: StationType;
  status: StationStatus;
  createdAt: string;
  updatedAt: string;
  region?: Region;
  chief?: User;
}

export type StationType = 'central' | 'division' | 'district' | 'station';
export type StationStatus = 'active' | 'pending' | 'inactive';

export interface StationStats {
  total: number;
  byType: Record<StationType, number>;
  byStatus: Record<StationStatus, number>;
  byRegion: Record<string, number>;
}

// src/types/region.ts
export interface Region {
  id: string;
  name: string;
  code: string;
  stations: Station[];
  chiefId: string | null;
  createdAt: string;
  updatedAt: string;
  chief?: User;
}

export interface RegionStats {
  totalStations: number;
  activeStations: number;
  pendingStations: number;
  inactiveStations: number;
}