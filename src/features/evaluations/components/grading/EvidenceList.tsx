import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Delete } from "@mui/icons-material";
import Button from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { remainingEvidence } from "../../utils/gradingDraft";
import type { GradingInstrument } from "../../types/grading";

interface EvidenceListProps {
  instrument: GradingInstrument;
  draftFiles: File[];
  removeEvidenceIds: number[];
  onRemoveStored: (evidenceId: number) => void;
  onRemoveDraft: (index: number) => void;
}

// FR-10: the instrument's stored evidence and the files added in this session can be
// reviewed and removed. Removing stored evidence is staged (it applies on save);
// removing a new file simply drops it, because the server never saw it.
export const EvidenceList = ({
  instrument,
  draftFiles,
  removeEvidenceIds,
  onRemoveStored,
  onRemoveDraft,
}: EvidenceListProps) => {
  const { t } = useTranslation("evaluations");
  const [pendingRemoval, setPendingRemoval] = useState<number | null>(null);

  const stored = remainingEvidence(instrument, removeEvidenceIds);

  const isEmpty = stored.length === 0 && draftFiles.length === 0;

  if (isEmpty) {
    return <p className="text-sm text-gray-500 font-medium">{t("grading.evidence.empty")}</p>;
  }

  return (
    <div className="space-y-2">
      {stored.map((evidence) => (
        <div
          key={`stored-${evidence.id}`}
          className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
        >
          <span className="truncate text-sm text-gray-700 font-medium">
            {evidence.name}.{evidence.extension}
          </span>

          <Button
            variant="cancel"
            size="sm"
            onClick={() => setPendingRemoval(evidence.id)}
            aria-label={t("grading.evidence.remove")}
          >
            <Delete fontSize="small" />
          </Button>
        </div>
      ))}

      {draftFiles.map((file, index) => (
        <div
          key={`draft-${file.name}-${index}`}
          className="flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-blue-50 px-3 py-2"
        >
          <span className="truncate text-sm text-gray-700 font-medium">{file.name}</span>

          <Button
            variant="cancel"
            size="sm"
            onClick={() => onRemoveDraft(index)}
            aria-label={t("grading.evidence.remove")}
          >
            <Delete fontSize="small" />
          </Button>
        </div>
      ))}

      <ConfirmDialog
        isOpen={pendingRemoval !== null}
        title={t("grading.evidence.removeTitle")}
        description={t("grading.evidence.removeDescription")}
        confirmLabel={t("actions.delete", { ns: "common" })}
        cancelLabel={t("actions.cancel", { ns: "common" })}
        onConfirm={() => {
          if (pendingRemoval !== null) onRemoveStored(pendingRemoval);
          setPendingRemoval(null);
        }}
        onClose={() => setPendingRemoval(null)}
      />
    </div>
  );
};
