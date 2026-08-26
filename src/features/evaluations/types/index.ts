export interface EvaluationLike {
    evaluation_id: string;
    titulo_evaluacion: string;
    fecha_creacion: string;
    categoria: string;
    estado: string;
    nombre_alumno: string;
    nombre_tutor: string;
    numero_pruebas: string;
    plantilla_evaluacion: string;
}

export interface StudentLike {
    student_id: string;
    nombre: string;
}

// HTTP Responses

export interface EvaluationCreated {
    status_code: number;
    message:     string;
    data:        EvaluationData;
}

export interface EvaluationUpdated {
    status_code: number;
    message:     string;
    data:        EvaluationData;
}

export interface GetEvaluations {
    status_code: number;
    message: string;
    data: EvaluationData[];
}

export interface GetEvaluation {
    status_code: number;
    message: string;
    data: EvaluationData;
}

// Modelo para los datos de la evaluación

export interface EvaluationData {
    evaluation_id: number;
    student_id: number;
    user_id: number;
    template_id: number;
    result: number;
    items: ItemData[];
    status: string;
    titulo: string;
    type: string;
    updated_at:    Date;
    created_at:    Date;
    id:            number;
}

export interface StudentData {
    student_id: number;
    nombre: string;
    updated_at:    Date;
    created_at:    Date;
    id: number;
}

// Archivo que viene del backend (plantilla)
export interface TemplateFile {
    id: number;
    name: string;
    extension: string;
    pivot: {
        item_version_id: number;
        file_id: number;
        id: number;
    };
}

// Archivo que sube el usuario (respuesta)
export interface ResponseFile {
    resource: File;
    item_version_file_id: number;
}

export interface ItemData {
    item_id: number;
    name: string;
    grade: string;
    comments: string;
    templateFiles: TemplateFile[];   // plantillas
    responseFiles: ResponseFile[];   // respuestas
}

