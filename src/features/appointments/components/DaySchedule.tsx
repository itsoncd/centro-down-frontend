// src/components/DaySchedule.tsx
import { useAppointmentStore } from "@/store";
import { useMemo } from "react";

const generateHourSlots = (start: string, end: string) => {
  const slots = [];
  let [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
    const hourStr = `${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`;
    slots.push(hourStr);
    startHour++;
  }

  return slots;
};

export const DaySchedule = () => {
  const {
    selectedDate,
    openModal,
    setSelectedHour,
    openHour,
    closeHour,
  } = useAppointmentStore();

  const hourSlots = useMemo(() => generateHourSlots("00:00", "23:00"), []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Horario para {selectedDate}
      </h3>
      <div className="grid gap-2">
        {hourSlots.map((hour) => {
          const isBlocked =
            hour < openHour || hour >= closeHour;

          return (
            <div
              key={hour}
              className={`p-2 rounded cursor-pointer text-sm border
                ${isBlocked ? "bg-red-100 text-red-600 border-red-300 cursor-not-allowed" : "bg-green-100 hover:bg-green-200 text-green-800"}
              `}
              onClick={() => {
                if (!isBlocked) {
                  setSelectedHour(hour);
                  openModal();
                }
              }}
            >
              {hour} - {parseInt(hour.split(":")[0]) + 1}:00
            </div>
          );
        })}
      </div>
    </div>
  );
};
