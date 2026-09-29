import { useQuery } from "@tanstack/react-query";
import { getEvaluatorDetail } from "../api/evaluator.api";

// Detalle del evaluador activo: trae su user_id y sus alumnos asignados
export const useGetEvaluatorDetail = (evaluatorId: number | "") => {
    const evaluatorDetailQuery = useQuery({
        queryKey: ["evaluators", evaluatorId],
        queryFn: () => getEvaluatorDetail(Number(evaluatorId)),
        enabled: evaluatorId !== "",
    });

    return { evaluatorDetailQuery };
};
