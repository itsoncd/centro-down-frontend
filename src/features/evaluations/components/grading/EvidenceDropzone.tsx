import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CloudUpload } from "@mui/icons-material";

interface EvidenceDropzoneProps {
  onAdd: (files: File[]) => void;
  hasError?: boolean;
}

// FR-9: a dropzone under the "Evidencias" label. Evidence belongs to the instrument
// selected in the navigator, so the files do not carry an instrument of their own.
export const EvidenceDropzone = ({ onAdd, hasError }: EvidenceDropzoneProps) => {
  const { t } = useTranslation("evaluations");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    onAdd(Array.from(fileList));
  };

  return (
    <div>
      <p className="block text-sm font-bold text-gray-900 mb-2">{t("grading.evidence.label")}</p>

      <div
        role="button"
        tabIndex={0}
        aria-invalid={hasError ? true : undefined}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          acceptFiles(event.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : hasError
              ? "border-red-400 bg-red-50/40 hover:bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <CloudUpload className="text-gray-400" />
        <span className="text-sm text-gray-600 font-medium">{t("grading.evidence.dropzone")}</span>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => {
            acceptFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
};
