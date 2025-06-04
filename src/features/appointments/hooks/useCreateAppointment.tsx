import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AppointmentLike } from "../types";
import { createAppointment } from "../services/appointment.action";
import { toast } from "react-toastify";
import { useAppointmentStore } from "@/store";

interface UseCreateAppointmentOptions {
  onSucces?: () => void;
}
export const useCreateAppointment = ({
  onSucces,
}: UseCreateAppointmentOptions) => {
  const queryClient = useQueryClient();
  const { setSelectedAppointment, closeModal } = useAppointmentStore();

  const appointmentMutation = useMutation({
    mutationKey: ["new-appointment"],
    mutationFn: (body: AppointmentLike) => createAppointment(body),
    onSuccess: (response) => {
      console.log("Cita registrada");
      toast.success("Cita registrada con exito!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      if (onSucces) onSucces();
      //setSelectedAppointment(response.data);
      closeModal();
      return;
    },
    onError: (error) => {
      console.log("Error al registrar una cita - hook.");
      console.log(error);
      toast.error("Hubo un error al registrar la cita.");
      return;
    },
  });
  return { appointmentMutation };
};
