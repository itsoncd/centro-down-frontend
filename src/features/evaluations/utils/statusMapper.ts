// utils/statusMapper.ts
import type { EvaluationStatus } from "../types";
export const translateStatus = (status: string): string => {
  switch (status.toUpperCase()) {
    case "NOT_STARTED":
      return "Sin iniciar";
    case "IN_PROGRESS":
      return "En progreso";
    case "COMPLETED":
      return "Completado";
    case "CANCELLED":
      return "Cancelado";
    default:
      return status; // fallback: muestra tal cual
  }
};

// Estados que acepta la API (enum de evaluations.status), en el orden del flujo:
// NOT_STARTED → IN_PROGRESS → COMPLETED, con CANCELLED fuera del flujo.
// Es una lista fija a propósito: si las opciones se derivaran de la respuesta, al filtrar
// por estado el servidor devolvería solo ese estado y el combobox quedaría con una opción.
export const evaluationStatuses: EvaluationStatus[] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

// Verifica que un valor (por ejemplo, el de un <select>) sea un estado válido de la API
export const isEvaluationStatus = (value: string): value is EvaluationStatus =>
  (evaluationStatuses as string[]).includes(value);

export const evaluationStatusOptions: { value: EvaluationStatus; label: string }[] =
  evaluationStatuses.map((value) => ({ value, label: translateStatus(value) }));

// Estados en los que la evaluación ya no se puede calificar
export const isFinishedStatus = (status: string): boolean => {
  const normalized = status.toUpperCase();

  return normalized === "COMPLETED" || normalized === "CANCELLED";
};
