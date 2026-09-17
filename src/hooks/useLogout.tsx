import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginActions } from "@/features/auth/services/login.actions";
import { clearClientSession } from "@/lib/session";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await loginActions.logout();
    } catch {
      // The server session may already be gone; the client is cleared anyway.
    }

    clearClientSession();
    queryClient.clear();

    navigate("/");

    toast.info("Sesión cerrada.");
  };

  return { logout };
};
