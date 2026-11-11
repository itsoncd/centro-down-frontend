// utils/statusMapper.ts
import type { EvaluationStatus } from "../types";

// Typed keys of the `statuses.*` block in locales/es/evaluations.json.
export type StatusLabelKey =
  | "statuses.NOT_STARTED"
  | "statuses.IN_PROGRESS"
  | "statuses.COMPLETED"
  | "statuses.CANCELLED";

// Locale key for a known status; null when the value is not one of the four known statuses.
export function statusLabelKey(status: EvaluationStatus): StatusLabelKey;
export function statusLabelKey(status: string): StatusLabelKey | null;
export function statusLabelKey(status: string): StatusLabelKey | null {
  switch (status.toUpperCase()) {
    case "NOT_STARTED":
      return "statuses.NOT_STARTED";
    case "IN_PROGRESS":
      return "statuses.IN_PROGRESS";
    case "COMPLETED":
      return "statuses.COMPLETED";
    case "CANCELLED":
      return "statuses.CANCELLED";
    default:
      return null;
  }
}

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

// Estados en los que la evaluación ya no se puede calificar
export const isFinishedStatus = (status: string): boolean => {
  const normalized = status.toUpperCase();

  return normalized === "COMPLETED" || normalized === "CANCELLED";
};
