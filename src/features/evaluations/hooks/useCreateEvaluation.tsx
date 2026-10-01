import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiEvaluation, StoreEvaluationPayload } from "../types";
import { createEvaluation } from "../api/evaluation.api";
import { toast } from "react-toastify";

interface UseCreateEvaluationOptions {
    onSucces?: (evaluation: ApiEvaluation) => void;
    onError?: (error: unknown) => void;
}

export const useCreateEvaluation = ({
    onSucces,
    onError,
}: UseCreateEvaluationOptions = {}) => {
    // Llama al objeto que hace la consulta
    const queryClient = useQueryClient();

    // Maneja la creación de la evaluación
    const evaluationMutation = useMutation({
        mutationKey: ["new-evaluation"],
        mutationFn: (body: StoreEvaluationPayload) => createEvaluation(body),
        onSuccess: (response) => {
            toast.success("Evaluación registrada con éxito!");
            queryClient.invalidateQueries({ queryKey: ["evaluations"] });
            if (onSucces) onSucces(response.data);
        },
        onError: (error) => {
            // La página muestra el detalle del 422 en línea; sin manejador se avisa con un toast
            if (onError) {
                onError(error);
                return;
            }
            toast.error("Hubo un error al registrar la evaluación.");
        },
    });
    return { evaluationMutation };
};
