import {
  Home,
  Calendar,
  Users,
  BookOpenCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LogoBlack } from "./LogoBlack";

const links = [
  { to: "/director", label: "Inicio", icon: <Home size={18} /> },
  { to: "/director/citas", label: "Citas", icon: <Calendar size={18} /> },
  {
    to: "/director/agenda",
    label: "Agenda",
    icon: <BookOpenCheck size={18} />,
  },
  {
    to: "/director/profesores",
    label: "Profesores",
    icon: <Users size={18} />,
  },
  { to: "/director/alumnos", label: "Alumnos", icon: <Users size={18} /> },
];

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarNavDirector = ({ isOpen, toggleSidebar }: Props) => {
  const { pathname } = useLocation();

  return (
    <aside
      className={`relative bg-white shadow h-full p-6 flex flex-col transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Botón para colapsar */}
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

      {/* Botón Cerrar sesión */}
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
