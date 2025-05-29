import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import type { AppointmentData } from "../types";

interface Props {
  appointment: AppointmentData;
};

export const AppointmentDetailsForm = ({ appointment }: Props) => {
  const { correo, nombre_alumno, nombre_tutor } = appointment;
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="correo">Correo del tutor</Label>
        <Input readOnly id="correo" type="email" value={correo} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="nombre_alumno">Nombre del alumno</Label>
        <Input readOnly id="nombre_alumno" value={nombre_alumno} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="nombre_tutor">Nombre del tutor</Label>
        <Input readOnly id="nombre_tutor" value={nombre_tutor} />
      </div>
    </form>
  );
};
