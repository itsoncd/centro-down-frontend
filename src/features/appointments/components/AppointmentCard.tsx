import type { AppointmentData } from "../types";

interface Props {
    appointment: AppointmentData;
}

export const AppointmentCard = ({ appointment }: Props) => {
  return (
    <div className="bg-white rounded-xl border shadow p-4 space-y-2">
      <h3 className="text-lg font-semibold text-blue-800">{appointment.nombre_tutor}</h3>
      <p className="text-sm text-gray-600">{appointment.nombre_alumno}</p>
      {appointment && <p className="text-sm text-gray-500 italic">{appointment.correo}</p>}
    </div>
  );
};
