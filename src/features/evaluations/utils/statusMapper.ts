// utils/statusMapper.ts
import type { EvaluationStatus } from "../types";
export const translateStatus = (status: string): string => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "Pendiente";
    case "CLOSED":
      return "Completado";
    case "CANCELLED":
      return "Cancelado";
    default:
      return status; // fallback: muestra tal cual
  }
};

// Estados que acepta la API (enum de evaluations.status), en el orden en que se muestran.
// Es una lista fija a propósito: si las opciones se derivaran de la respuesta, al filtrar
// por estado el servidor devolvería solo ese estado y el combobox quedaría con una opción.
export const evaluationStatuses: EvaluationStatus[] = ["PENDING", "CLOSED", "CANCELLED"];

// Verifica que un valor (por ejemplo, el de un <select>) sea un estado válido de la API
export const isEvaluationStatus = (value: string): value is EvaluationStatus =>
  (evaluationStatuses as string[]).includes(value);

export const evaluationStatusOptions: { value: EvaluationStatus; label: string }[] =
  evaluationStatuses.map((value) => ({ value, label: translateStatus(value) }));
