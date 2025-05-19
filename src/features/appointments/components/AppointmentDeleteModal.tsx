import Button from "@/components/Button";
import type { AppointmentData } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  appointment: AppointmentData;
};

export default function AppointmentDeleteModal({ isOpen, onClose, onDelete, appointment }: Props) {
  if (!isOpen) return null;

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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="cancel" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
