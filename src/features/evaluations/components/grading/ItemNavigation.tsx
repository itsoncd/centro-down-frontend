import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import { canGoNext } from "../../utils/gradingDraft";
import type { GradingItem } from "../../types/grading";

interface ItemNavigationProps {
  item: GradingItem;
  items: GradingItem[];
  isEvaluationComplete: boolean;
  isFinalized: boolean;
  isFinalizing: boolean;
  onNext: () => void;
  onFinish: () => void;
}

// FR-3 shows the current item's name. Once every item is graded, the action becomes
// Finalizar (FR-18); before that it is the next-item button (FR-4).
export const ItemNavigation = ({
  item,
  items,
  isEvaluationComplete,
  isFinalized,
  isFinalizing,
  onNext,
  onFinish,
}: ItemNavigationProps) => {
  const { t } = useTranslation("evaluations");

  const index = items.findIndex((candidate) => candidate.itemVersionId === item.itemVersionId);
  const canAdvance = canGoNext(items, item.itemVersionId);

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-sm border border-gray-200 shadow-sm p-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
        <p className="text-xs text-gray-500 font-medium mt-1">
          {t("grading.item.of", { current: index + 1, total: items.length })}
        </p>
      </div>

      {isEvaluationComplete ? (
        <Button variant="primary" onClick={onFinish} disabled={isFinalized || isFinalizing}>
          {isFinalizing ? t("grading.finish.finalizing") : t("grading.finish.action")}
        </Button>
      ) : (
        <Button variant="primary" onClick={onNext} disabled={!canAdvance}>
          {t("grading.item.next")}
        </Button>
      )}
    </section>
  );
};
