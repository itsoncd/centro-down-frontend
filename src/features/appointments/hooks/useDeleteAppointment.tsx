import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../services/appointment.action";
import { toast } from "react-toastify";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-appointment'],
    mutationFn: (id: number) => deleteAppointment(id),
    onSuccess: () => {
      toast.success("Cita eliminada con éxito");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: () => {
      toast.error("Hubo un error al eliminar la cita");
    },
  });

  return { deleteMutation: mutation };
};
