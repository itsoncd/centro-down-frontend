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
    statusCode: number;
    message:     string;
    data:        EvaluationData;
    timestamp?:  string;
}

export interface EvaluationUpdated {
    statusCode: number;
    message:     string;
    data:        EvaluationData;
    timestamp?:  string;
}

// Lista paginada que consume la UI (los elementos ya vienen adaptados)
export interface PaginatedEvaluations {
    current_page: number;
    data: EvaluationData[];
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: ApiPaginatorLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface GetEvaluations {
    statusCode: number;
    message: string;
    data: PaginatedEvaluations;
    timestamp?: string;
}

export interface GetEvaluation {
    statusCode: number;
    message: string;
    data: EvaluationData;
    timestamp?: string;
}

// Filtros y paginación que acepta GET /api/evaluations (GetEvaluationsRequest).
// Ojo: `user_id` quedó prohibido (422); el filtro por evaluador ahora es `evaluator_id`
export interface GetEvaluationsParams {
    student_id?: number;
    status?: EvaluationStatus;
    evaluator_id?: number;                // evaluations.user_id
    evaluation_template_type?: string;    // coincidencia exacta con evaluation_templates.type
    evaluation_template_name?: string;    // coincidencia parcial (LIKE %valor%)
    page?: number;                        // desde 1 (1 por defecto)
    per_page?: number;                    // 1..100 (10 por defecto)
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
    student?: StudentData;           // estudiante relacionado (lo entrega el listado de la API)
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

// ==========================================================
// Respuestas crudas de la API (snake_case, docs/evaluations.md)
// ==========================================================

export type EvaluationStatus = "PENDING" | "CLOSED" | "CANCELLED";

export interface ApiStudent {
    id: number;
    name: string;
    school_id: string;
    birth_date: string;
    phone: string;
    age: number;
    created_at: string;
    updated_at: string;
}

export interface ApiEvaluator {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    confirmed: boolean;
    isActive: boolean;
    isVerified: boolean;
    created_at: string;
    updated_at: string;
}

export interface ApiEvaluationTemplate {
    id: number;
    name: string;
    type: string;
    disabled: boolean;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface ApiItemVersionFile {
    id: number;
    directory: string;
    name: string;
    extension: string;
    pivot: {
        id: number;
        item_version_id: number;
        file_id: number;
    };
}

export interface ApiItemVersion {
    id: number;
    item_id: number;
    version: string;
    version_name: string;
    latest: boolean;
    created_at: string;
    updated_at: string;
    files?: ApiItemVersionFile[];
}

export interface ApiEvaluationTemplateVersion {
    id: number;
    evaluation_template_id: number;
    grading_type: string;
    version: string;
    version_name: string;
    latest: boolean;
    created_at: string;
    updated_at: string;
    evaluation_template?: ApiEvaluationTemplate | null;
    item_versions?: ApiItemVersion[];
}

export interface ApiEvaluation {
    id: number;
    result: string;
    status: EvaluationStatus | null;
    close_date: string | null;
    student_id: number;
    user_id: number;
    evaluation_template_version_id: number;
    deleted: boolean;
    created_at: string;
    updated_at: string;
    student?: ApiStudent | null;
    evaluator?: ApiEvaluator | null;
    evaluation_template_version?: ApiEvaluationTemplateVersion | null;
}

export interface ApiPaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Paginador de Laravel: los elementos de la lista viven en data.data
export interface ApiPaginator<T> {
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: ApiPaginatorLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface ApiSuccessResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

export type GetEvaluationsResponse = ApiSuccessResponse<ApiPaginator<ApiEvaluation>>;