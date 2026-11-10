import { isAxiosError } from "axios";

// The two values the API uses for `error_type`.
export type FieldErrorType = "empty" | "invalid";

// One entry of the grading endpoints' structured 422 payload.
export interface ApiFieldError {
  field: string;
  error_type: FieldErrorType;
  message: string;
}

type GradingField = "result" | "files";

// Spanish copy per rejected field and error type. The API's English message is not
// shown: the interface stays in Spanish (constitution art. 7).
export type GradingValidationMessageKey =
  | "grading.validation.gradeRequired"
  | "grading.validation.gradeInvalid"
  | "grading.validation.evidenceRequired"
  | "grading.validation.evidenceInvalid";

const isEvidenceField = (field: string) => field === "files" || field.startsWith("files.");

// Reads the API's structured field errors from a 422 response. This is presentation
// mapping only: no rule here decides whether a save is allowed.
export const parseFieldErrors = (error: unknown): ApiFieldError[] | null => {
  if (!isAxiosError(error) || error.response?.status !== 422) return null;

  const errors = (error.response.data as { errors?: unknown } | undefined)?.errors;

  return Array.isArray(errors) ? (errors as ApiFieldError[]) : null;
};

// The first error that belongs to one of the two fields this page renders.
export const findFieldError = (
  errors: ApiFieldError[] | null,
  field: GradingField,
): ApiFieldError | null => {
  if (!errors) return null;

  return (
    errors.find((entry) =>
      field === "files" ? isEvidenceField(entry.field) : entry.field === "result",
    ) ?? null
  );
};

// A failure this page cannot attach to a field must still be visible.
export const hasUnmappedErrors = (errors: ApiFieldError[] | null): boolean =>
  (errors ?? []).some((entry) => entry.field !== "result" && !isEvidenceField(entry.field));

export const validationMessageKey = (
  field: GradingField,
  errorType: FieldErrorType,
): GradingValidationMessageKey => {
  if (field === "result") {
    return errorType === "empty"
      ? "grading.validation.gradeRequired"
      : "grading.validation.gradeInvalid";
  }

  return errorType === "empty"
    ? "grading.validation.evidenceRequired"
    : "grading.validation.evidenceInvalid";
};

// Removes one field's errors after the grader edits it, keeping the other field's
// messages visible until that field is fixed too.
export const clearFieldErrors = (
  errors: ApiFieldError[] | null,
  field: GradingField,
): ApiFieldError[] | null => {
  if (!errors) return null;

  const next = errors.filter((entry) =>
    field === "files" ? !isEvidenceField(entry.field) : entry.field !== "result",
  );

  return next.length > 0 ? next : null;
};
