import type { Role } from "@/types";
import { ROLES } from "@/types";

const initialRouteByRole: Record<Role, string> = {
  admin: "/admin",
  director: "/director",
  profesor: "/profesor",
  tutor: "/tutor",
};

export function getInitialRouteByRole(role: Role | string): string {
  if (!ROLES.includes(role as Role)) return "/";

  return initialRouteByRole[role as Role];
}
