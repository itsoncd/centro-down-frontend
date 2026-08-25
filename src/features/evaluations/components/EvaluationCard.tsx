import React, { useState } from "react";
import type { EvaluationData } from "../types";
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from "react-router-dom";
import { useEvaluationStore } from "@/store";
import { translateStatus } from "../utils/statusMapper";

interface Props {
    evaluation: EvaluationData;
}

export const EvaluationCard = ({ evaluation }: Props) => {
    // Estado que maneja si la tarjeta esta desplegado
    const [isExpanded, setIsExpanded] = useState(false);
    const { setSelectedEvaluation } = useEvaluationStore();
    const navigate = useNavigate();

    // Maneja el color de la categoría en razón de cuál es
    const getBadgeColor = (categoria: string) => {
        switch(categoria.toLowerCase()) {
            case 'académica':
                return 'bg-yellow-100 text-yellow-800';
            case 'lenguaje':
                return 'bg-green-50 text-green-700';
            case 'psicológica':
                return 'bg-blue-50 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    // Maneja el color del estado de la evaluación
    const getStatusColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case "completado":
            return "bg-green-100 text-green-700 border border-green-500";
            case "en progreso":
            return "bg-yellow-50 text-yellow-700 border border-yellow-500";
            case "pendiente":
            return "bg-transparent text-red-700 border border-red-500";
            case "cancelado":
            return "bg-gray-200 text-gray-700 border border-gray-500";
            default:
            return "bg-gray-100 text-gray-800";
        }
    };

    // Para formatear la fecha de este modo: 15/01/26
    const formatShortDate = (date: Date) => {
        return date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            timeZone: 'UTC'
        });
    };

    // Maneja la navegación a la página de calificación para la evaluación
    const handleCalificarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Navegar a calificación de la evaluación: ", evaluation.id);
        setSelectedEvaluation(evaluation);
        navigate(`/tutor/calificar/${evaluation.id}`);
    }

    return (
        <div 
            className="bg-white border border-gray-200 rounded-l mb-2 space-y-2 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-sm"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Fila siempre visible de información sobre la evaluación */}
            <div className="flex items-center p-5 md:p-6">
                <DescriptionIcon className="text-gray-400 mr-3" fontSize="large" />

                <span className="font-bold text-base text-gray-900 mr-4">
                    {evaluation.titulo}
                </span>

                <span className={`px-3 py-0.5 rounded-full text-[11px] mr-2 font-bold ${getBadgeColor(evaluation.type)}`}>
                    {evaluation.type}
                </span>

                <span className={`px-3 py-0.5 rounded-full text-[11px] mr-2 font-bold ${getStatusColor(translateStatus(evaluation.status))}`}>
                    {translateStatus(evaluation.status)}
                </span>

                {!isExpanded && (
                    <span className="ml-6 text-xs text-gray-500 font-medium">
                        {evaluation.items.length} Pruebas | {formatShortDate(evaluation.created_at)}
                    </span>
                )}
                
                {/* Icono para expandir la tarjeta de la evaluacion */}
                <ExpandMoreIcon className={`ml-auto text-gray-900 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>

            {/* Si la tarjeta esta expandida muestra la información de otra manera */}
            {isExpanded && (
                <div className="flex flex-row gap-30 px-12 pb-5 pt-2">

                    {/* Bloque de pruebas */}
                    <div className="flex items-center gap-3">
                        <AssignmentTurnedInIcon className="text-gray-800" fontSize="large" />
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                                Pruebas
                            </span>
                            <span className="text-sm font-bold text-gray-900 leading-none">
                                {evaluation.items.length} pruebas
                            </span>
                        </div>
                    </div>

                    {/* Bloque de Fecha de creacion*/}
                    <div className="flex items-center gap-3">
                        <CalendarTodayIcon className="text-gray-800" fontSize="large" />
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                                Fecha de Creación
                            </span>
                            <span className="text-sm font-bold text-gray-900 leading-none">
                                {formatShortDate(evaluation.created_at)}
                            </span>
                        </div>
                    </div>

                    {!["completado", "cancelado"].includes(
                        translateStatus(evaluation.status).toLowerCase()
                    ) && (
                        <div className="flex flex-col items-end gap-3">
                            <button
                                onClick={handleCalificarClick}
                                className="bg-[#1f1f1f] hover:bg-black text-white text-semibold py-2 px-4 rounded-md transition-colors"
                            >
                                {translateStatus(evaluation.status).toLowerCase() === "pendiente"
                                    ? "Calificar Evaluación"
                                    : "Continuar Evaluación"}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};