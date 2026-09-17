import { useQuery } from "@tanstack/react-query";
import { loginActions } from "../services/login.actions";

export const AUTH_USER_QUERY_KEY = ["auth", "user"] as const;

export const useCurrentUser = () => {
  const currentUserQuery = useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: loginActions.getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

  return { currentUserQuery };
};
