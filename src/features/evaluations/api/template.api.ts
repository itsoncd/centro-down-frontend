import { api } from "@/lib/axios";
import type {
    ApiEvaluationTemplateDetail,
    ApiEvaluationTemplateOption,
    GetEvaluationTemplateDetailResponse,
    GetEvaluationTemplateOptionsResponse,
} from "../types";

// Catálogo de plantillas habilitadas para el combo (GET /api/evaluation-templates/options).
// Cada opción trae el id de la *plantilla*, no el de su versión
export const getEvaluationTemplateOptions = async (): Promise<ApiEvaluationTemplateOption[]> => {
    const { data } = await api.get<GetEvaluationTemplateOptionsResponse>("/evaluation-templates/options");
    return data.data ?? [];
};

// Detalle de la plantilla elegida, con todas sus versiones e ítems
// (GET /api/evaluation-templates/{id})
export const getEvaluationTemplateDetail = async (id: number): Promise<ApiEvaluationTemplateDetail> => {
    const { data } = await api.get<GetEvaluationTemplateDetailResponse>(`/evaluation-templates/${id}`);
    return data.data;
};
