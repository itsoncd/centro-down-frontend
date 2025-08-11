import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUser } from "../services/user.actions";

export const useActivateUser = () => {
  const queryClient = useQueryClient();

  const activateUserMutation = useMutation({
    mutationFn: (id: number) => activateUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-users-query"] }),
  });

  return { activateUserMutation };
};
