import type { EvaluationData } from "../types";

export const mockEvaluations: EvaluationData[] = [
    {
        id: 1,
        evaluation_id: 101,
        student_id: 1,
        user_id: 1,
        template_id: 1,
        items: [
            {
                item_id: 1,
                name: "Prueba 1",
                grade: "",
                comments: ""
            },
            {
                item_id: 2,
                name: "Prueba 2",
                grade: "",
                comments: ""
            }
        ],
        status: "Pendiente",
        titulo: "Evaluación 04",
        result: 0,
        type: "Académica",
        updated_at: new Date(),
        created_at: new Date("2026-03-22T10:00:00Z"),
    },
    {
        id: 2,
        evaluation_id: 101,
        student_id: 3,
        user_id: 1,
        template_id: 1,
        items: [
            {
                item_id: 1,
                name: "Prueba 1",
                grade: "",
                comments: ""
            },
            {
                item_id: 2,
                name: "Prueba 2",
                grade: "",
                comments: ""
            }
        ],
        status: "Pendiente",
        titulo: "Evaluación 06",
        result: 0,
        type: "Académica",
        updated_at: new Date(),
        created_at: new Date("2026-03-22T10:00:00Z"),
    },
    {
        id: 3,
        evaluation_id: 101,
        student_id: 1,
        user_id: 1,
        template_id: 1,
        items: [
            {
                item_id: 1,
                name: "Prueba 1",
                grade: "",
                comments: ""
            },
            {
                item_id: 2,
                name: "Prueba 2",
                grade: "",
                comments: ""
            },
            {
                item_id: 3,
                name: "Prueba 3",
                grade: "",
                comments: ""
            }
        ],
        status: "En progreso",
        titulo: "Evaluación 07",
        result: 0,
        type: "Académica",
        updated_at: new Date(),
        created_at: new Date("2026-03-22T10:00:00Z"),
    },
    {
        id: 4,
        evaluation_id: 101,
        student_id: 1,
        user_id: 1,
        template_id: 1,
        items: [
            {
                item_id: 1,
                name: "Prueba 1",
                grade: "",
                comments: ""
            }
        ],
        status: "Completado",
        titulo: "Evaluación 05",
        result: 0,
        type: "Académica",
        updated_at: new Date(),
        created_at: new Date("2026-03-22T10:00:00Z"),
    }
];