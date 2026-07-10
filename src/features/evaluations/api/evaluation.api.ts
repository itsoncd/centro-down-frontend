import { api } from "@/lib/axios";
import type { EvaluationCreated, EvaluationData, EvaluationLike, EvaluationUpdated, GetEvaluation, GetEvaluations } from "../types";

// Manda solicitud a la API para crear una evaluación
export const createEvaluation = async (body: EvaluationLike): Promise<EvaluationCreated> => {
    const { data } = await api.post<EvaluationCreated>('/evaluations', body);
    console.log('data: ', data);
    return data;
}

// Manda solicitud para obtener todas las evaluaciones desde la API
export const getAllEvaluations = async (): Promise<GetEvaluations> => {
    const { data } = await api.get<GetEvaluations>('/evaluations');
    console.log('data: ', data);
    return data;
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
