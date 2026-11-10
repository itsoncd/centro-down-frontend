import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@headlessui/react";
import Button from "@/components/Button";
import { useInstrumentBlob } from "../../hooks/useInstrumentBlob";

interface InstrumentViewerDialogProps {
  instrumentId: number;
  instrumentName: string;
  extension: string;
  onClose: () => void;
}

const isImage = (extension: string) =>
  ["png", "jpg", "jpeg", "gif", "webp"].includes(extension.toLowerCase());

const isPdf = (extension: string) => extension.toLowerCase() === "pdf";

// Renders the instrument from a blob URL created in this page. A cross-port iframe
// cannot display a PDF, so the bytes are fetched as a blob to make the URL same-origin.
export const InstrumentViewerDialog = ({
  instrumentId,
  instrumentName,
  extension,
  onClose,
}: InstrumentViewerDialogProps) => {
  const { t } = useTranslation("evaluations");
  const { instrumentQuery } = useInstrumentBlob(instrumentId);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!instrumentQuery.data) return;

    const url = URL.createObjectURL(instrumentQuery.data);
    setObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      setObjectUrl(null);
    };
  }, [instrumentQuery.data]);

  const renderContent = () => {
    if (instrumentQuery.isPending) {
      return <p className="text-sm text-gray-500">{t("grading.instrument.loading")}</p>;
    }

    if (instrumentQuery.isError || !objectUrl) {
      return <p className="text-sm text-red-600">{t("grading.instrument.loadError")}</p>;
    }

    if (isImage(extension)) {
      return (
        <img
          src={objectUrl}
          alt={instrumentName}
          className="max-h-[70vh] w-auto mx-auto object-contain"
        />
      );
    }

    if (isPdf(extension)) {
      return (
        <iframe
          src={objectUrl}
          title={instrumentName}
          className="w-full h-[70vh] rounded-md border border-gray-200"
        />
      );
    }

    return (
      <a
        href={objectUrl}
        download={instrumentName}
        className="inline-flex items-center text-sm font-medium text-blue-600 underline"
      >
        {t("grading.instrument.download")}
      </a>
    );
  };

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-bold text-gray-900 truncate">
                {instrumentName}
              </Dialog.Title>
              <p className="text-xs text-gray-500 font-medium">{t("grading.instrument.viewerTitle")}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={onClose}>
              {t("grading.instrument.close")}
            </Button>
          </div>

          <div className="mt-4">{renderContent()}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
