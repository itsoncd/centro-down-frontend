import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/user.actions";
import type { UpdateUserFormType } from "../types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserFormType }) => updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-users-query"] }),
  });

  return { updateUserMutation };
};
