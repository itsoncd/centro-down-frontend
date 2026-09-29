import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getEvaluatorByUser } from "../api/evaluator.api";

// Perfil de evaluador del usuario autenticado, para preseleccionarlo.
// Un 404 significa que el usuario no tiene perfil: no es un error, es "sin evaluador por defecto"
export const useGetEvaluatorByUser = (userId: number | "") => {
    const myEvaluatorQuery = useQuery({
        queryKey: ["evaluators", "by-user", userId],
        queryFn: async () => {
            try {
                return await getEvaluatorByUser(Number(userId));
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        },
        enabled: userId !== "",
    });

    return { myEvaluatorQuery };
};
