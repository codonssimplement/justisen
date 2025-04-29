// src/utils/mockData.ts
export const mockStations = [
  {
    id: "1",
    name: "Commissariat Central",
    address: "123 Rue de la Police",
    regionId: "1",
    chiefId: "1",
    type: "central",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Commissariat Divisionnaire",
    address: "456 Rue de la Division",
    regionId: "1",
    chiefId: "2",
    type: "division",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Commissariat de District",
    address: "789 Rue du District",
    regionId: "2",
    chiefId: null,
    type: "district",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockStats = {
  total: 3,
  byType: {
    central: 1,
    division: 1,
    district: 1,
    station: 0
  },
  byStatus: {
    active: 2,
    pending: 1,
    inactive: 0
  },
  byRegion: {
    "1": 2,
    "2": 1
  }
};