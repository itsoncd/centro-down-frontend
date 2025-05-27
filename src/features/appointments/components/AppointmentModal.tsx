// src/components/AppointmentModal.tsx
import { Dialog } from "@headlessui/react";
import { useAppointmentStore } from "@/store";
import AppointmentForm from "./AppointmentForm";
import { useCreateAppointment } from "../hooks/useCreateAppointment";

export const AppointmentModal = () => {
  const { isModalOpen, closeModal, selectedDate, selectedHour, } = useAppointmentStore();

  const { appointmentMutation } = useCreateAppointment();
  
    const handleCreate = (data: any) => {
      const finalData = {
        ...data,
        user_id: 6, // fijo por ahora
      };
      console.log(finalData);
      // appointmentMutation.mutate(finalData);
    };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-2xl shadow">
          <Dialog.Title className="text-lg font-bold">Agendar cita</Dialog.Title>
          <AppointmentForm
            onSubmit={handleCreate}
            defaultValues={{
              fecha_cita: selectedDate || "",
              correo: "",
              nombre_alumno: "",
              nombre_tutor: "",
              hora_inicio: selectedHour || "",
              hora_fin: selectedHour
                ? `${String(parseInt(selectedHour.split(":")[0]) + 1).padStart(2, "0")}:00`
                : "",
            }}
            submitLabel="Guardar cita"
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
