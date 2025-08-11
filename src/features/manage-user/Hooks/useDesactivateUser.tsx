import { useMutation, useQueryClient } from "@tanstack/react-query";
import { desactivateUser } from "../services/user.actions";

export const useDesactivateUser = () => {
  const queryClient = useQueryClient();

  const desactivateUserMutation = useMutation({
    mutationFn: (id: number) => desactivateUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-users-query"] }),
  });

  return { desactivateUserMutation };
};
