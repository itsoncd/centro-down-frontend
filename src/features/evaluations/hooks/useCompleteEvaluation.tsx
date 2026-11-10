import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { completeEvaluation } from "../api/evaluation.api";

// Marks the evaluation COMPLETED. Invalidating ["evaluations"] covers both the listing
// and the grading workspace key, and `onCompleted` drives the navigation back.
export const useCompleteEvaluation = (onCompleted?: () => void) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation("evaluations");

    const completeMutation = useMutation({
        mutationFn: (evaluationId: number) => completeEvaluation(evaluationId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["evaluations"] });
            toast.success(t("grading.finish.success"));
            onCompleted?.();
        },
        onError: () => {
            toast.error(t("grading.finish.error"));
        },
    });

    return { completeMutation };
};
