import type { Role } from "@/types";

type CommonResource = typeof import("@/locales/es/common.json");
type NavGroupKeys = CommonResource["nav"]["groups"];
type NavItemKeys = CommonResource["nav"]["items"];

export type NavGroupLabelKey = `nav.groups.${keyof NavGroupKeys & string}`;
export type NavItemLabelKey = `nav.items.${keyof NavItemKeys & string}`;

export interface NavItemView {
  href: string;
  labelKey: NavItemLabelKey;
}

export interface NavGroupEntry {
  kind: "group";
  id: string;
  labelKey: NavGroupLabelKey;
  items: NavItemView[];
  matchPrefixes: string[];
}

export interface NavLinkEntry {
  kind: "link";
  id: string;
  labelKey: NavItemLabelKey;
  href: string;
}

export type NavEntry = NavGroupEntry | NavLinkEntry;
export type NavModel = NavEntry[];

export const HOME_GROUP_ID = "inicio";
export const EVALUATIONS_GROUP_ID = "evaluaciones";

const EVALUATION_ITEMS: NavItemView[] = [
  {
    href: "/evaluaciones/aplicacion-de-evaluaciones",
    labelKey: "nav.items.aplicacionEvaluaciones",
  },
  {
    href: "/evaluaciones/aplicacion-de-evaluaciones/crear",
    labelKey: "nav.items.crearEvaluacion",
  },
  {
    href: "/evaluaciones/plantilla-de-evaluaciones",
    labelKey: "nav.items.plantillasEvaluacion",
  },
  {
    href: "/evaluaciones/plantilla-de-evaluaciones/crear",
    labelKey: "nav.items.crearPlantilla",
  },
];

const evaluationsGroup: NavGroupEntry = {
  kind: "group",
  id: EVALUATIONS_GROUP_ID,
  labelKey: "nav.groups.evaluaciones",
  items: EVALUATION_ITEMS,
  matchPrefixes: ["/evaluaciones"],
};

const homeEntry = (href: string, labelKey: NavItemLabelKey): NavGroupEntry => ({
  kind: "group",
  id: HOME_GROUP_ID,
  labelKey: "nav.groups.inicio",
  items: [{ href, labelKey }],
  matchPrefixes: [],
});

export const ROLE_MODELS: Record<Role, NavModel> = {
  admin: [
    homeEntry("/admin", "nav.items.dashboard"),
    evaluationsGroup,
    {
      kind: "group",
      id: "usuarios",
      labelKey: "nav.groups.usuarios",
      items: [{ href: "/admin/usuarios", labelKey: "nav.items.usuarios" }],
      matchPrefixes: [],
    },
    {
      kind: "group",
      id: "configuracion",
      labelKey: "nav.groups.configuracion",
      items: [{ href: "/admin/configuracion", labelKey: "nav.items.configuracion" }],
      matchPrefixes: [],
    },
  ],
  director: [
    homeEntry("/director", "nav.items.inicio"),
    evaluationsGroup,
    {
      kind: "group",
      id: "gestion",
      labelKey: "nav.groups.gestion",
      items: [
        { href: "/director/citas", labelKey: "nav.items.citas" },
        { href: "/director/agenda", labelKey: "nav.items.agenda" },
      ],
      matchPrefixes: [],
    },
    {
      kind: "group",
      id: "usuarios",
      labelKey: "nav.groups.usuarios",
      items: [
        { href: "/director/administrar-usuarios", labelKey: "nav.items.administrarUsuarios" },
        { href: "/director/profesores", labelKey: "nav.items.profesores" },
        { href: "/director/alumnos", labelKey: "nav.items.alumnos" },
      ],
      matchPrefixes: [],
    },
  ],
  profesor: [
    homeEntry("/profesor", "nav.items.inicio"),
    evaluationsGroup,
    {
      kind: "group",
      id: "citas",
      labelKey: "nav.groups.citas",
      items: [{ href: "/profesor/citas", labelKey: "nav.items.misCitas" }],
      matchPrefixes: [],
    },
    {
      kind: "group",
      id: "alumnos",
      labelKey: "nav.groups.alumnos",
      items: [{ href: "/profesor/alumnos", labelKey: "nav.items.alumnos" }],
      matchPrefixes: [],
    },
  ],
  tutor: [
    homeEntry("/tutor", "nav.items.inicio"),
    evaluationsGroup,
    {
      kind: "group",
      id: "citas",
      labelKey: "nav.groups.citas",
      items: [{ href: "/tutor/citas", labelKey: "nav.items.generarCita" }],
      matchPrefixes: [],
    },
  ],
};

export const MINIMAL_NAV_MODEL: NavModel = [
  { kind: "link", id: HOME_GROUP_ID, labelKey: "nav.items.inicio", href: "/" },
];

export const getRoleNav = (role: Role | null | undefined): NavModel =>
  role ? ROLE_MODELS[role] : MINIMAL_NAV_MODEL;
