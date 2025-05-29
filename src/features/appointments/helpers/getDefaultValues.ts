import type { AppointmentFormData } from "../types";

export const getDefaultValues = (
  selectedDate: string | null,
  selectedHour: string | null,
): AppointmentFormData => {
  return {
    fecha_cita: selectedDate || "",
    correo: "",
    nombre_alumno: "",
    nombre_tutor: "",
    hora_inicio: selectedHour || "",
    hora_fin: selectedHour
      ? `${String(parseInt(selectedHour.split(":")[0]) + 1).padStart(2, "0")}:00`
      : "",
  };
};
