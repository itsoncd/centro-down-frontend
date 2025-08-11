import type { ApiResponseBase } from "@/types";

export interface AppointmentLike {
  user_id: string;
  fecha_cita: string;
  correo: string;
  nombre_alumno: string;
  nombre_tutor: string;
}

export type AppointmentFormData = {
  correo: string;
  fecha_cita: string;
  nombre_alumno: string;
  nombre_tutor: string;
  hora_inicio: string;
  hora_fin: string;
};

export interface AppointmentData {
  user_id: number;
  fecha_cita: string; // string en formato fecha ISO
  hora_inicio: string;
  hora_fin: string;
  correo: string;
  nombre_alumno: string;
  nombre_tutor: string;
  updated_at: string;
  created_at: string;
  id: number;
}

// 📌 Tipos HTTP usando el genérico
export type HTTPAppointmentCreated = ApiResponseBase<AppointmentData>;
export type HTTPGetAppointments = ApiResponseBase<AppointmentData[]>;
