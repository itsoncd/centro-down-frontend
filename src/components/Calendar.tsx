import { useAppointmentStore } from "@/store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parse } from "date-fns";
import type { AppointmentData } from "@/features/appointments/types";
import { modifiersClassNames } from "@/features/appointments/helpers";
import { getModifiers } from '../features/appointments/helpers/modifiers-calendar';

type Props = {
  appointments: AppointmentData[];
};

export const Calendar = ({ appointments }: Props) => {
  const { selectedDate, setSelectedDate, openModal } = useAppointmentStore();
  console.log(selectedDate);

  const selectedDateObj = selectedDate
    ? parse(selectedDate, "yyyy-MM-dd", new Date())
    : undefined;

    const modifiers = getModifiers(appointments);

  

  return (
    <div className="w-full">
      <DayPicker
        animate
        navLayout="around"
        classNames={{
          months: "flex justify-center md:justify-start w-full",
          month: "w-full grid grid-cols-1", // layout fluido
        }}
        mode="single"
        selected={selectedDateObj}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date.toISOString().split("T")[0]);
          }
        }}
        disabled={[...modifiers.nonWorkingDays, modifiers.weekends]}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
      <button
        onClick={openModal}
        disabled={!selectedDate}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        Agendar citaaa
      </button>
    </div>
  );
};
