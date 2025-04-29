import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const USER_ROLES: UserRole[] = [
  'admin',
  'regional-admin',
  'station-admin',
  'reception-officer',
  'investigator',
  'officer',
];

const initialUser: Omit<User, "id" | "createdAt" | "updatedAt" | "matricule" | "regionId" | "stationId"> = {
  firstName: "",
  lastName: "",
  email: "",
  role: "officer",
  status: "active",
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Load users from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      // Exemples d'utilisateurs par défaut
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
          status: 'blocked',
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
    }
  }, []);

  // CRUD operations
  const handleAddUser = (formData: Omit<User, "id" | "createdAt" | "updatedAt" | "matricule">) => {
    // Validation unicité email et matricule
    if (users.some(u => u.email === formData.email)) {
      toast({ title: "Erreur", description: "Cet email est déjà utilisé.", variant: "destructive" });
      return;
    }
    // Matricule généré ou saisi
    let matricule = formData.matricule?.trim() || `USR${Math.floor(Math.random() * 100000)}`;
    if (users.some(u => u.matricule === matricule)) {
      toast({ title: "Erreur", description: "Ce matricule est déjà utilisé.", variant: "destructive" });
      return;
    }
    const now = new Date();
    const newUser: User = {
      ...formData,
      id: String(Date.now()),
      matricule,
      createdAt: now,
      updatedAt: now,
      regionId: "",
      stationId: undefined,
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setShowAddDialog(false);
    toast({ title: "Utilisateur ajouté", description: `${formData.firstName} ${formData.lastName} a été ajouté.` });
  };

  const handleEditUser = (formData: Omit<User, "id" | "createdAt" | "updatedAt" | "matricule">) => {
    if (!editingUser) return;
    // Validation unicité email et matricule (hors utilisateur courant)
    if (users.some(u => u.email === formData.email && u.id !== editingUser.id)) {
      toast({ title: "Erreur", description: "Cet email est déjà utilisé par un autre utilisateur.", variant: "destructive" });
      return;
    }
    let matricule = formData.matricule?.trim() || editingUser.matricule;
    if (users.some(u => u.matricule === matricule && u.id !== editingUser.id)) {
      toast({ title: "Erreur", description: "Ce matricule est déjà utilisé par un autre utilisateur.", variant: "destructive" });
      return;
    }
    const updated = users.map(u =>
      u.id === editingUser.id
        ? {
            ...u,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            status: formData.status,
            matricule,
            updatedAt: new Date()
          }
        : u
    );
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setShowEditDialog(false);
    setEditingUser(null);
    toast({ title: "Utilisateur modifié", description: `${formData.firstName} ${formData.lastName} a été modifié.` });
  };


  const handleDeleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    toast({ title: "Utilisateur supprimé", description: `L'utilisateur a été supprimé.`, variant: "destructive" });
  };

  const handleToggleBlock = (user: User) => {
    const updated = users.map(u => u.id === user.id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    toast({
      title: user.status === "active" ? "Utilisateur bloqué" : "Utilisateur réactivé",
      description: `${user.firstName} ${user.lastName} est maintenant ${user.status === "active" ? "bloqué" : "actif"}.`,
      variant: user.status === "active" ? "destructive" : "default"
    });
  };

  // Filtered users
  const filteredUsers = users.filter(u =>
    u.firstName.toLowerCase().includes(search.toLowerCase()) ||
    u.lastName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  // Simple form for add/edit
  const UserForm = ({ initialData, onSubmit, onClose }: {
    initialData?: Omit<User, "id" | "createdAt" | "updatedAt">,
    onSubmit: (data: Omit<User, "id" | "createdAt" | "updatedAt">) => void,
    onClose: () => void
  }) => {
    const [form, setForm] = useState<Omit<User, "id" | "createdAt" | "updatedAt">>(initialData || initialUser);
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="space-y-4"
      >
        <div className="flex gap-2">
          <Input placeholder="Nom" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
          <Input placeholder="Prénom" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
        </div>
        <Input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          readOnly={!!initialData}
          className={initialData ? "bg-gray-100 cursor-not-allowed" : ""}
        />
        <div className="flex gap-2">
          <Select value={form.role || 'officer'} onValueChange={role => setForm(f => ({ ...f, role: role as UserRole }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {USER_ROLES.map(role => (
                <SelectItem key={role} value={role}>{role.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Matricule"
            value={form.matricule || ""}
            onChange={e => setForm(f => ({ ...f, matricule: e.target.value }))}
            readOnly={!initialData}
            className={!initialData ? "bg-gray-100 cursor-not-allowed" : ""}
          />
        </div>
        <div className="flex space-x-2 justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>Annuler</Button>
          <Button type="submit" className="font-semibold">{initialData ? "Modifier" : "Ajouter"}</Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-4 ml-72">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
        <Button variant="outline" onClick={() => setShowAddDialog(true)}>Nouveau utilisateur</Button>
      </div>
      <Input
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <div className="rounded-lg border bg-white shadow overflow-x-auto">
        <Table className="min-w-full text-sm">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-12"> </TableHead>
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
                <TableCell colSpan={9} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 opacity-60">
                    <span className="text-6xl">🧑‍💼</span>
                    <span className="text-lg font-medium">Aucun utilisateur trouvé</span>
                    <span className="text-sm">Ajoutez un utilisateur pour commencer la gestion de votre équipe.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
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
                    <Badge variant="secondary" className={
                      user.status === 'active' ? 'bg-emerald-500 text-white' :
                      user.status === 'blocked' ? 'bg-red-500 text-white' :
                      'bg-gray-400 text-white'
                    }>
                      {user.status === 'active' ? 'Actif' : user.status === 'blocked' ? 'Bloqué' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="border-blue-500 text-blue-700 hover:bg-blue-50" onClick={() => {
                        setEditingUser(user);
                        setShowEditDialog(true);
                      }}>Modifier</Button>
                      <Button variant="outline" size="sm" className="border-red-500 text-red-700 hover:bg-red-50" onClick={() => handleDeleteUser(user.id)}>Supprimer</Button>
                      <Button
                        variant={user.status === "active" ? "destructive" : "default"}
                        size="sm"
                        className={user.status === 'active' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}
                        onClick={() => handleToggleBlock(user)}
                      >
                        {user.status === "active" ? "Bloquer" : "Réactiver"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogHeader>
        
        </DialogHeader>
        <DialogContent className="sm:max-w-[425px]">
          <UserForm
            onSubmit={handleAddUser}
            onClose={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={open => {
        setShowEditDialog(open);
        if (!open) setEditingUser(null);
      }}>
        <DialogHeader>
        
        </DialogHeader>
        <DialogContent className="sm:max-w-[425px]">
          <UserForm
            initialData={editingUser ? {
              firstName: editingUser.firstName,
              lastName: editingUser.lastName,
              email: editingUser.email,
              role: editingUser.role,
              status: editingUser.status,
              matricule: editingUser.matricule
            } : undefined}
            onSubmit={handleEditUser}
            onClose={() => {
              setShowEditDialog(false);
              setEditingUser(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
