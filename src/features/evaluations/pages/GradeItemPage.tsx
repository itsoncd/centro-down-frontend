import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import Button from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { FullPageLoader } from "@/components/FullPageLoader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ItemNavigation } from "../components/grading/ItemNavigation";
import { InstrumentNavigator } from "../components/grading/InstrumentNavigator";
import { GradingFormCard } from "../components/grading/GradingFormCard";
import { GradingProgressCard } from "../components/grading/GradingProgressCard";
import { GradingItemList } from "../components/grading/GradingItemList";
import { useGradingWorkspace } from "../hooks/useGradingWorkspace";
import { useSaveItemGrading } from "../hooks/useSaveItemGrading";
import { useCompleteEvaluation } from "../hooks/useCompleteEvaluation";
import {
  allItemsGraded,
  canFinalizeEvaluation,
  createDraft,
  isDirty,
  nextItemId,
  toSaveBody,
} from "../utils/gradingDraft";
import {
  clearFieldErrors,
  findFieldError,
  hasUnmappedErrors,
  parseFieldErrors,
  validationMessageKey,
} from "../utils/gradingErrors";
import type { ApiFieldError } from "../utils/gradingErrors";
import type { GradeResult, GradingDraft } from "../types/grading";
import { extractApiErrorMessage } from "@/utils";
import { LIST_PATH, gradingItemPath } from "../utils/evaluationList";

export const GradeItemPage = () => {
  const { t } = useTranslation("evaluations");
  const navigate = useNavigate();
  const { evaluationId: evaluationIdParam, itemId: itemIdParam } = useParams();

  const evaluationId = Number(evaluationIdParam);
  const requestedItemId = Number(itemIdParam);

  const { gradingQuery } = useGradingWorkspace(evaluationId);
  const { saveMutation } = useSaveItemGrading(evaluationId);
  const { completeMutation } = useCompleteEvaluation(() => navigate(LIST_PATH));

  const workspace = gradingQuery.data;
  const items = workspace?.items ?? [];

  const progress = workspace?.progress ?? { completed: 0, total: 0, percent: 0 };
  const isEvaluationComplete = allItemsGraded(progress);
  const isFinalized = workspace?.status === "COMPLETED";

  const [draft, setDraft] = useState<GradingDraft | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  // Field errors come straight from the API's 422 payload; this page validates nothing.
  const [fieldErrors, setFieldErrors] = useState<ApiFieldError[] | null>(null);

  const currentItem = items.find((item) => item.itemVersionId === requestedItemId) ?? null;
  const instrument = currentItem?.instruments[instrumentIndex] ?? null;

  const dirty =
    instrument !== null &&
    draft !== null &&
    draft.instrumentId === instrument.id &&
    isDirty(instrument, draft);

  // The draft mirrors the selected instrument's stored grading. Depending on the
  // instrument object (not its fields) also picks up the refreshed copy after a save.
  useEffect(() => {
    if (instrument) setDraft(createDraft(instrument));
    setFieldErrors(null);
  }, [instrument]);

  // Each item starts on its first instrument, so evidence binds to what is on screen.
  useEffect(() => {
    setInstrumentIndex(0);
  }, [currentItem?.itemVersionId]);

  // A successful save clears the messages the previous attempt produced.
  useEffect(() => {
    if (saveMutation.isSuccess) setFieldErrors(null);
  }, [saveMutation.isSuccess]);

  // The API answers 422 with [{ field, error_type, message }]; anything else is a
  // transport/authorization failure and stays in the toast.
  useEffect(() => {
    setFieldErrors(parseFieldErrors(saveMutation.error));
  }, [saveMutation.error]);

  // An :itemId outside the evaluation cannot be graded: fall back to the first item.
  const itemsReady = items.length > 0;
  const firstItemId = items[0]?.itemVersionId ?? null;

  useEffect(() => {
    if (!itemsReady || currentItem !== null || firstItemId === null) return;
    navigate(gradingItemPath(evaluationId, firstItemId), {
      replace: true,
    });
  }, [itemsReady, currentItem, firstItemId, evaluationId, navigate]);

  if (gradingQuery.isPending) {
    return <FullPageLoader message={t("grading.loading")} />;
  }

  if (gradingQuery.isError) {
    const isNotFound =
      isAxiosError(gradingQuery.error) && gradingQuery.error.response?.status === 404;

    return (
      <div className="min-h-screen bg-blue-50/40 flex flex-col items-center justify-center gap-4 p-6">
        {isNotFound ? (
          <>
            <p className="text-gray-700 font-semibold">{t("grading.notFound.title")}</p>
            <Link to={LIST_PATH} className="text-sm font-medium text-blue-600 underline">
              {t("grading.notFound.backToList")}
            </Link>
          </>
        ) : (
          <>
            <ErrorMessage>
              {extractApiErrorMessage(gradingQuery.error, t("grading.loadError"))}
            </ErrorMessage>
            <Button variant="secondary" onClick={() => void gradingQuery.refetch()}>
              {t("actions.retry", { ns: "common" })}
            </Button>
          </>
        )}
      </div>
    );
  }

  if (!currentItem || !draft) {
    return <FullPageLoader message={t("grading.loading")} />;
  }

  // Sidebar, next-item and instrument navigation are held back behind a confirmation
  // when the selected instrument has unfixed edits.
  const guard = (action: () => void) => {
    if (dirty) {
      setConfirmAction(() => action);
      return;
    }

    action();
  };

  const navigateToItem = (itemVersionId: number) =>
    guard(() => navigate(gradingItemPath(evaluationId, itemVersionId)));

  const selectInstrument = (index: number) => {
    if (index === instrumentIndex) return;

    guard(() => setInstrumentIndex(index));
  };

  const updateDraft = (patch: Partial<GradingDraft>) =>
    setDraft((current) => (current === null ? current : { ...current, ...patch }));

  const handleResultChange = (result: GradeResult) => {
    setFieldErrors((current) => clearFieldErrors(current, "result"));
    updateDraft({ result });
  };

  const handleAddFiles = (files: File[]) => {
    setFieldErrors((current) => clearFieldErrors(current, "files"));
    updateDraft({ files: [...draft.files, ...files] });
  };

  const handleRemoveDraftFile = (index: number) => {
    setFieldErrors((current) => clearFieldErrors(current, "files"));
    updateDraft({ files: draft.files.filter((_, position) => position !== index) });
  };

  const handleRemoveStoredEvidence = (evidenceId: number) => {
    setFieldErrors((current) => clearFieldErrors(current, "files"));
    updateDraft({ removeEvidenceIds: [...draft.removeEvidenceIds, evidenceId] });
  };

  // No client-side validation: the request is always sent for the selected instrument
  // and the API decides. A 422 comes back as field errors under the matching field.
  const handleSave = () => {
    if (!instrument || saveMutation.isPending) return;

    setFieldErrors(null);
    saveMutation.reset();
    saveMutation.mutate({
      instrumentId: instrument.id,
      body: toSaveBody(draft),
    });
  };

  const gradeErrorEntry = findFieldError(fieldErrors, "result");
  const evidenceErrorEntry = findFieldError(fieldErrors, "files");

  const gradeError = gradeErrorEntry
    ? t(validationMessageKey("result", gradeErrorEntry.error_type))
    : undefined;

  const evidenceError = evidenceErrorEntry
    ? t(validationMessageKey("files", evidenceErrorEntry.error_type))
    : undefined;

  const nextId = nextItemId(items, currentItem.itemVersionId);
  const handleNext = () => {
    if (nextId !== null) navigateToItem(nextId);
  };

  // Finalizing is offered only when every item is graded, nothing is being saved and the
  // evaluation is not already completed.
  const openFinishDialog = () => {
    if (
      !canFinalizeEvaluation(progress, workspace?.status ?? null) ||
      completeMutation.isPending ||
      saveMutation.isPending
    ) {
      return;
    }

    setIsFinishDialogOpen(true);
  };

  const confirmFinish = () => {
    setIsFinishDialogOpen(false);
    completeMutation.mutate(evaluationId);
  };

  return (
    <div className="min-h-screen bg-blue-50/40 p-6 md:p-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">{workspace?.title}</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">{workspace?.type}</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main section: Item Navigation, Instrument Navigation, Grading and Evidence */}
          <div className="flex w-full flex-col gap-4 lg:w-9/12">
            <ItemNavigation
              item={currentItem}
              items={items}
              isEvaluationComplete={isEvaluationComplete}
              isFinalized={isFinalized}
              isFinalizing={completeMutation.isPending}
              onNext={handleNext}
              onFinish={openFinishDialog}
            />

            <InstrumentNavigator
              item={currentItem}
              selectedIndex={instrumentIndex}
              onSelect={selectInstrument}
            />

            {instrument ? (
              <GradingFormCard
                instrument={instrument}
                gradeOptions={workspace?.gradeOptions ?? []}
                draftFiles={draft.files}
                removeEvidenceIds={draft.removeEvidenceIds}
                result={draft.result}
                comments={draft.comments}
                isSaving={saveMutation.isPending}
                gradeError={gradeError}
                evidenceError={evidenceError}
                hasUnmappedErrors={hasUnmappedErrors(fieldErrors)}
                onResultChange={handleResultChange}
                onCommentsChange={(comments) => updateDraft({ comments })}
                onAddFiles={handleAddFiles}
                onRemoveDraftFile={handleRemoveDraftFile}
                onRemoveStoredEvidence={handleRemoveStoredEvidence}
                onSave={handleSave}
              />
            ) : (
              <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-5">
                <p className="text-sm text-gray-500 font-medium">
                  {t("grading.instrument.empty")}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar: Grading Progress, then the selectable item list */}
          <aside className="flex w-full flex-col gap-4 lg:w-3/12">
            <GradingProgressCard
              progress={progress}
              isEvaluationComplete={isEvaluationComplete}
              isFinalized={isFinalized}
              isFinalizing={completeMutation.isPending}
              onFinish={openFinishDialog}
            />

            <GradingItemList
              items={items}
              currentItemVersionId={currentItem.itemVersionId}
              onSelect={navigateToItem}
            />
          </aside>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmAction !== null}
        title={t("grading.discard.title")}
        description={t("grading.discard.description")}
        confirmLabel={t("grading.discard.confirm")}
        cancelLabel={t("grading.discard.cancel")}
        onConfirm={() => {
          const action = confirmAction;
          setConfirmAction(null);
          action?.();
        }}
        onClose={() => setConfirmAction(null)}
      />

      <ConfirmDialog
        isOpen={isFinishDialogOpen}
        title={t("grading.finish.title")}
        description={dirty ? t("grading.finish.descriptionUnsaved") : t("grading.finish.description")}
        confirmLabel={t("grading.finish.action")}
        cancelLabel={t("actions.cancel", { ns: "common" })}
        onConfirm={confirmFinish}
        onClose={() => setIsFinishDialogOpen(false)}
      />
    </div>
  );
};
