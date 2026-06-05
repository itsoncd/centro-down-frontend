import type { StudentData } from "../types";

export const mockStudents: StudentData[] = [
    {
        id: 1,
        student_id: 1,
        nombre: "Juan Pérez",
        updated_at: new Date("2026-03-22T10:00:00Z"),
        created_at: new Date(),
    },
    {
        id: 2,
        student_id: 2,
        nombre: "Ana Gómez",
        updated_at: new Date("2026-03-22T10:00:00Z"),
        created_at: new Date(),
    },
    {
        id: 3,
        student_id: 3,
        nombre: "Humberto Gutierrez",
        updated_at: new Date("2026-03-22T10:00:00Z"),
        created_at: new Date(),
    },
]