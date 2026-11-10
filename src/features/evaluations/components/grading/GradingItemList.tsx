import { useTranslation } from "react-i18next";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import type { GradingItem } from "../../types/grading";

interface GradingItemListProps {
  items: GradingItem[];
  currentItemVersionId: number;
  onSelect: (itemVersionId: number) => void;
}

// FR-14: every gradable item, with the current one and the completed ones marked.
// Selection is delegated to the page so it can warn about unsaved edits first.
export const GradingItemList = ({
  items,
  currentItemVersionId,
  onSelect,
}: GradingItemListProps) => {
  const { t } = useTranslation("evaluations");

  return (
    <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
      <p className="text-sm font-bold text-gray-900">{t("grading.items.label")}</p>

      <ul className="mt-3 space-y-1">
        {items.map((item) => {
          const isCurrent = item.itemVersionId === currentItemVersionId;

          return (
            <li key={item.itemVersionId}>
              <button
                type="button"
                onClick={() => onSelect(item.itemVersionId)}
                aria-current={isCurrent ? "true" : undefined}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                  isCurrent
                    ? "bg-blue-50 text-blue-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.completed ? (
                  <CheckCircle fontSize="small" className="text-green-600 shrink-0" />
                ) : (
                  <RadioButtonUnchecked fontSize="small" className="text-gray-400 shrink-0" />
                )}

                <span className="truncate">{item.name}</span>

                <span className="ml-auto shrink-0 text-[10px] uppercase tracking-wide text-gray-500">
                  {item.completed
                    ? t("grading.items.completed")
                    : isCurrent
                      ? t("grading.items.current")
                      : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
