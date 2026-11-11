import type { EvaluationData } from "../types";
import { isFinishedStatus } from "./statusMapper";

export const LIST_PATH = "/evaluaciones/aplicacion-de-evaluaciones";
export const CREATE_PATH = `${LIST_PATH}/crear`;

export const gradingItemPath = (evaluationId: number, itemVersionId: number): string =>
  `${LIST_PATH}/${evaluationId}/calificar-item/${itemVersionId}`;

// First item of the evaluation as the grading screen expects it: its item-version id.
export const firstItemVersionId = (evaluation: EvaluationData): number | null =>
  evaluation.items[0]?.item_id ?? null;

export type GradingActionLabelKey = "card.startGrading" | "card.continueGrading";

export interface GradingAction {
  labelKey: GradingActionLabelKey;
}

// The grading action is available only for an unfinished evaluation with at least one item.
export const gradingActionFor = (evaluation: EvaluationData): GradingAction | null => {
  if (evaluation.items.length === 0 || isFinishedStatus(evaluation.status)) {
    return null;
  }

  return {
    labelKey:
      evaluation.status.toUpperCase() === "NOT_STARTED"
        ? "card.startGrading"
        : "card.continueGrading",
  };
};

// Deduplicate values (case-insensitive) and order them by preference first, then alphabetically.
export const orderTypeOptions = (values: string[], preference: string[]): string[] => {
  const unique: string[] = [];
  const seen = new Set<string>();

  for (const value of values) {
    const key = value.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(value);
    }
  }

  const preferred = preference.filter((candidate) =>
    unique.some((value) => value.toLowerCase() === candidate.toLowerCase()),
  );
  const rest = unique
    .filter((value) => !preference.some((candidate) => candidate.toLowerCase() === value.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return [...preferred, ...rest];
};

export interface ActiveFilterState {
  selectedStudent: unknown;
  searchInput: string;
  statusFilter: string;
  typeFilter: string;
}

export const hasActiveFilters = ({
  selectedStudent,
  searchInput,
  statusFilter,
  typeFilter,
}: ActiveFilterState): boolean =>
  Boolean(selectedStudent) ||
  searchInput.trim() !== "" ||
  statusFilter !== "" ||
  typeFilter !== "";

// The card's short date: 15/01/26.
export const formatShortDate = (date: Date): string =>
  date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  });
