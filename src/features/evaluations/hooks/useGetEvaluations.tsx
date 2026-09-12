import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllEvaluations } from "../api/evaluation.api";
import type { GetEvaluationsParams } from "../types";

export const useGetEvaluations = (params?: GetEvaluationsParams) => {

    const evaluationQuery = useQuery({
        // Sin filtros la llave es ["evaluations", {}], la misma que la consulta de referencia
        queryKey: ["evaluations", params ?? {}],
        queryFn: () => getAllEvaluations(params),
        // Mantiene la lista anterior mientras llega la respuesta del nuevo filtro
        placeholderData: keepPreviousData,
    });

    return { evaluationQuery, }
}