import type {
  GradeOption,
  GradeResult,
  GradingDraft,
  GradingInstrument,
  GradingItem,
  GradingProgress,
} from "../types/grading";

// Keys of the `grading.grades.*` block in locales/es/evaluations.json.
export type GradeLabelKey = "notAchieved" | "achievedWithHelp" | "achievedAlone";

// Spanish label key for each value the API's `result` enum accepts.
// Static per value (not a template literal) so the typed t() call stays exact.
export const gradeLabelKey = (result: GradeResult): GradeLabelKey => {
  switch (result) {
    case "NOT_ACHIEVED":
      return "notAchieved";
    case "ACHIEVED_WITH_HELP":
      return "achievedWithHelp";
    case "ACHIEVED_ALONE":
      return "achievedAlone";
  }
};

// The saved values of an instrument, used to tell whether the draft diverges.
const savedScalars = (instrument: GradingInstrument) => ({
  result: instrument.grading?.result ?? null,
  comments: instrument.grading?.comments ?? "",
});

// True when the grader has changes that a save would persist.
// Uploaded files and removals always count, because a save is the only way to apply them.
export const isDirty = (instrument: GradingInstrument, draft: GradingDraft): boolean => {
  const saved = savedScalars(instrument);

  return (
    saved.result !== draft.result ||
    saved.comments !== draft.comments ||
    draft.files.length > 0 ||
    draft.removeEvidenceIds.length > 0
  );
};

// Index of an item version inside the ordered list, or -1 when it is absent.
export const itemIndex = (items: GradingItem[], itemVersionId: number): number =>
  items.findIndex((item) => item.itemVersionId === itemVersionId);

// The item after the given one, or null on the last item / when it is absent.
export const nextItemId = (
  items: GradingItem[],
  currentItemVersionId: number,
): number | null => {
  const index = itemIndex(items, currentItemVersionId);

  if (index < 0) return null;

  return items[index + 1]?.itemVersionId ?? null;
};

// The next button is usable once every instrument of the current item is graded, and
// there is a later item to move to.
export const canGoNext = (
  items: GradingItem[],
  currentItemVersionId: number,
): boolean => {
  const current = items.find((item) => item.itemVersionId === currentItemVersionId);

  if (!current || !current.completed) return false;

  return nextItemId(items, currentItemVersionId) !== null;
};

// A draft that mirrors the instrument's stored grading, used whenever it is selected.
export const createDraft = (instrument: GradingInstrument): GradingDraft => ({
  instrumentId: instrument.id,
  result: instrument.grading?.result ?? null,
  comments: instrument.grading?.comments ?? "",
  files: [],
  removeEvidenceIds: [],
});

// Builds the multipart body the per-instrument save endpoint expects. The instrument
// itself travels in the URL, so no id goes in the body.
export const toSaveBody = (draft: GradingDraft): FormData => {
  const body = new FormData();

  if (draft.result !== null) body.append("result", draft.result);

  // Empty notes are omitted: the API stores them as NULL rather than "".
  if (draft.comments.trim() !== "") body.append("comments", draft.comments);

  draft.files.forEach((file, index) => {
    body.append(`files[${index}][resource]`, file);
  });

  draft.removeEvidenceIds.forEach((id) => {
    body.append("remove_evidence_ids[]", String(id));
  });

  return body;
};

// Grade options in the order the API published them (FR-8).
export const orderedGradeOptions = (options: GradeOption[]): GradeOption[] =>
  [...options].sort((a, b) => a.order - b.order);

// The instrument's evidence still stored after the pending removals are applied.
export const remainingEvidence = (
  instrument: GradingInstrument,
  removeEvidenceIds: number[],
) => instrument.evidence.filter((entry) => !removeEvidenceIds.includes(entry.id));

// Every item is complete only when the API reports a non-zero, fully completed set.
export const allItemsGraded = (progress: GradingProgress): boolean =>
  progress.total > 0 && progress.completed === progress.total;

// Finalizing needs every item graded and an evaluation that is not already completed.
export const canFinalizeEvaluation = (
  progress: GradingProgress,
  status: string | null,
): boolean => allItemsGraded(progress) && status !== "COMPLETED";
