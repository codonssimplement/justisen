// src/hooks/useStations.ts
import { useState, useEffect } from "react";
import { mockStations } from "@/utils/mockData";
import { Station, StationStats } from "@/types/station";
import { User } from "@/types";
import { MOCK_USERS } from "@/utils/auth";

export interface UseStationsResult {
  stations: Station[];
  stats: StationStats;
  isLoading: boolean;
  error: Error | null;
  createStation: (station: Omit<Station, "id">) => Promise<Station>;
  updateStation: (station: Station) => Promise<Station>;
  deleteStation: (id: string) => Promise<void>;
  assignChief: (stationId: string, userId: string) => Promise<void>;
  removeChief: (stationId: string) => Promise<void>;
  users: User[];
  commissioners: User[];
}

export const useStations = (): UseStationsResult => {
  const [stations, setStations] = useState<Station[]>([]);
  const [stats, setStats] = useState<StationStats>({} as StationStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [commissioners, setCommissioners] = useState<User[]>([]);

  useEffect(() => {
    try {
      // Chargement des stations depuis localStorage si dispo
      const stored = localStorage.getItem('stations');
      if (stored) {
        setStations(JSON.parse(stored));
      } else {
        setStations([]);
      }
      setUsers(MOCK_USERS.filter(user => user.role === 'station-admin'));
      setCommissioners(MOCK_USERS.filter(user => user.role === 'commissioner'));
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }, []);

  // Calcul dynamique des stats à chaque changement de stations
  useEffect(() => {
    // 1. Total
    const total = stations.length;

    // 2. Par type
    const byType: Record<string, number> = {};
    stations.forEach(s => {
      byType[s.type] = (byType[s.type] || 0) + 1;
    });

    // 3. Par région
    const byRegion: Record<string, number> = {};
    stations.forEach(s => {
      const region = s.region || s.regionId;
      if (region) byRegion[region] = (byRegion[region] || 0) + 1;
    });

    setStats({ total, byType, byRegion });
  }, [stations]);

  const createStation = async (stationData: Omit<Station, "id">) => {
    try {
      const newStation = {
        ...stationData,
        id: String(Date.now()), // Un id unique basé sur le timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setStations(prev => {
        const updated = [...prev, newStation];
        localStorage.setItem('stations', JSON.stringify(updated));
        return updated;
      });
      return newStation;
    } catch (err) {
      throw err;
    }
  };

  const updateStation = async (stationData: Station) => {
    try {
      setStations(prev => {
        const updated = prev.map(station =>
          station.id === stationData.id ? stationData : station
        );
        localStorage.setItem('stations', JSON.stringify(updated));
        return updated;
      });
      return stationData;
    } catch (err) {
      throw err;
    }
  };

  const deleteStation = async (id: string) => {
    try {
      setStations(prev => {
        const updated = prev.filter(station => station.id !== id);
        localStorage.setItem('stations', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      throw err;
    }
  };

  const assignChief = async (stationId: string, userId: string) => {
    try {
      setStations(prev => {
        const updated = prev.map(station =>
          station.id === stationId
            ? { ...station, chiefId: userId }
            : station
        );
        localStorage.setItem('stations', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      throw err;
    }
  };

  const removeChief = async (stationId: string) => {
    try {
      setStations(prev => {
        const updated = prev.map(station =>
          station.id === stationId ? { ...station, chiefId: null } : station
        );
        localStorage.setItem('stations', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      throw err;
    }
  };

  return {
    stations,
    stats,
    isLoading,
    error,
    createStation,
    updateStation,
    deleteStation,
    assignChief,
    removeChief,
    users,
    commissioners
  };
};