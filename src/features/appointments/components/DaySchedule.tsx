import { useAppointmentStore } from "@/store";
import { useMemo } from "react";
import { NoDateSelected } from "./NoDateSelected";
import type { AppointmentData } from "../types";
import { toast } from "react-toastify";
import { generateHourSlots } from "../helpers";
import { Info } from "lucide-react";
import dayjs from "dayjs";

interface Props {
  appointmentsData: AppointmentData[];
};

export const DaySchedule = ({ appointmentsData }: Props) => {
  const { selectedDate, openModal, setSelectedHour, openHour, closeHour, setSelectedAppointment } =
    useAppointmentStore();

  const hourSlots = useMemo(() => generateHourSlots("00:00", "23:00"), []);

  if (!selectedDate) return <NoDateSelected />;

  const appointments: AppointmentData[] = appointmentsData.map((item) => ({
    ...item,
    fecha_cita: new Date(item.fecha_cita),
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Horario para {selectedDate}
      </h3>
      <div className="grid gap-2">
        {hourSlots.map((hour) => {
          const isBlocked = hour < openHour || hour >= closeHour;

          const isPresent = appointments.find(
            (appointment) =>
              appointment.hora_inicio.startsWith(hour) &&
              dayjs(appointment.fecha_cita).isSame(dayjs(selectedDate), "day")
          );

          return (
            <div
              key={hour}
              className={`p-2 rounded cursor-pointer text-sm border flex items-center justify-between
        ${isBlocked
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
              {isPresent && (
                <button
                  className="ml-4 flex items-center gap-1 text-blue-700 hover:text-blue-900 text-xs underline transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(isPresent);
                    setSelectedAppointment(isPresent);
                  }}
                >
                  <Info className="w-4 h-4" />
                  <span>Ver info</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
