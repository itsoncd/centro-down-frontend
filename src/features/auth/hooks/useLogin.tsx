import { useMutation } from "@tanstack/react-query";
import type {
  HTTPLoginError,
  HTTPLoginResponse,
  LoginFormType,
} from "../types";
import { loginActions } from "../services/login.actions";
import type { AxiosError } from "axios";


export const useLogin = () => {

  return useMutation<
    HTTPLoginResponse,
    AxiosError<HTTPLoginError>,
    LoginFormType
  >({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormType) => loginActions.login(data),
  });
};
