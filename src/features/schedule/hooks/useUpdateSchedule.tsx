import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule } from "../services/schedule.service";

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  const updateScheduleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { start_time: string; end_time: string } }) =>
      updateSchedule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  return { updateScheduleMutation };
};