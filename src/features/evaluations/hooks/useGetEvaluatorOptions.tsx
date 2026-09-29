import { useQuery } from "@tanstack/react-query";
import { getEvaluatorOptions } from "../api/evaluator.api";

// El catálogo completo solo lo piden los roles con privilegio: un evaluador bloqueado
// usa únicamente su propio perfil, que ya viene en by-user
export const useGetEvaluatorOptions = (enabled = true) => {
    const evaluatorOptionsQuery = useQuery({
        queryKey: ["evaluators", "options"],
        queryFn: getEvaluatorOptions,
        enabled,
    });

    return { evaluatorOptionsQuery };
};
