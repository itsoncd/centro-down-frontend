import { Home, Calendar, Users, BookOpenCheck, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/director", label: "Inicio", icon: <Home size={18} /> },
  { to: "/director/citas", label: "Citas", icon: <Calendar size={18} /> },
  { to: "/director/agenda", label: "Agenda", icon: <BookOpenCheck size={18} /> },
  { to: "/director/profesores", label: "Profesores", icon: <Users size={18} /> },
  { to: "/director/alumnos", label: "Alumnos", icon: <Users size={18} /> },
];

export const SidebarNavDirector = () => {
  const { pathname } = useLocation();

  return (
    <aside className="bg-white shadow h-screen p-6 w-60 flex flex-col justify-between">
      <nav className="space-y-4">
        {links.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 p-2 rounded-md transition ${
              pathname === to ? "bg-blue-100 text-blue-800 font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-2 text-red-600 mt-4 hover:underline">
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </aside>
  );
};
