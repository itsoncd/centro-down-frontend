import { Outlet } from "react-router-dom";
import { SidebarNavDirector } from "@/components/SidebarNavDirector"; // Ajusta según tu estructura

export default function DirectorLayout() {
  return (
    <div className="flex min-h-screen">
      <SidebarNavDirector />

      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
