import { useTranslation } from "react-i18next";

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// FR-11: a multiline field under the "Notas" label. An empty value is valid and is
// omitted from the payload, which the API stores as NULL.
export const NotesField = ({ value, onChange }: NotesFieldProps) => {
  const { t } = useTranslation("evaluations");

  return (
    <div>
      <label
        htmlFor="grading-notes"
        className="block text-sm font-bold text-gray-900 mb-2"
      >
        {t("grading.notes.label")}
      </label>

      <textarea
        id="grading-notes"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("grading.notes.placeholder")}
        rows={4}
        className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
  );
};
