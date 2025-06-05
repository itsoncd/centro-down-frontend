import { useState } from "react";
import AppointmentUpdateModal from "./AppointmentUpdateModal";
import AppointmentDeleteModal from "./AppointmentDeleteModal";
import Button from "@/components/Button";
import { useAppointmentStore } from "@/store";

export const AppointmentDetailsForm = () => {
  const {
    selectedAppointment,
    setSelectedAppointment,
  } = useAppointmentStore();

  // const [currentAppointment, setCurrentAppointment] = useState<AppointmentData | null>(selectedAppointment);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // useEffect(() => {
  //   setCurrentAppointment(selectedAppointment);
  // }, [selectedAppointment]);

  if (!selectedAppointment) return null;

  const handleDeleteSuccess = () => {
    setSelectedAppointment(null); 
  };

  const {
    correo,
    nombre_alumno,
    nombre_tutor,
  } = selectedAppointment;

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);

  return (
    <>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Correo del tutor</p>
          <p className="text-base font-medium">{correo}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Nombre del alumno</p>
          <p className="text-base font-medium">{nombre_alumno}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Nombre del tutor</p>
          <p className="text-base font-medium">{nombre_tutor}</p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={openEdit}>
            Actualizar
          </Button>
          <Button type="button" variant="cancel" onClick={openDelete}>
            Eliminar
          </Button>
        </div>
      </div>

      <AppointmentUpdateModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        appointment={selectedAppointment}
        onUpdate={(updated) => {
          setSelectedAppointment(updated);
          closeEdit();
        }}
      />

      <AppointmentDeleteModal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        appointment={selectedAppointment}
        onDeleteSuccess={handleDeleteSuccess}  
      />
    </>
  );
};
