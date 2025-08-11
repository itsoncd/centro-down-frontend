// src/features/schedule/components/HolidayModal.tsx
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { usePostHoliday } from "../hooks/usePostHoliday";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  date: string | null;
};

export const HolidayModal = ({ isOpen, onClose, date }: Props) => {
  const { postHolidayMutation } = usePostHoliday();
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!date) return;
    setLoading(true);
    postHolidayMutation.mutate(
      { date },
      {
        onSuccess: () => {
          toast.success(`Día ${date} marcado como asueto.`);
          setLoading(false);
          onClose();
        },
        onError: (e: any) => {
          toast.error(`Error al marcar asueto: ${e.message}`);
          setLoading(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-bold mb-4">Agregar asueto</Dialog.Title>
          <p>¿Quieres agregar el día <strong>{date}</strong> como asueto?</p>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Confirmar"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
