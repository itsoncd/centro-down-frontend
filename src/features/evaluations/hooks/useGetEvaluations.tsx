import { useQuery } from "@tanstack/react-query";
import { getAllEvaluations } from "../api/evaluation.api";

export const useGetEvaluations = () => {

    const evaluationQuery = useQuery({
        queryKey: ["evaluations"],
        queryFn: getAllEvaluations,
    });

    return { evaluationQuery, }
}