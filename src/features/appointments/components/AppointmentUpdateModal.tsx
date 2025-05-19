import AppointmentForm from "./AppointmentForm";
import type { AppointmentData } from "../types";
import { useUpdateAppointment } from "../hooks/useUpdateAppointment";

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentData;
};

export default function AppointmentUpdateModal({
  isOpen,
  onClose,
  appointment,
}: AppointmentModalProps) {
  const { updateMutation } = useUpdateAppointment();

  if (!isOpen) return null;

  const onSubmit = (formData: any) => {
    const finalData = {
      ...formData,
      user_id: 2, // Si aún es estático
    };

    updateMutation.mutate(
      { id: appointment.id, body: finalData },
      {
        onSuccess: () => {
          onClose(); // cerrar modal
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Actualizar cita</h2>

        <AppointmentForm
          defaultValues={{
            correo: appointment.correo,
            fecha_cita: new Date(appointment.fecha_cita).toISOString().slice(0, 10),
            nombre_alumno: appointment.nombre_alumno,
            nombre_tutor: appointment.nombre_tutor,
          }}
          onSubmit={onSubmit}
          submitLabel="Actualizar"
        />
      </div>
    </div>
  );
}
