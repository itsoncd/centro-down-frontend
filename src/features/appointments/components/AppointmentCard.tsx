import { useState } from "react";
import type { AppointmentData } from "../types";
import Button from "@/components/Button";
import AppointmentUpdateModal from "./AppointmentUpdateModal";
import AppointmentDeleteModal from "./AppointmentDeleteModal";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

interface Props {
  appointment: AppointmentData;
}

export const AppointmentCard = ({ appointment }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteMutation } = useDeleteAppointment();

  const handleDelete = () => {
    deleteMutation.mutate(appointment.id);
    setDeleteModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border shadow p-4 space-y-2">
      <h3 className="text-lg font-semibold text-blue-800">
        Tutor: {appointment.nombre_tutor}
      </h3>
      <p className="text-sm text-gray-600">
        Alumno: {appointment.nombre_alumno}
      </p>
      <p className="text-sm text-gray-600">
        Fecha: {new Date(appointment.fecha_cita).toLocaleDateString('es-MX', { timeZone: 'UTC' })}
      </p>
      {appointment.correo && (
        <p className="text-sm text-gray-500 italic">
          Correo: {appointment.correo}
        </p>
      )}

      <div className="flex gap-2 justify-end">
        <Button onClick={() => setModalOpen(true)} className="text-sm" variant="secondary">
          Actualizar
        </Button>
        <Button onClick={() => setDeleteModalOpen(true)} className="text-sm" variant="cancel">
          Eliminar
        </Button>
      </div>

      <AppointmentUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        appointment={appointment}
        onUpdate={() => {}} 
      />

      <AppointmentDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        appointment={appointment}
        onDeleteSuccess={handleDelete} 
      />
    </div>
  );
};
