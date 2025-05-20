import {
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LogoBlack } from "./LogoBlack";
import { subMenusByRole, type SidebarLink } from "@/utils/subMenus.utils";

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarNav = ({ isOpen, toggleSidebar }: Props) => {
  const { pathname } = useLocation();

  // Leer el rol del localStorage
  const role = localStorage.getItem("rol") as keyof typeof subMenusByRole;

  // Fallback por si no hay rol
  const links: SidebarLink[] = subMenusByRole[role] || [];

  return (
    <aside
      className={`relative bg-white shadow h-full p-6 flex flex-col transition-[width] duration-300 ease-in-out ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 right-[-12px] bg-white border rounded-full shadow p-1 hover:bg-gray-100 transition"
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo */}
      <div
        className={`transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <LogoBlack />
      </div>

      {/* Links */}
      <nav className={`space-y-4 mt-6 ${!isOpen && "space-y-1"}`}>
        {links.map(({ to, label, icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center p-2 rounded-md transition ${
                isOpen ? "gap-2 justify-start" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{icon}</span>
              {isOpen && <span className="transition-all">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        className={`flex items-center gap-2 text-red-600 hover:underline mt-auto ${
          !isOpen ? "justify-center" : ""
        }`}
      >
        <LogOut size={18} />
        <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>
          Cerrar sesión
        </span>
      </button>
    </aside>
  );
};
