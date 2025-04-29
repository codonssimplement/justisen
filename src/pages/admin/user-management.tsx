import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types";

const USER_ROLES: UserRole[] = [
  'admin',
  'regional-admin',
  'station-admin',
  'reception-officer',
  'investigator',
  'officer',
];

const UserManagementPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  useEffect(() => {
    // Exemples d'utilisateurs par défaut (toujours injectés)
    const now = new Date();
    const defaultUsers: User[] = [
      {
        id: '1',
        firstName: 'Abdoulaye',
        lastName: 'Diallo',
        email: 'directeur@police-nationale.sn',
        role: 'admin',
        status: 'active',
        matricule: 'CRPN00123',
        regionId: '',
        stationId: undefined,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '2',
        firstName: 'Marie',
        lastName: 'Laurent',
        email: 'commissaire.regional@police-nationale.sn',
        role: 'regional-admin',
        status: 'active',
        matricule: 'CRPN001',
        regionId: '',
        stationId: undefined,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '3',
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'officier@police-nationale.sn',
        role: 'officer',
        status: 'inactive',
        matricule: 'PNO12345',
        regionId: '',
        stationId: undefined,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '4',
        firstName: 'Fatou',
        lastName: 'Sow',
        email: 'reception@police-nationale.sn',
        role: 'reception-officer',
        status: 'active',
        matricule: 'REC2024',
        regionId: '',
        stationId: undefined,
        createdAt: now,
        updatedAt: now,
      }
    ];
    setUsers(defaultUsers);
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }, []);

  const filteredUsers = users.filter(u =>
    (u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.matricule.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter && roleFilter !== 'all' ? u.role === roleFilter : true)
  );

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const updated = users.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    );
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    toast({ title: "Rôle modifié", description: "Le rôle de l'utilisateur a été mis à jour." });
  };

  return (
    <div className="ml-72 max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des accès</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtrer les utilisateurs</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-end flex-wrap">
          <Input
            placeholder="Rechercher par nom, email ou matricule..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              {USER_ROLES.map(role => (
                <SelectItem key={role} value={role}>{role.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs et gestion des rôles</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Matricule</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 opacity-60">
                      <span className="text-6xl">🔒</span>
                      <span className="text-lg font-medium">Aucun utilisateur trouvé</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-semibold">{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">{user.matricule}</Badge></TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={
                        user.role === 'admin' ? 'bg-blue-600 text-white' :
                        user.role === 'regional-admin' ? 'bg-green-600 text-white' :
                        user.role === 'station-admin' ? 'bg-cyan-600 text-white' :
                        user.role === 'reception-officer' ? 'bg-purple-600 text-white' :
                        user.role === 'investigator' ? 'bg-yellow-600 text-black' :
                        'bg-gray-400 text-white'
                      }>
                        {user.role.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="group relative inline-block">
                        <Badge variant="secondary" className={user.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}>
                          {user.status === 'active' ? 'Actif' : 'Bloqué'}
                        </Badge>
                        <span className="opacity-0 group-hover:opacity-100 pointer-events-none transition bg-black/80 text-white text-xs rounded px-2 py-1 absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap z-20">
                          Statut : {user.status === 'active' ? 'Ce compte est actif' : 'Ce compte est bloqué'}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {/* Modifier le rôle */}
                      <RoleEditDropdown user={user} onChange={role => handleRoleChange(user.id, role)} />
                      {/* Supprimer */}
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id, users, setUsers)}>
                        Supprimer
                      </Button>
                      {/* Voir */}
                      <Button variant="outline" size="sm" className="border-blue-500 text-blue-700 hover:bg-blue-50">Voir</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Composant inline pour modifier le rôle


function RoleEditDropdown({ user, onChange }: { user: User, onChange: (role: UserRole) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen(o => !o)}>
        Modifier le rôle
      </Button>
      {open && (
        <div className="absolute z-20 bg-white border rounded shadow mt-1 min-w-[140px]">
          {USER_ROLES.map(role => (
            <button
              key={role}
              className={`block w-full text-left px-3 py-1 hover:bg-blue-50 ${user.role === role ? 'font-bold text-blue-700' : ''}`}
              onClick={() => { onChange(role as UserRole); setOpen(false); }}
            >
              {role.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

// Fonction pour supprimer un utilisateur avec confirmation
function handleDeleteUser(userId: string, users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>) {
  if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    const newUsers = users.filter(u => u.id !== userId);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  }
}

export default UserManagementPage;
