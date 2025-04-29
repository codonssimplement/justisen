import { User, UserRole } from "@/types";

// Mock user data for demonstration purposes
// In a real application, this would be fetched from a backend service
export const MOCK_USERS: User[] = [
  {
    id: '1',
    matricule: 'CRPN00123',
    email: 'directeur@police-nationale.sn',
    firstName: 'Abdoulaye',
    lastName: 'Diallo',
    role: 'admin',
    status: "active",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
  {
    id: '2',
    matricule: 'CRPN001',
    email: 'commissaire.regional@police-nationale.sn',
    firstName: 'Malick',
    lastName: 'Faye',
    role: 'regional-admin',
    status: "active",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
  {
    id: '3',
    matricule: 'CSPN001',
    email: 'commissaire.station@police-nationale.sn',
    firstName: 'Cheikh',
    lastName: 'Mbacké',
    role: 'station-admin',
    status: "active",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
  {
    id: '4',
    matricule: 'ROPN001',
    email: 'officer@police-nationale.sn',
    firstName: 'Sophie',
    lastName: 'Ndiaye',
    role: 'reception-officer',
    status: "active",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
  {
    id: '5',
    matricule: 'INPN001',
    email: 'investigator@police-nationale.sn',
    firstName: 'Jean',
    lastName: 'Dominique Tall',
    role: 'investigator',
    status: "active",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
  {
    id: '6',
    matricule: 'INPN002',
    email: 'investigator2@police-nationale.sn',
    firstName: 'Marie',
    lastName: 'Durand',
    role: 'investigator',
    status: "inactive",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
  {
    id: '7',
    matricule: 'INPN003',
    email: 'investigator3@police-nationale.sn',
    firstName: 'Koffi',
    lastName: 'Yao',
    role: 'investigator',
    status: "active",
    createdAt: undefined,
    updatedAt: undefined,
    regionId: ""
  },
];

// Fonction pour stocker l'utilisateur connecté
export const saveUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Fonction pour récupérer l'utilisateur connecté
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    if (typeof user !== 'object' || user === null) {
      return null;
    }
    return user as User;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

// Compteur pour simuler le blocage après plusieurs tentatives
let failedAttempts = 0;
const MAX_FAILED_ATTEMPTS = 3;
let isBlocked = false;
let blockReleaseTime: number | null = null;

// Fonction pour vérifier si le compte est bloqué
const checkIfBlocked = (): boolean => {
  if (!isBlocked) return false;
  
  // Vérifier si la période de blocage est terminée (15 minutes)
  if (blockReleaseTime && Date.now() > blockReleaseTime) {
    isBlocked = false;
    blockReleaseTime = null;
    failedAttempts = 0;
    return false;
  }
  
  return true;
};

// Fonction pour se déconnecter
export const logout = async () => {
  localStorage.clear();
  // Redirection vers la page de login
  window.location.href = '/login';
};
// Fonction pour se connecter
export const login = (identifier: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Vérifier si le compte est bloqué
    if (checkIfBlocked()) {
      reject(new Error("access-blocked"));
      return;
    }

    // Dans une vraie application, vous feriez un appel API ici
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.matricule === identifier || u.email === identifier
      );
      
      if (user && password === '123456') { // Vérification du mot de passe simulée
        // Réinitialiser le compteur d'échecs
        failedAttempts = 0;
        
        // Stocker l'utilisateur dans le localStorage
        saveUser(user);
        
        // En cas de compte suspendu (simulé pour l'utilisateur avec ID 5)
        if (user.id === '5' && Math.random() > 0.7) {
          reject(new Error("account-suspended"));
          return;
        }
        
        resolve(user);
      } else {
        // Incrémenter le compteur d'échecs
        failedAttempts++;
        
        // Bloquer le compte après MAX_FAILED_ATTEMPTS tentatives
        if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
          isBlocked = true;
          // Bloquer pendant 15 minutes
          blockReleaseTime = Date.now() + 15 * 60 * 1000;
          reject(new Error("access-blocked"));
        } else {
          reject(new Error("Invalid credentials"));
        }
      }
    }, 800); // Simuler un délai d'API
  });
};

// Fonction pour vérifier si l'utilisateur a un rôle spécifique
export const hasRole = (role: UserRole): boolean => {
  const currentUser = getCurrentUser();
  return currentUser !== null && currentUser.role === role;
};

// Fonction pour vérifier si l'utilisateur peut accéder à une région
export const canAccessRegion = (regionId: string): boolean => {
  const currentUser = getCurrentUser();
  return currentUser !== null && 
    (currentUser.role === 'admin' || 
     (currentUser.role === 'regional-admin' && currentUser.regionId === regionId));
};

// Fonction pour vérifier si l'utilisateur peut accéder à une station
export const canAccessStation = (stationId: string): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  // Vérifier si l'utilisateur a le rôle d'admin
  if (currentUser.role === 'admin') return true;

  // Pour un commissaire régional, vérifier s'il a une région
  if (currentUser.role === 'regional-admin' && currentUser.regionId) return true;

  // Pour un commissaire de poste, vérifier si c'est sa station
  return currentUser.stationId === stationId;
};