import type {
    ApiEvaluation,
    ApiStudent,
    EvaluationData,
    ItemData,
    StudentData,
} from "../types";

// Convierte el estudiante que devuelve la API al modelo que usa la UI
export const mapApiStudentToStudentData = (student: ApiStudent): StudentData => ({
    id: student.id,
    student_id: student.id,
    nombre: student.name,
    created_at: new Date(student.created_at),
    updated_at: new Date(student.updated_at),
});

// Convierte una evaluación de la API al modelo que consumen las tarjetas
export const mapApiEvaluationToEvaluationData = (
    evaluation: ApiEvaluation
): EvaluationData => {
    const version = evaluation.evaluation_template_version ?? null;
    const template = version?.evaluation_template ?? null;

    const items: ItemData[] = (version?.item_versions ?? []).map((itemVersion) => ({
        item_id: itemVersion.id,
        name: itemVersion.version_name,
        grade: "",
        comments: "",
        templateFiles: itemVersion.files ?? [],
        responseFiles: [],
    }));

    return {
        id: evaluation.id,
        evaluation_id: evaluation.id,
        student_id: evaluation.student_id,
        user_id: evaluation.user_id,
        template_id: version?.evaluation_template_id ?? 0,
        items,
        status: evaluation.status ?? "",
        titulo: template?.name ?? `Evaluación ${evaluation.id}`,
        result: Number(evaluation.result ?? 0) || 0,
        type: template?.type ?? "Sin tipo",
        student: evaluation.student
            ? mapApiStudentToStudentData(evaluation.student)
            : undefined,
        updated_at: new Date(evaluation.updated_at),
        created_at: new Date(evaluation.created_at),
    };
};

// Obtiene la lista de estudiantes únicos que aparecen en las evaluaciones
export const collectStudentsFromEvaluations = (
    evaluations: EvaluationData[]
): StudentData[] => {
    const byId = new Map<number, StudentData>();

    for (const evaluation of evaluations) {
        const student = evaluation.student;
        if (student && !byId.has(student.id)) {
            byId.set(student.id, student);
        }
    }

    return [...byId.values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
};
