// src/components/AppointmentModal.tsx
import { Dialog } from "@headlessui/react";
import { useAppointmentStore } from "@/store";
import AppointmentForm from "./AppointmentForm";

export const AppointmentModal = () => {
  const { isModalOpen, closeModal, selectedDate } = useAppointmentStore();

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-2xl shadow">
          <Dialog.Title className="text-lg font-bold">Agendar cita</Dialog.Title>
          <AppointmentForm
            onSubmit={(data) => {
              // Aquí pasas data con selectedDate + hora_inicio y hora_fin
            }}
            defaultValues={{
              fecha_cita: selectedDate || "",
              correo: "",
              nombre_alumno: "",
              nombre_tutor: "",
              hora_inicio: "",
              hora_fin: "",
            }}
            submitLabel="Guardar cita"
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
