import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvaluation } from "../api/evaluation.api";
import type { EvaluationData } from "../types";
import { toast } from "react-toastify";

interface UpdateProps {
    id: number;
    body: EvaluationData;
}

export const useUpdateEvaluation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: UpdateProps) => updateEvaluation(id, body),
        onSuccess: () => {
            toast.success("Evaluación actualizada con éxito.");
            queryClient.invalidateQueries({ queryKey: ["evaluations"] });
        },
        onError: () => {
            toast.error("Error al actualizar la evaluación.");
        },
    });
}
