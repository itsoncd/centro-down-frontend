import { Outlet } from "react-router-dom";
import { Navbar, type NavGroup } from "@/components/Navbar";
import FooterDev from "@/components/FooterDev";
import type { Role } from "@/types";

const roleNavGroups: Record<Role, NavGroup[]> = {
  admin: [
    {
      label: "Inicio",
      items: [{ label: "Dashboard", to: "/admin" }],
    },
    {
      label: "Usuarios",
      items: [{ label: "Usuarios", to: "/admin/usuarios" }],
    },
    {
      label: "Configuración",
      items: [{ label: "Configuración", to: "/admin/configuracion" }],
    },
  ],
  director: [
    {
      label: "Inicio",
      items: [{ label: "Inicio", to: "/director" }],
    },
    {
      label: "Gestión",
      items: [
        { label: "Citas", to: "/director/citas" },
        { label: "Agenda", to: "/director/agenda" },
      ],
    },
    {
      label: "Usuarios",
      items: [
        { label: "Administrar Usuarios", to: "/director/administrar-usuarios" },
        { label: "Profesores", to: "/director/profesores" },
        { label: "Alumnos", to: "/director/alumnos" },
      ],
    },
  ],
  profesor: [
    {
      label: "Inicio",
      items: [{ label: "Inicio", to: "/profesor" }],
    },
    {
      label: "Citas",
      items: [{ label: "Mis Citas", to: "/profesor/citas" }],
    },
    {
      label: "Alumnos",
      items: [{ label: "Alumnos", to: "/profesor/alumnos" }],
    },
  ],
  tutor: [
    {
      label: "Inicio",
      items: [{ label: "Inicio", to: "/tutor" }],
    },
    {
      label: "Citas",
      items: [{ label: "Generar Cita", to: "/tutor/citas" }],
    },
  ],
};

export default function DefaultLayout() {
  const role = localStorage.getItem("rol") as Role | null;
  const navGroups: NavGroup[] = role && role in roleNavGroups ? roleNavGroups[role] : roleNavGroups["director"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navGroups={navGroups} />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterDev />
    </div>
  );
}
