import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import type { GradingProgress } from "../../types/grading";

interface GradingProgressCardProps {
  progress: GradingProgress;
  isEvaluationComplete: boolean;
  isFinalized: boolean;
  isFinalizing: boolean;
  onFinish: () => void;
}

// FR-13: the percentage is rendered exactly as the API computed it from stored grading,
// so it survives a reload (NFR-1). FR-18 adds the finalize action directly below it,
// always visible but enabled only once every item is graded.
export const GradingProgressCard = ({
  progress,
  isEvaluationComplete,
  isFinalized,
  isFinalizing,
  onFinish,
}: GradingProgressCardProps) => {
  const { t } = useTranslation("evaluations");

  return (
    <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
      <p className="text-sm font-bold text-gray-900">{t("grading.progress.label")}</p>

      <div
        className="mt-2 h-2 w-full rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={progress.percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500 font-medium tabular-nums">
        {progress.completed} / {progress.total} ({progress.percent}%)
      </p>

      <Button
        variant="primary"
        className="mt-3 w-full"
        onClick={onFinish}
        disabled={!isEvaluationComplete || isFinalized || isFinalizing}
      >
        {isFinalizing ? t("grading.finish.finalizing") : t("grading.finish.action")}
      </Button>
    </section>
  );
};
