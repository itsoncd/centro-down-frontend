import { Outlet } from "react-router-dom";
import { SidebarNavDirector } from "@/components/SidebarNavDirector";

export default function DirectorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Barra lateral */}
      <SidebarNavDirector />
      
      {/* Contenido dinámico */}
      <main className="flex-1 p-6 ml-64 overflow-auto"> {/* ml-64 para el ancho del sidebar */}
        <div className="w-full">
          <Outlet /> {/* Aquí se inyectarán las páginas */}
        </div>
      </main>
    </div>
  );
}