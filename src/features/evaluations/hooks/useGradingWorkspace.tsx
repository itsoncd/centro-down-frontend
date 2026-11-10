import { useQuery } from "@tanstack/react-query";
import { getGradingWorkspace } from "../api/grading.api";

// One read feeds both the main panel and the sidebar, so they cannot disagree
// about the current item or the progress percentage.
export const useGradingWorkspace = (evaluationId: number) => {
    const gradingQuery = useQuery({
        queryKey: ["evaluations", evaluationId, "grading"],
        queryFn: () => getGradingWorkspace(evaluationId),
        enabled: Number.isInteger(evaluationId) && evaluationId > 0,
    });

    return { gradingQuery };
};
