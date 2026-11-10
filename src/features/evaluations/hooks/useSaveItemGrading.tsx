import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { saveInstrumentGrading } from "../api/grading.api";

interface SaveInstrumentGradingVariables {
    instrumentId: number;
    body: FormData;
}

// Saving returns the grading row, not the workspace payload, so the workspace query is
// invalidated instead of patched by hand: the progress bar must come from the server.
export const useSaveItemGrading = (evaluationId: number) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation("evaluations");

    const saveMutation = useMutation({
        mutationFn: ({ instrumentId, body }: SaveInstrumentGradingVariables) =>
            saveInstrumentGrading(evaluationId, instrumentId, body),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["evaluations", evaluationId, "grading"],
            });
            toast.success(t("grading.save.success"));
        },
        onError: (error) => {
            // A 422 carries the field errors the form renders; a toast would duplicate it.
            if (isAxiosError(error) && error.response?.status === 422) return;

            toast.error(t("grading.save.error"));
        },
    });

    return { saveMutation };
};
