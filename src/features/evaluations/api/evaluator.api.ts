import { api } from "@/lib/axios";
import type {
    ApiEvaluatorDetail,
    ApiEvaluatorOption,
    GetEvaluatorDetailResponse,
    GetEvaluatorOptionsResponse,
} from "../types";

// Catálogo de evaluadores para el combo (GET /api/evaluators/options)
export const getEvaluatorOptions = async (): Promise<ApiEvaluatorOption[]> => {
    const { data } = await api.get<GetEvaluatorOptionsResponse>("/evaluators/options");
    return data.data ?? [];
};

// Detalle del evaluador elegido: su usuario y sus alumnos asignados (GET /api/evaluators/{id})
export const getEvaluatorDetail = async (id: number): Promise<ApiEvaluatorDetail> => {
    const { data } = await api.get<GetEvaluatorDetailResponse>(`/evaluators/${id}`);
    return data.data;
};

// Perfil del evaluador de un usuario concreto (GET /api/evaluators/by-user/{userId}).
// Se usa solo para saber cuál es el evaluador del usuario autenticado; el detalle activo
// siempre sale de getEvaluatorDetail
export const getEvaluatorByUser = async (userId: number): Promise<ApiEvaluatorDetail> => {
    const { data } = await api.get<GetEvaluatorDetailResponse>(`/evaluators/by-user/${userId}`);
    return data.data;
};
