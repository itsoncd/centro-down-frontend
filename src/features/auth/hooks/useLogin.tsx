import { useMutation } from "@tanstack/react-query";
import type {
  HTTPLoginError,
  HTTPLoginResponse,
  LoginFormType,
} from "../types";
import { loginActions } from "../services/login.actions";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { getInitialRouteByRoles } from "@/utils";

export const useLogin = () => {
  const navigate = useNavigate();

  const setUser = useUserStore.getState().setUser;

  const loginMutation = useMutation<
    HTTPLoginResponse,
    AxiosError<HTTPLoginError>,
    LoginFormType
  >({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormType) => loginActions.login(data),
    onSuccess: (response) => {
      console.log("Succes!");
      toast.success("Inicio de Sesion con exito.");
      //?? Set data
      localStorage.setItem('roles', JSON.stringify(response.user.roles));
      setUser({
        name: response.user.name,
        email: response.user.email,
        roles: response.user.roles,
      });
      const initialRoute = getInitialRouteByRoles(response.user.roles);
      navigate(initialRoute);
    },
    onError: (error) => {
      console.log(error.response?.data.error);
      toast.error(error.response?.data.error);
    },
  });
  return { loginMutation };
};
