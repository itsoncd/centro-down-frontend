import type { EvaluationData } from "@/features/evaluations/types";
import { create } from "zustand";

type EvaluationStore = {
    selectedEvaluation: EvaluationData | null;
    setSelectedEvaluation: (evaluation: EvaluationData | null) => void;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
    selectedEvaluation: null,
    setSelectedEvaluation: (evaluation) =>
        set({ selectedEvaluation: evaluation }),
}));