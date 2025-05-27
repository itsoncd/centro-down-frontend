import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { InputField } from "@/components/InputField";

type AppointmentFormData = {
  correo: string;
  fecha_cita: string;
  nombre_alumno: string;
  nombre_tutor: string;
  hora_inicio: string;
  hora_fin: string;
};

type Props = {
  defaultValues?: AppointmentFormData;
  onSubmit: (data: AppointmentFormData) => void;
  submitLabel?: string;
};

export default function AppointmentForm({
  defaultValues,
  onSubmit,
  submitLabel = "Agendar",
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="space-y-4"
    >
      <InputField
        id="correo"
        label="Correo del tutor"
        type="email"
        registration={register("correo", { required: "El correo es obligatorio" })}
        error={errors.correo}
      />

      <InputField
        id="fecha_cita"
        label="Fecha de la cita"
        type="date"
        readOnly
        registration={register("fecha_cita", { required: "La fecha es obligatoria" })}
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
