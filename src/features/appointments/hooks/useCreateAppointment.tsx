import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AppointmentLike } from "../types"
import { createAppointment } from "../services/appointment.action"
import { toast } from "react-toastify";

export const useCreateAppointment = () => {

    const queryClient = useQueryClient();

    const appointmentMutation = useMutation({
        mutationKey: ['new-appointment'],
        mutationFn: (body: AppointmentLike) => createAppointment(body),
        onSuccess: () => {
            console.log('Cita registrada');
            toast.success('Cita registrada con exito!');
            queryClient.invalidateQueries({
          queryKey: ["appointments"],
      });
            return;
        },
        onError: (error) => {
            console.log('Error al registrar una cita - hook.');
            console.log(error);
            toast.error('Hubo un error al registrar la cita.');
            return;
        }
    });
  return { appointmentMutation }
}
