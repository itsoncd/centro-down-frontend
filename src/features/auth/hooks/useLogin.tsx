import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AuthUser,
  HTTPLoginError,
  LoginFormType,
} from "../types";
import { loginActions } from "../services/login.actions";
import { AUTH_USER_QUERY_KEY } from "./useCurrentUser";
import type { AxiosError } from "axios";


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AuthUser,
    AxiosError<HTTPLoginError>,
    LoginFormType
  >({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormType) => loginActions.login(data),
    // The guard reads this cache, so seeding it avoids a second /auth/user call
    onSuccess: (user) => queryClient.setQueryData(AUTH_USER_QUERY_KEY, user),
  });
};
