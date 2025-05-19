import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { ErrorMessage } from "@/components/ErrorMessage";

type AppointmentFormData = {
  correo: string;
  fecha_cita: string;
  nombre_alumno: string;
  nombre_tutor: string;
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
  } = useForm<AppointmentFormData>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="space-y-4"
    >
      <input
        {...register("correo", { required: "El correo es obligatorio" })}
        placeholder="Correo del tutor"
        className="w-full p-2 border rounded"
        type="email"
      />
      {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}

      <input
        {...register("fecha_cita", { required: "La fecha es obligatoria" })}
        type="date"
        className="w-full p-2 border rounded"
      />
      {errors.fecha_cita && (
        <ErrorMessage>{errors.fecha_cita.message}</ErrorMessage>
      )}

      <input
        {...register("nombre_alumno", {
          required: "El nombre del alumno es obligatorio",
        })}
        placeholder="Nombre del alumno"
        className="w-full p-2 border rounded"
      />
      {errors.nombre_alumno && (
        <ErrorMessage>{errors.nombre_alumno.message}</ErrorMessage>
      )}

      <input
        {...register("nombre_tutor", {
          required: "El nombre del tutor es obligatorio",
        })}
        placeholder="Nombre del tutor"
        className="w-full p-2 border rounded"
      />
      {errors.nombre_tutor && (
        <ErrorMessage>{errors.nombre_tutor.message}</ErrorMessage>
      )}

      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
    </form>
  );
}
