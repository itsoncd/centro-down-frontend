import { useTranslation } from "react-i18next";
import { gradeLabelKey } from "../../utils/gradingDraft";
import type { GradeOption, GradeResult } from "../../types/grading";

interface GradeSelectorProps {
  options: GradeOption[];
  value: GradeResult | null;
  onChange: (value: GradeResult) => void;
  error?: string;
}

// FR-8: three mutually exclusive options under the "Calificación" label. Options come
// from the API in its own order; the Spanish labels are the client's responsibility.
// `error` is the API's validation message for this field.
export const GradeSelector = ({ options, value, onChange, error }: GradeSelectorProps) => {
  const { t } = useTranslation("evaluations");

  return (
    <div>
      <p className="block text-sm font-bold text-gray-900 mb-2">{t("grading.grades.label")}</p>

      <div
        role="radiogroup"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "grading-grade-error" : undefined}
        className="flex flex-wrap gap-3"
      >
        {options.map((option) => {
          const id = `grade-${option.value}`;
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              htmlFor={id}
              className={`px-4 py-2 rounded-md border text-sm font-semibold cursor-pointer transition-colors ${
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <input
                id={id}
                type="radio"
                name="grading-result"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {t(`grading.grades.${gradeLabelKey(option.value)}` as const)}
            </label>
          );
        })}
      </div>

      {error && (
        <p id="grading-grade-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
