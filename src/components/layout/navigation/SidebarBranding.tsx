
import { Shield } from "lucide-react";

export const SidebarBranding = () => {
  return (
    <div className="px-3 py-4 flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-6">
        <div className="p-1 rounded-md ">
          <img 
            src="/logo_police (1).png" 
            alt="Police Nationale du Sénégal" 
            className="h-10 w-16 bg-white p-0.5" 
          />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg leading-none">Police Nationale</h2>
          <p className="text-xs text-white/70">Gestion centralisée des plaintes au Sénégal</p>
        </div>
      </div>
    </div>
  );
};
