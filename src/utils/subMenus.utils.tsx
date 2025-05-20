// src/utils/subMenus.utils.ts
import {
  Home,
  Calendar,
  Users,
  BookOpenCheck,
  Settings,
} from "lucide-react";
import type { JSX } from "react";

export interface SidebarLink {
  to: string;
  label: string;
  icon: JSX.Element;
}

type Role = "admin" | "director" | "profesor";

export const subMenusByRole: Record<Role, SidebarLink[]> = {
  admin: [
    { to: "/admin", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/admin/usuarios", label: "Usuarios", icon: <Users size={18} /> },
    { to: "/admin/configuracion", label: "Configuración", icon: <Settings size={18} /> },
  ],
  director: [
    { to: "/director", label: "Inicio", icon: <Home size={18} /> },
    { to: "/director/citas", label: "Citas", icon: <Calendar size={18} /> },
    { to: "/director/agenda", label: "Agenda", icon: <BookOpenCheck size={18} /> },
    { to: "/director/profesores", label: "Profesores", icon: <Users size={18} /> },
    { to: "/director/alumnos", label: "Alumnos", icon: <Users size={18} /> },
  ],
  profesor: [
    { to: "/profesor", label: "Inicio", icon: <Home size={18} /> },
    { to: "/profesor/citas", label: "Mis Citas", icon: <Calendar size={18} /> },
    { to: "/profesor/alumnos", label: "Alumnos", icon: <Users size={18} /> },
  ],
};
