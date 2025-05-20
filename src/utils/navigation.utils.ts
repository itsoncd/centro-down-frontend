// src/utils/navigation.utils.ts
import type { Role } from "@/utils/subMenus.utils";

const validRoles: Role[] = ["admin", "director", "profesor"];

const initialRouteByRole: Record<Role, string> = {
  admin: "/admin",
  director: "/director",
  profesor: "/profesor",
};

export function getInitialRouteByRoles(roles: string[]): string {
  const validUserRoles = roles.filter((role): role is Role =>
    validRoles.includes(role as Role)
  );

  if (validUserRoles.length === 0) return "/";

  return initialRouteByRole[validUserRoles[0]];
}
