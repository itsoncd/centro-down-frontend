import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/user.actions";
import type { CreateUserFormType } from "../types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (newUser: CreateUserFormType) => createUser(newUser),
    onSuccess: () => {
      // Refetch de la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["get-users-query"] });
    },
  });

  return { createUserMutation };
};
