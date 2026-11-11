import type { NavEntry, NavGroupEntry, NavModel } from "@/config/navigation";
import type { Role } from "@/types";

export interface ActiveNavState {
  groupId: string | null;
  itemHref: string | null;
}

const isGroup = (entry: NavEntry): entry is NavGroupEntry => entry.kind === "group";

const matchesPathBoundary = (pathname: string, prefix: string): boolean =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

const isKnownRole = (
  value: string | null | undefined,
  models: Readonly<Partial<Record<Role, unknown>>>,
): value is Role =>
  !!value && Object.prototype.hasOwnProperty.call(models, value);

// A role is valid exactly when the application holds a navigation model for it.
export const resolveNavRole = (
  userRole: string | undefined,
  storedRole: string | null,
  models: Readonly<Partial<Record<Role, unknown>>>,
): Role | null => {
  if (isKnownRole(userRole, models)) return userRole;
  if (isKnownRole(storedRole, models)) return storedRole;
  return null;
};

export const normalizePath = (pathname: string): string => {
  if (pathname.length <= 1 || !pathname.endsWith("/")) return pathname;
  return pathname.replace(/\/+$/, "") || "/";
};

export const resolveActiveNav = (
  pathname: string,
  entries: NavModel,
): ActiveNavState => {
  const path = normalizePath(pathname);

  for (const entry of entries) {
    if (entry.kind === "link") {
      if (entry.href === path) return { groupId: null, itemHref: entry.href };
      continue;
    }

    const item = entry.items.find((candidate) => candidate.href === path);
    if (item) return { groupId: entry.id, itemHref: item.href };
  }

  let matchedGroup: { id: string; prefix: string } | null = null;
  for (const entry of entries) {
    if (entry.kind !== "group") continue;

    for (const prefix of entry.matchPrefixes) {
      if (!matchesPathBoundary(path, prefix)) continue;
      if (!matchedGroup || prefix.length > matchedGroup.prefix.length) {
        matchedGroup = { id: entry.id, prefix };
      }
    }
  }

  if (matchedGroup) return { groupId: matchedGroup.id, itemHref: null };

  if (path === "/") {
    // The first group holds the role's initial page (FR-1), so it is current on the root page.
    const initialGroup = entries.find(isGroup);
    return { groupId: initialGroup ? initialGroup.id : null, itemHref: null };
  }

  return { groupId: null, itemHref: null };
};
