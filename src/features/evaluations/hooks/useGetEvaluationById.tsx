import { useQuery } from "@tanstack/react-query";
import { getEvaluationById } from "../api/evaluation.api";

export const useGetEvaluationById = (id: number) => {

    const evaluationQuery = useQuery({
        queryKey: ["evaluations", id],
        queryFn: () => getEvaluationById(id),
    });

    return { evaluationQuery, }
}