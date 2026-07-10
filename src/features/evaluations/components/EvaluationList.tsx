import type { EvaluationData, StudentData } from "../types";
import { EvaluationCard } from "./EvaluationCard";

interface EvaluationListProps {
    evaluations: EvaluationData[];
    student: StudentData | null;
}

export const EvaluationList = ({ evaluations, student }: EvaluationListProps) => {
    const filteredEvaluations = evaluations.filter((evaluation) => evaluation.student_id === student?.id);

    if (student === null) return(<div className="flex flex-col items-center gap-3 mb-6 text-gray-500">Seleccione un estudiante</div>)

    if (filteredEvaluations.length === 0) return(<div className="flex flex-col items-center gap-3 mb-6 text-gray-500">No hay evaluaciones aplicadas a este estudiante</div>)

    return (
        <>
            <div className="flex flex-col gap-4 overflow-y-auto h-full pr-2 custom-scrollbar">
                {/* Recorre las evaluaciones brindadas y las muestra en lista */}
                {filteredEvaluations.map((evaluation) => (
                    // Usa el componente de tarjeta para mostrar las evaluaciones
                    <EvaluationCard
                        key={evaluation.id}
                        evaluation={evaluation}
                    />
                ))}
            </div>
        </>
    );
};