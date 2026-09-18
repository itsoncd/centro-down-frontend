// useRoleSelection.ts
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { getInitialRouteByRole } from "@/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { ROLES } from "@/types";
import type { Role } from "@/types";
import type { AuthUser } from "../types";

export const useRoleSelection = () => {
  const navigate = useNavigate();
  const setUser = useUserStore.getState().setUser;

  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<AuthUser | null>(null);

  const applyRole = (user: AuthUser, role: Role) => {
    localStorage.setItem("rol", role);
    setUser({
      id: String(user.id),
      name: user.name,
      email: user.email,
      roles: [role],
    });
    navigate(getInitialRouteByRole(role));
  };

  const cleanup = () => {
    setShowRoleModal(false);
    setAvailableRoles([]);
    setPendingUserData(null);
  };

  const handleRoleSelection = (user: AuthUser) => {
    const roles = user.roles.filter((role): role is Role =>
      ROLES.includes(role as Role)
    );

    if (roles.length === 0) {
      toast.error("El usuario no tiene roles asignados.");
      return;
    }

    if (roles.length > 1) {
      setAvailableRoles(roles);
      setPendingUserData(user);
      setShowRoleModal(true);
      return;
    }

    applyRole(user, roles[0]);
  };

  const selectRole = (role: Role) => {
    if (!pendingUserData) return;
    const user = pendingUserData;
    cleanup();
    applyRole(user, role);
  };

  const closeModal = () => cleanup();

  return {
    handleRoleSelection,
    showRoleModal,
    availableRoles,
    selectRole,
    closeModal,
  };
};
