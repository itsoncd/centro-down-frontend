import type { Role } from "@/types";

const initialRouteByRole: Record<Role, string> = {
  admin: "/admin",
  director: "/director",
  profesor: "/profesor",
  tutor: "/tutor",
};

export function getInitialRouteByRole(role: Role | string): string {
  const validRoles: Role[] = ["admin", "director", "profesor", "tutor"];

  if (!validRoles.includes(role as Role)) return "/";

  return initialRouteByRole[role as Role];
}