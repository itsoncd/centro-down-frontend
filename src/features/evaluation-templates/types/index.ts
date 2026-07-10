export type EvaluationType = 'Académica' | 'Lenguaje' | 'Psicológica'

export type CalificationType = 'escala_logro' | 'porcentual'

export type InstrumentMode = 'precargado' | 'personalizado'

export interface EvaluationItem {
    id: number
    description: string
    evidences: File[]
}

export interface PreloadedInstrument {
    id: number
    name: string
    calificationType: CalificationType
    items: EvaluationItem[]
    evaluationType: EvaluationType
}

export interface EvaluationTemplate {
    id: number
    name: string
    description: string
    evaluationType: EvaluationType
    calificationType: CalificationType
    instrumentMode: InstrumentMode
    items: EvaluationItem[]
    createdAt: string
}
