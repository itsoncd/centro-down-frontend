import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import type {
    ApiEvaluationTemplateDetail,
    ApiEvaluationTemplateOption,
    ApiEvaluationTemplateVersion,
} from "../types";

interface EvaluationTemplateSectionProps {
    // Catálogo del combo (GET /evaluation-templates/options)
    options: ApiEvaluationTemplateOption[];
    selectedId: number | "";
    onSelect: (id: number | "") => void;
    // Detalle de la opción elegida, pedido aparte (GET /evaluation-templates/{id})
    detail: ApiEvaluationTemplateDetail | null;
    latestVersion: ApiEvaluationTemplateVersion | null;
    isDetailLoading: boolean;
    isDetailError: boolean;
    onRetryDetail: () => void;
}

const selectClassName =
    "w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

// Para mostrar este formato: 15/01/2026
const formatDate = (value: string | undefined): string => {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
);

// Detalles de la plantilla elegida, tomados de su versión más reciente
const TemplateDetails = ({
    template,
    version,
}: {
    template: ApiEvaluationTemplateDetail;
    version: ApiEvaluationTemplateVersion;
}) => {
    const { t } = useTranslation("evaluations");

    const gradingLabels: Record<string, string> = {
        escala_logro: t("create.details.gradingEscalaLogro"),
        porcentual: t("create.details.gradingPorcentual"),
    };

    const itemVersions = version.item_versions ?? [];

    return (
        <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-4">
            <p className="text-base font-semibold text-gray-800 mb-3">{template.name}</p>

            <div className="grid gap-3 sm:grid-cols-2">
                <DetailRow label={t("create.details.type")} value={template.type || t("create.details.noType")} />
                <DetailRow
                    label={t("create.details.grading")}
                    value={gradingLabels[version.grading_type] ?? version.grading_type}
                />
                <DetailRow label={t("create.details.version")} value={version.version} />
                <DetailRow label={t("create.details.createdAt")} value={formatDate(template.created_at)} />
            </div>

            <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    {t("create.details.items")}
                </p>
                {itemVersions.length === 0 ? (
                    <p className="mt-1 text-sm text-gray-500 font-medium">{t("create.details.itemsEmpty")}</p>
                ) : (
                    <ul className="mt-1 list-inside list-decimal space-y-0.5">
                        {itemVersions.map((itemVersion) => (
                            <li key={itemVersion.id} className="text-sm text-gray-700">
                                {itemVersion.version_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export const EvaluationTemplateSection = ({
    options,
    selectedId,
    onSelect,
    detail,
    latestVersion,
    isDetailLoading,
    isDetailError,
    onRetryDetail,
}: EvaluationTemplateSectionProps) => {
    const { t } = useTranslation("evaluations");

    const renderDetails = () => {
        if (selectedId === "") {
            return <p className="text-sm text-gray-500 font-medium">{t("create.details.empty")}</p>;
        }

        // Al cambiar de opción, la información espera a su propia petición
        if (isDetailLoading) {
            return (
                <div className="flex items-center justify-center py-6">
                    <Spinner message={t("create.details.loading")} />
                </div>
            );
        }

        if (isDetailError) {
            return (
                <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-red-600 font-medium">{t("create.details.loadError")}</p>
                    <Button variant="secondary" size="sm" onClick={onRetryDetail}>
                        {t("actions.retry", { ns: "common" })}
                    </Button>
                </div>
            );
        }

        if (!detail || !latestVersion) {
            return <p className="text-sm text-gray-500 font-medium">{t("create.details.noVersion")}</p>;
        }

        return <TemplateDetails template={detail} version={latestVersion} />;
    };

    return (
        <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-800">{t("create.template.title")}</h2>

            {options.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500 font-medium">{t("create.template.empty")}</p>
            ) : (
                <div className="mt-4 space-y-5">
                    {/* Combo con las plantillas habilitadas */}
                    <div>
                        <label htmlFor="template-select" className="block text-sm text-gray-600 mb-1">
                            {t("create.template.label")}
                        </label>
                        <select
                            id="template-select"
                            value={selectedId}
                            onChange={(event) =>
                                onSelect(event.target.value === "" ? "" : Number(event.target.value))
                            }
                            className={selectClassName}>
                            <option value="">{t("create.template.placeholder")}</option>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {renderDetails()}
                </div>
            )}
        </section>
    );
};
