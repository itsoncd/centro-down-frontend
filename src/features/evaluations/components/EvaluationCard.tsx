import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import type { EvaluationData } from "../types";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { statusLabelKey } from "../utils/statusMapper";
import { formatShortDate, gradingActionFor } from "../utils/evaluationList";

interface Props {
    evaluation: EvaluationData;
    onGrade: (evaluation: EvaluationData) => void;
}

export const EvaluationCard = ({ evaluation, onGrade }: Props) => {
    const { t } = useTranslation("evaluations");
    const [isExpanded, setIsExpanded] = useState(false);

    // Background color for the type badge; unknown types use the neutral style.
    const getBadgeColor = (categoria: string) => {
        switch (categoria.toLowerCase()) {
            case "académica":
                return "bg-yellow-100 text-yellow-800";
            case "lenguaje":
                return "bg-green-50 text-green-700";
            case "psicológica":
                return "bg-blue-50 text-blue-700";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Border/label style for the status badge; compare against the API enum values.
    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case "COMPLETED":
                return "bg-green-100 text-green-700 border border-green-500";
            case "IN_PROGRESS":
                return "bg-yellow-50 text-yellow-700 border border-yellow-500";
            case "NOT_STARTED":
                return "bg-transparent text-red-700 border border-red-500";
            case "CANCELLED":
                return "bg-gray-200 text-gray-700 border border-gray-500";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const statusKey = statusLabelKey(evaluation.status);
    const statusLabel = statusKey ? t(statusKey) : evaluation.status;
    const title = evaluation.titulo || t("card.untitled", { id: evaluation.id });
    const typeLabel = evaluation.type || t("card.noType");
    const gradeAction = gradingActionFor(evaluation);

    const toggleExpanded = () => setIsExpanded((value) => !value);

    const handleToggleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleExpanded();
        }
    };

    // The card is presentational: it delegates the grading destination to the page.
    const handleCalificarClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onGrade(evaluation);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-l mb-2 space-y-2 transition-all duration-200 ease-in-out hover:shadow-sm">
            {/* Always-visible row; this is the card's expand/collapse control */}
            <div
                className="flex items-center p-5 md:p-6 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={toggleExpanded}
                onKeyDown={handleToggleKeyDown}
            >
                <DescriptionIcon className="text-gray-400 mr-3" fontSize="large" />

                <span className="font-bold text-base text-gray-900 mr-4">{title}</span>

                <span className={`px-3 py-0.5 rounded-full text-[11px] mr-2 font-bold ${getBadgeColor(typeLabel)}`}>
                    {typeLabel}
                </span>

                <span className={`px-3 py-0.5 rounded-full text-[11px] mr-2 font-bold ${getStatusColor(evaluation.status)}`}>
                    {statusLabel}
                </span>

                {!isExpanded && (
                    <span className="ml-6 text-xs text-gray-500 font-medium">
                        {t("card.itemCount", { total: evaluation.items.length })} | {formatShortDate(evaluation.created_at)}
                    </span>
                )}

                {/* Expand/collapse icon */}
                <ExpandMoreIcon className={`ml-auto text-gray-900 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </div>

            {/* Expanded details and the grading action */}
            {isExpanded && (
                <div className="flex flex-row gap-30 px-12 pb-5 pt-2">
                    {/* Item count */}
                    <div className="flex items-center gap-3">
                        <AssignmentTurnedInIcon className="text-gray-800" fontSize="large" />
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                                {t("card.itemsLabel")}
                            </span>
                            <span className="text-sm font-bold text-gray-900 leading-none">
                                {t("card.itemsCount", { total: evaluation.items.length })}
                            </span>
                        </div>
                    </div>

                    {/* Creation date */}
                    <div className="flex items-center gap-3">
                        <CalendarTodayIcon className="text-gray-800" fontSize="large" />
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                                {t("card.createdAt")}
                            </span>
                            <span className="text-sm font-bold text-gray-900 leading-none">
                                {formatShortDate(evaluation.created_at)}
                            </span>
                        </div>
                    </div>

                    {gradeAction && (
                        <div className="flex flex-col items-end gap-3">
                            <button
                                onClick={handleCalificarClick}
                                className="bg-[#1f1f1f] hover:bg-black text-white text-semibold py-2 px-4 rounded-md transition-colors"
                            >
                                {t(gradeAction.labelKey)}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
