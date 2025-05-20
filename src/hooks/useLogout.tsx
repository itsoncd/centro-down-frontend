import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { toast } from "react-toastify";

export const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser); // Asegúrate de tener esta función

  const logout = () => {
    localStorage.removeItem("roles");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");

    clearUser();

    navigate("/");

    toast.info("Sesión cerrada.");
  };

  return { logout };
};
