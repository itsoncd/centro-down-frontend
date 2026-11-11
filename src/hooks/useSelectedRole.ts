import { useUserStore } from "@/store/user.store";
import { ROLE_MODELS } from "@/config/navigation";
import { resolveNavRole } from "@/utils/nav.utils";
import type { Role } from "@/types";

// The persisted user holds the role chosen for the session; the stored role
// covers pages rendered outside the session guard.
export const useSelectedRole = (): Role | null => {
  const userRole = useUserStore((state) => state.user?.roles[0]);
  const storedRole = localStorage.getItem("rol");

  return resolveNavRole(userRole, storedRole, ROLE_MODELS);
};
