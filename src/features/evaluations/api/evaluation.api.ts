import { api } from "@/lib/axios";
import type { EvaluationCreated, EvaluationData, EvaluationLike, EvaluationUpdated, GetEvaluation, GetEvaluations, GetEvaluationsParams, GetEvaluationsResponse } from "../types";
import { mapApiEvaluationToEvaluationData } from "../utils/evaluationMapper";

// Manda solicitud a la API para crear una evaluación
export const createEvaluation = async (body: EvaluationLike): Promise<EvaluationCreated> => {
    const { data } = await api.post<EvaluationCreated>('/evaluations', body);
    console.log('data: ', data);
    return data;
}

// Manda solicitud para obtener las evaluaciones desde la API ( filtradas y paginadas ).
// Los filtros y la paginación (student_id, status, evaluator_id, evaluation_template_type,
// evaluation_template_name, page, per_page) viajan como query params
export const getAllEvaluations = async (params?: GetEvaluationsParams): Promise<GetEvaluations> => {
    const { data } = await api.get<GetEvaluationsResponse>('/evaluations', { params });
    // La respuesta es un paginador de Laravel: se adaptan sus elementos al modelo de la UI
    const paginator = data.data;
    return {
        ...data,
        data: {
            ...paginator,
            data: Array.isArray(paginator?.data) ? paginator.data.map(mapApiEvaluationToEvaluationData) : [],
        },
    };
}

// Manda solicitud para obtener una evaluación con un ID especifico
export const getEvaluationById = async (id: number): Promise<GetEvaluation> => {
    const { data } = await api.get<GetEvaluation>(`/evaluations/${id}`);
    console.log('data: ', data);
    return data;
}

// Manda solicitud para actualizar una evaluación en la API
export const updateEvaluation = async (
    id: number,
    body: EvaluationData
) => {
    const { data } = await api.put<EvaluationUpdated>(`/evaluations/${id}`, body);
    console.log('Evaluacion actualizada: ', data);
    return data;
}
