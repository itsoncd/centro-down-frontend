import type { StudentData } from "@/features/evaluations/types";
import { create } from "zustand";

type StudentStore = {
    selectedStudent: StudentData | null;
    setSelectedStudent: (student: StudentData | null) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
    selectedStudent: null,
    setSelectedStudent: (student) => set({ selectedStudent: student }),
}));