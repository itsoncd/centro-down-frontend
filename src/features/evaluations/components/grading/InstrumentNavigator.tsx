import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, ChevronLeft, ChevronRight, Visibility } from "@mui/icons-material";
import Button from "@/components/Button";
import { InstrumentViewerDialog } from "./InstrumentViewerDialog";
import type { GradingItem } from "../../types/grading";

interface InstrumentNavigatorProps {
  item: GradingItem;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

interface ViewerState {
  id: number;
  name: string;
  extension: string;
}

// FR-5 steps through the item's instruments (the page owns which one is selected);
// FR-6 shows its name and offers a button to view its content (FR-7).
export const InstrumentNavigator = ({
  item,
  selectedIndex,
  onSelect,
}: InstrumentNavigatorProps) => {
  const { t } = useTranslation("evaluations");
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  const instruments = item.instruments;
  const hasInstruments = instruments.length > 0;
  const selected = instruments[Math.min(selectedIndex, Math.max(instruments.length - 1, 0))];

  if (!hasInstruments) {
    return (
      <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
        <p className="text-sm text-gray-500 font-medium">{t("grading.instrument.empty")}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-sm border border-gray-200 shadow-sm p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelect(Math.max(selectedIndex - 1, 0))}
            disabled={selectedIndex === 0}
            aria-label={t("grading.instrument.previous")}
          >
            <ChevronLeft fontSize="small" />
          </Button>

          <span className="text-sm font-semibold text-gray-700 tabular-nums">
            {selectedIndex + 1} / {instruments.length}
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelect(Math.min(selectedIndex + 1, instruments.length - 1))}
            disabled={selectedIndex >= instruments.length - 1}
            aria-label={t("grading.instrument.next")}
          >
            <ChevronRight fontSize="small" />
          </Button>
        </div>

        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-900">
          <span className="truncate">
            {selected.name}.{selected.extension}
          </span>

          {selected.grading && (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-green-700">
              <CheckCircle fontSize="small" />
              {t("grading.instrument.graded")}
            </span>
          )}
        </p>
      </div>

      <Button variant="primary" onClick={() => setViewer(selected)} disabled={!selected}>
        <Visibility fontSize="small" className="mr-2" />
        {t("grading.instrument.view")}
      </Button>

      {viewer && (
        <InstrumentViewerDialog
          instrumentId={viewer.id}
          instrumentName={`${viewer.name}.${viewer.extension}`}
          extension={viewer.extension}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
};
