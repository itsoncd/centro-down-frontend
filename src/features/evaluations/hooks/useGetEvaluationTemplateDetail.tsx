import { useQuery } from "@tanstack/react-query";
import { getEvaluationTemplateDetail } from "../api/template.api";

// El detalle se pide solo cuando hay una plantilla elegida
export const useGetEvaluationTemplateDetail = (templateId: number | "") => {
    const templateDetailQuery = useQuery({
        queryKey: ["evaluation-templates", templateId],
        queryFn: () => getEvaluationTemplateDetail(Number(templateId)),
        enabled: templateId !== "",
    });

    return { templateDetailQuery };
};
