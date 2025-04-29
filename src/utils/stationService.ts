// src/utils/stationService.ts
import { Station, StationStats, StationType, StationStatus } from "@/types/station";

export const stationService = {
  getAll: async (): Promise<Station[]> => {
    // Ici, vous devrez implémenter l'appel API réel
    return fetch('/api/stations')
      .then(response => response.json())
      .then(data => data.stations);
  },

  getByRegion: async (regionId: string): Promise<Station[]> => {
    return fetch(`/api/stations/region/${regionId}`)
      .then(response => response.json())
      .then(data => data.stations);
  },

  create: async (station: Omit<Station, 'id'>): Promise<Station> => {
    return fetch('/api/stations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(station)
    })
      .then(response => response.json())
      .then(data => data.station);
  },

  update: async (station: Station): Promise<Station> => {
    return fetch(`/api/stations/${station.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(station)
    })
      .then(response => response.json())
      .then(data => data.station);
  },

  delete: async (id: string): Promise<void> => {
    return fetch(`/api/stations/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete station');
        }
      });
  },

  getStats: async (): Promise<StationStats> => {
    return fetch('/api/stations/stats')
      .then(response => response.json())
      .then(data => data.stats);
  },

  assignChief: async (stationId: string, userId: string): Promise<void> => {
    return fetch(`/api/stations/${stationId}/chief`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign chief');
        }
      });
  },

  removeChief: async (stationId: string): Promise<void> => {
    return fetch(`/api/stations/${stationId}/chief`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to remove chief');
        }
      });
  }
};