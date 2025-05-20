import { Outlet } from "react-router-dom";
import { SidebarNav} from "@/components/SidebarNav";
import FooterDev from "@/components/FooterDev";
import { useState } from "react";

export default function DirectorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <>
    <div className="flex h-screen bg-gray-50">
      <SidebarNav isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Contenido dinámico */}
      <main className="flex-1 flex flex-col p-6 overflow-auto">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
    <FooterDev />
    </>
  );
}