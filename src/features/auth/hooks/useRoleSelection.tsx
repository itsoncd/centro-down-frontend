// useRoleSelection.ts
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { getInitialRouteByRole } from "@/utils";
import { useState } from "react";
import type { Role } from "@/types";
import type { HTTPLoginResponse } from "../types";

export const useRoleSelection = () => {
  const navigate = useNavigate();
  const setUser = useUserStore.getState().setUser;

  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<HTTPLoginResponse | null>(null);

  const handleRoleSelection = (response: HTTPLoginResponse) => {
    const roles = response.user.roles as Role[];

    if (roles.length > 1) {
      setAvailableRoles(roles);
      setPendingUserData(response);
      setShowRoleModal(true);
    } else {
      const mainRole = roles[0];
      localStorage.setItem("rol", mainRole);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        roles: [mainRole],
      });
      const initialRoute = getInitialRouteByRole(mainRole);
      navigate(initialRoute);
    }
  };

  const selectRole = (role: Role) => {
    if (!pendingUserData) return;
    localStorage.setItem("rol", role);
    setUser({
      id: pendingUserData.user.id,
      name: pendingUserData.user.name,
      email: pendingUserData.user.email,
      roles: [role],
    });
    const initialRoute = getInitialRouteByRole(role);
    cleanup();
    navigate(initialRoute);
  };

  const closeModal = () => cleanup();

  const cleanup = () => {
    setShowRoleModal(false);
    setAvailableRoles([]);
    setPendingUserData(null);
  };

  return {
    handleRoleSelection,
    showRoleModal,
    availableRoles,
    selectRole,
    closeModal,
  };
};
