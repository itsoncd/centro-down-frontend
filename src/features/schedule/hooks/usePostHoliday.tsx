import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postHoliday } from "../services/schedule.service";

export const usePostHoliday = () => {
  const queryClient = useQueryClient();

  const postHolidayMutation = useMutation({
    mutationFn: postHoliday,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holidays"] }); // para futura actualización
    },
  });

  return { postHolidayMutation };
};