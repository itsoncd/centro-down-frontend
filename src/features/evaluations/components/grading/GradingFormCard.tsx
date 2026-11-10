import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import { GradeSelector } from "./GradeSelector";
import { NotesField } from "./NotesField";
import { EvidenceDropzone } from "./EvidenceDropzone";
import { EvidenceList } from "./EvidenceList";
import type {
  GradeOption,
  GradeResult,
  GradingInstrument,
} from "../../types/grading";

interface GradingFormCardProps {
  instrument: GradingInstrument;
  gradeOptions: GradeOption[];
  draftFiles: File[];
  removeEvidenceIds: number[];
  result: GradeResult | null;
  comments: string;
  isSaving: boolean;
  gradeError?: string;
  evidenceError?: string;
  hasUnmappedErrors: boolean;
  onResultChange: (value: GradeResult) => void;
  onCommentsChange: (value: string) => void;
  onAddFiles: (files: File[]) => void;
  onRemoveDraftFile: (index: number) => void;
  onRemoveStoredEvidence: (evidenceId: number) => void;
  onSave: () => void;
}

// The Grading and Evidence subsection, in the order FR-2 fixes:
// Calificación, Evidencias, Notas and the Guardar action.
//
// Everything here belongs to the selected instrument. The page does not validate;
// Guardar is pressable whenever no save is in flight and the API's field errors are
// rendered under the field they belong to.
export const GradingFormCard = ({
  instrument,
  gradeOptions,
  draftFiles,
  removeEvidenceIds,
  result,
  comments,
  isSaving,
  gradeError,
  evidenceError,
  hasUnmappedErrors,
  onResultChange,
  onCommentsChange,
  onAddFiles,
  onRemoveDraftFile,
  onRemoveStoredEvidence,
  onSave,
}: GradingFormCardProps) => {
  const { t } = useTranslation("evaluations");

  return (
    <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-5 space-y-6">
      <GradeSelector
        options={gradeOptions}
        value={result}
        onChange={onResultChange}
        error={gradeError}
      />

      <div className="space-y-3">
        <EvidenceDropzone onAdd={onAddFiles} hasError={Boolean(evidenceError)} />

        <EvidenceList
          instrument={instrument}
          draftFiles={draftFiles}
          removeEvidenceIds={removeEvidenceIds}
          onRemoveStored={onRemoveStoredEvidence}
          onRemoveDraft={onRemoveDraftFile}
        />

        {evidenceError && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {evidenceError}
          </p>
        )}
      </div>

      <NotesField value={comments} onChange={onCommentsChange} />

      {hasUnmappedErrors && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {t("grading.save.error")}
        </p>
      )}

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={onSave} disabled={isSaving}>
          {isSaving ? t("grading.save.saving") : t("grading.save.action")}
        </Button>
      </div>
    </section>
  );
};
