import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { InputField } from "@/components/InputField";
import type { AppointmentFormData } from "../types";
import { useAppointmentStore, useUserStore } from "@/store";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import { getDefaultValues } from "../helpers";

type Props = {
  defaultValues?: Partial<AppointmentFormData>;
  onSubmit?: (data: AppointmentFormData) => void;
  submitLabel?: string;
};

export default function AppointmentForm({
  defaultValues,
  onSubmit,
  submitLabel = "Agendar",
}: Props) {
  const { selectedDate, selectedHour } = useAppointmentStore();
  const { user } = useUserStore();
  const { appointmentMutation } = useCreateAppointment({
    onSucces: () => reset(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      ...getDefaultValues(selectedDate, selectedHour),
      ...defaultValues, // sobrescribe si viene del update
    },
  });

  const handleFormSubmit = (data: AppointmentFormData) => {
    const finalData = {
      ...data,
      user_id: user!.id,
    };

    if (onSubmit) {
      onSubmit(finalData); // para editar
    } else {
      appointmentMutation.mutate(finalData); // para crear
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <InputField
        id="correo"
        label="Correo del tutor"
        type="email"
        registration={register("correo", {
          required: "El correo es obligatorio",
        })}
        error={errors.correo}
      />

      <InputField
        id="fecha_cita"
        label="Fecha de la cita"
        type="date"
        readOnly
        registration={register("fecha_cita", {
          required: "La fecha es obligatoria",
        })}
        error={errors.fecha_cita}
      />

      <InputField
        id="hora_inicio"
        label="Hora de inicio"
        type="time"
        registration={register("hora_inicio", {
          required: "La hora de inicio es obligatoria",
        })}
        error={errors.hora_inicio}
      />

      <InputField
        id="hora_fin"
        label="Hora de fin"
        type="time"
        registration={register("hora_fin", {
          required: "La hora de fin es obligatoria",
        })}
        error={errors.hora_fin}
      />

      <InputField
        id="nombre_alumno"
        label="Nombre del alumno"
        registration={register("nombre_alumno", {
          required: "El nombre del alumno es obligatorio",
        })}
        error={errors.nombre_alumno}
      />

      <InputField
        id="nombre_tutor"
        label="Nombre del tutor"
        registration={register("nombre_tutor", {
          required: "El nombre del tutor es obligatorio",
        })}
        error={errors.nombre_tutor}
      />

      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
    </form>
  );
}
