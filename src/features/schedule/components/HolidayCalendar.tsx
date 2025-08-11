import { useGetHolidays } from "../hooks/useGetHoliday"; 
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "react-day-picker/locale";

function parseDateToLocalDay(dateString: string): Date {
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day);
}

export const HolidaysCalendar = () => {
  const { holidaysQuery } = useGetHolidays();

  if (holidaysQuery.isLoading) return <p>Cargando días inhábiles...</p>;
  if (holidaysQuery.isError) return <p>Error cargando días inhábiles</p>;
  if (!holidaysQuery.data?.data?.length) return <p>No hay días inhábiles</p>;

  const nonWorkingDays = holidaysQuery.data.data.map(h => parseDateToLocalDay(h.date));

  return (
    <div className="w-full">
      <DayPicker
        locale={es}
        classNames={{
          months: "flex justify-center md:justify-start w-full",
          month: "w-full grid grid-cols-1",
        }}
        mode="single"
        disabled={nonWorkingDays}
        modifiers={{ nonWorkingDays }}
        modifiersClassNames={{
          nonWorkingDays: "bg-red-500 text-white rounded-full",
        }}
      />
    </div>
  );
};
