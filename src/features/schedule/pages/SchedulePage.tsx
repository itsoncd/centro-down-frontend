// src/features/schedule/SchedulePage.tsx
import { useState } from "react";
import { useSchedule } from "../hooks/useSchedule"; 
import { LoaderCard } from "@/components/LoaderCard";
import { HolidayModal } from "../components/HolidayModal"; 
import { ScheduleForm } from "../components/ScheduleForm";
import { useGetHolidays } from "../hooks/useGetHoliday";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "react-day-picker/locale";
import { parseISO } from "date-fns";

export const SchedulePage = () => {
  const { scheduleQuery } = useSchedule();
  const { holidaysQuery } = useGetHolidays();

  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [selectedDateForHoliday, setSelectedDateForHoliday] = useState<string | null>(null);

  if (scheduleQuery.isLoading || holidaysQuery.isLoading) {
    return <LoaderCard message="Cargando datos..." />;
  }

  if (scheduleQuery.isError) return <p>Error al cargar horario.</p>;
  if (holidaysQuery.isError) return <p>Error al cargar días inhábiles.</p>;
  if (!scheduleQuery.data) return <p>No hay horario disponible.</p>;

  // Fechas inhábiles
  const nonWorkingDays = holidaysQuery.data?.data?.map((h) => parseISO(h.date)) || [];

  const modifiers = { nonWorkingDays };
  const modifiersClassNames = {
    nonWorkingDays: "bg-red-500 text-white rounded-full",
  };

  const handleDateSelect = (date?: Date) => {
    if (!date) return;
    const dateISO = date.toISOString().split("T")[0];
    setSelectedDateForHoliday(dateISO);
    setHolidayModalOpen(true);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
      {/* Calendario de días inhábiles */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Calendario de días inhábiles</h2>
        <DayPicker
          locale={es}
          classNames={{
            months: "flex justify-center md:justify-start w-full",
            month: "w-full grid grid-cols-1",
          }}
          mode="single"
          onSelect={handleDateSelect}
          disabled={nonWorkingDays}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>

      {/* Formulario de horario */}
      <div className="bg-white rounded-2xl shadow p-6 h-[500px] flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Configuración de horario</h2>
        <ScheduleForm
          scheduleId={scheduleQuery.data.id}
          initialStart={scheduleQuery.data.start_time}
          initialEnd={scheduleQuery.data.end_time}
        />
      </div>

      {/* Modal para agregar día inhábil */}
      <HolidayModal
        isOpen={holidayModalOpen}
        onClose={() => setHolidayModalOpen(false)}
        date={selectedDateForHoliday}
      />
    </section>
  );
};
