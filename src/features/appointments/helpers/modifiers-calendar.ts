import { parseISO } from "date-fns";
import type { AppointmentData } from "../types";

export const modifiersClassNames = {
    nonWorkingDays: "bg-red-500 text-white",
    weekends: "bg-gray-300 text-gray-600",
    appointmentDays: "bg-green-300 text-white",
  };

const nonWorkingDays = [parseISO("2025-05-20"), parseISO("2025-05-25"),]

export const getModifiers = ( appointments: AppointmentData[] ) => {
  const appointmentDays = Array.from(
    new Set(
      appointments.map(
        (a) => parseISO(String(a.fecha_cita)).toISOString().split("T")[0]
      )
    )
  ).map((dateStr) => parseISO(dateStr));
  return {
    nonWorkingDays: nonWorkingDays,
    weekends: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
    appointmentDays: appointmentDays,
  }
}