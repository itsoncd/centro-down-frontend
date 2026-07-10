import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EvaluationLike } from "../types";
import { createEvaluation } from "../api/evaluation.api";
import { toast } from "react-toastify";
import { useEvaluationStore } from "@/store/evaluation.store";

interface UseCreateEvaluationOptions {
    onSucces?: () => void;
}

export const useCreateEvaluation = ({
    onSucces,
}: UseCreateEvaluationOptions) => {
    // Llama al objeto que hace la consulta
    const queryClient = useQueryClient();
    const { setSelectedEvaluation } = useEvaluationStore();

    // Maneja la creación de la evaluación
    const evaluationMutation = useMutation({
        mutationKey: ["new-evaluation"],
        mutationFn: (body: EvaluationLike) => createEvaluation(body),
        onSuccess: (response) => {
            console.log();
            toast.success("Evaluación registrada con éxito!");
            queryClient.invalidateQueries({ queryKey: ["evaluations"] });
            if (onSucces) onSucces();
            setSelectedEvaluation(response.data);
            return;
        },
        onError: (error) => {
            console.log("Error al registrar una evaluación - hook.");
            console.log(error);
            toast.error("Hubo un error al registrar la evaluación.");
            return;
        },
    });
    return { evaluationMutation };
};