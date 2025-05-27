import { useAppointmentStore } from "@/store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parse } from "date-fns";

export const Calendar = () => {
  const { selectedDate, setSelectedDate, openModal } = useAppointmentStore();
  console.log(selectedDate);

  const selectedDateObj = selectedDate
    ? parse(selectedDate, "yyyy-MM-dd", new Date())
    : undefined;

  return (
    <div className="w-full">
      <DayPicker
        mode="single"
        selected={selectedDateObj}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date.toISOString().split("T")[0]);
          }
        }}
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
