// One selectable grading outcome, as the API publishes it (order is authoritative).
export interface GradeOption {
  value: GradeResult;
  order: number;
}

// The three values the API's `result` enum accepts.
export type GradeResult = "NOT_ACHIEVED" | "ACHIEVED_WITH_HELP" | "ACHIEVED_ALONE";

// Share of the evaluation's items whose instruments are all graded.
export interface GradingProgress {
  completed: number;
  total: number;
  percent: number;
}

// One evidence file already stored for an instrument's grading.
export interface GradingEvidence {
  id: number;
  fileId: number;
  name: string;
  extension: string;
}

// The saved grading of one instrument, or null when it was never graded.
export interface GradedItemGrading {
  id: number;
  result: GradeResult | null;
  comments: string | null;
}

// One instrument (template file) of an item, with its own grading and evidence.
export interface GradingInstrument {
  id: number;
  name: string;
  extension: string;
  order: number;
  grading: GradedItemGrading | null;
  evidence: GradingEvidence[];
}

// One item of the evaluation; `completed` is true only when every instrument is graded.
export interface GradingItem {
  itemVersionId: number;
  name: string;
  order: number;
  completed: boolean;
  instruments: GradingInstrument[];
}

// The whole-page read model returned by GET /evaluations/{id}/grading.
export interface GradingWorkspace {
  id: number;
  status: string | null;
  title: string;
  type: string;
  gradeOptions: GradeOption[];
  progress: GradingProgress;
  items: GradingItem[];
}

// The grading row returned by the save endpoint (snake_case, as stored).
export interface SavedGradedItem {
  id: number;
  result: GradeResult;
  comments: string | null;
  evaluation_id: number;
  item_version_file_id: number;
  deleted: number | boolean;
}

// What the grader is editing for the selected instrument.
export interface GradingDraft {
  instrumentId: number;
  result: GradeResult | null;
  comments: string;
  files: File[];
  removeEvidenceIds: number[];
}
