export type EvaluationType = 'Académica' | 'Lenguaje' | 'Psicológica'

export type CalificationType = 'escala_logro' | 'porcentual'

export type InstrumentMode = 'precargado' | 'personalizado'

export interface EvaluationItem {
    id: number
    name: string
    files: File[]
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
  version_name: string
  description: string
  evaluationType: EvaluationType
  calificationType: CalificationType
  instrumentMode: InstrumentMode
  item_versions: EvaluationItem[]
  createdAt: string
  evaluation_template_id: number
}
