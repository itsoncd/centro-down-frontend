import { CalendarX } from "lucide-react";

export const NoDateSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
      <CalendarX size={64} className="mb-4 text-blue-500" />
      <p className="text-lg font-semibold">Ningún día seleccionado</p>
      <p className="text-sm">Por favor, selecciona una fecha en el calendario.</p>
    </div>
  );
};
