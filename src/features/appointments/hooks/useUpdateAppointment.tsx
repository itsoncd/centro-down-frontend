import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../services/appointment.action";
import type { AppointmentLike } from "../types";
import { toast } from "react-toastify";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AppointmentLike }) =>
      updateAppointment(id, body),
    onSuccess: () => {
      toast.success("Cita actualizada con éxito.");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: () => {
      toast.error("Error al actualizar la cita.");
    },
  });

  return { updateMutation };
};
