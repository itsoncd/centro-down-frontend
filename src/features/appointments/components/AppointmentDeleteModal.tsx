import Button from "@/components/Button";
import type { AppointmentData } from "../types";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentData;
  onDeleteSuccess: () => void; 
};

export default function AppointmentDeleteModal({ isOpen, onClose, appointment, onDeleteSuccess }: Props) {
  const { deleteMutation } = useDeleteAppointment();

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteMutation.mutate(appointment.id, {
      onSuccess: () => {
        onDeleteSuccess();  
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Eliminar esta cita</h2>

        <div className="mb-4 text-sm text-gray-600">
          <p><strong>Tutor:</strong> {appointment.nombre_tutor}</p>
          <p><strong>Alumno:</strong> {appointment.nombre_alumno}</p>
          <p><strong>Fecha:</strong> {new Date(appointment.fecha_cita).toLocaleDateString("es-MX", { timeZone: "UTC" })}</p>
        </div>

        <p className="mb-4 text-sm text-red-500">¿Estás seguro de eliminar la cita?</p>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="cancel" onClick={handleDelete}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
}
