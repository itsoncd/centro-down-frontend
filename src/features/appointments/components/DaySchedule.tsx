// src/components/DaySchedule.tsx
import { useAppointmentStore } from "@/store";
import { useMemo } from "react";
import { NoDateSelected } from "./NoDateSelected";
import type { AppointmentData } from "../types";
import { toast } from "react-toastify";

export const dummyAppointments: AppointmentData[] = [
  {
    id: 1,
    user_id: 101,
    fecha_cita: new Date("2025-08-22"),
    hora_inicio: "08:30",
    hora_fin: "09:30",
    correo: "alumno1@example.com",
    nombre_alumno: "Luis Hernández",
    nombre_tutor: "María García",
    created_at: new Date("2025-08-20T10:00:00Z"),
    updated_at: new Date("2025-08-20T10:00:00Z"),
  },
  {
    id: 2,
    user_id: 102,
    fecha_cita: new Date("2025-08-22"),
    hora_inicio: "10:00",
    hora_fin: "11:00",
    correo: "alumno2@example.com",
    nombre_alumno: "Ana López",
    nombre_tutor: "Carlos Pérez",
    created_at: new Date("2025-08-21T11:00:00Z"),
    updated_at: new Date("2025-08-21T11:00:00Z"),
  },
  {
    id: 3,
    user_id: 103,
    fecha_cita: new Date("2025-08-22"),
    hora_inicio: "15:00",
    hora_fin: "16:30",
    correo: "alumno3@example.com",
    nombre_alumno: "Jorge Martínez",
    nombre_tutor: "Lucía Rivas",
    created_at: new Date("2025-08-21T12:00:00Z"),
    updated_at: new Date("2025-08-21T12:00:00Z"),
  },
];

const generateHourSlots = (start: string, end: string) => {
  const slots = [];
  let [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute < endMinute)
  ) {
    const hourStr = `${String(startHour).padStart(2, "0")}:${String(
      startMinute
    ).padStart(2, "0")}`;
    slots.push(hourStr);
    startHour++;
  }

  return slots;
};

export const DaySchedule = () => {
  const { selectedDate, openModal, setSelectedHour, openHour, closeHour } =
    useAppointmentStore();

  const hourSlots = useMemo(() => generateHourSlots("00:00", "23:00"), []);

  if (!selectedDate) return <NoDateSelected />;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Horario para {selectedDate}
      </h3>
      <div className="grid gap-2">
        {hourSlots.map((hour) => {
          const isBlocked = hour < openHour || hour >= closeHour;

          const isPresent = dummyAppointments.find(
            (appointment) =>
              appointment.hora_inicio === hour &&
              appointment.fecha_cita.toDateString() ===
                new Date(selectedDate).toDateString()
          );

          return (
            <div
              key={hour}
              className={`p-2 rounded cursor-pointer text-sm border
        ${
          isBlocked
            ? "bg-red-100 text-red-600 border-red-300 cursor-not-allowed"
            : isPresent
            ? "bg-blue-100 text-blue-800 border-blue-300 cursor-not-allowed"
            : "bg-green-100 hover:bg-green-200 text-green-800"
        }
      `}
              onClick={() => {
                if (!isBlocked && !isPresent) {
                  setSelectedHour(hour);
                  openModal();
                }
                if (isPresent)
                  toast.warn("Ocupado.", {
                    toastId: "is-present",
                  });
              }}
            >
              {hour} - {parseInt(hour.split(":")[0]) + 1}:00
              {isPresent && <button className="px-6" onClick={ () => console.log(isPresent)}>Ver info.</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
