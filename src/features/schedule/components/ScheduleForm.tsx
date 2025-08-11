// src/features/schedule/components/ScheduleForm.tsx
import { useState, useEffect } from "react";
import { useUpdateSchedule } from "../hooks/useUpdateSchedule";
import { toast } from "react-toastify";

type Props = {
  scheduleId: number;
  initialStart: string; // "09:00:00"
  initialEnd: string;   // "15:00:00"
};

const hoursOptions = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0") + ":00:00"
);

export const ScheduleForm = ({ scheduleId, initialStart, initialEnd }: Props) => {
  const [startTime, setStartTime] = useState(initialStart);
  const [endTime, setEndTime] = useState(initialEnd);
  const { updateScheduleMutation } = useUpdateSchedule();

  useEffect(() => {
    setStartTime(initialStart);
    setEndTime(initialEnd);
  }, [initialStart, initialEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startTime >= endTime) {
      toast.error("La hora de inicio debe ser menor que la hora de fin");
      return;
    }
    updateScheduleMutation.mutate(
      { id: scheduleId, data: { start_time: startTime, end_time: endTime } },
      {
        onSuccess: () => toast.success("Horario actualizado correctamente"),
        onError: (e: any) => toast.error(`Error al actualizar: ${e.message}`),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-sm">
      <label className="flex flex-col">
        Hora de inicio:
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 p-2 border rounded"
        >
          {hoursOptions.map((hour) => (
            <option key={hour} value={hour}>
              {hour.slice(0, 5)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col">
        Hora de fin:
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 p-2 border rounded"
        >
          {hoursOptions.map((hour) => (
            <option key={hour} value={hour}>
              {hour.slice(0, 5)}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={updateScheduleMutation.isPending}
        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {updateScheduleMutation.isPending ? "Actualizando..." : "Actualizar horario"}
      </button>
    </form>
  );
};
