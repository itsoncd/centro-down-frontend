import { useQuery } from "@tanstack/react-query";
import { getEvaluationTemplateOptions } from "../api/template.api";

export const useGetEvaluationTemplateOptions = () => {
    const templateOptionsQuery = useQuery({
        queryKey: ["evaluation-templates", "options"],
        queryFn: getEvaluationTemplateOptions,
    });

    return { templateOptionsQuery };
};
