import type { CalificationType, PreloadedInstrument } from "../types"

interface Props {
    name: string
    description: string
    calificationType: CalificationType
    onNameChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onCalificationChange: (value: CalificationType) => void
    disabled?: boolean
    preloadedInstrument?: PreloadedInstrument | null
    sectionNumber?: number
}

const calificationDescriptions: Record<CalificationType, string> = {
    escala_logro: 'Cada ítem se evaluará como logrado o no logrado, y si lo hizo solo o con ayuda.',
    porcentual: 'Se asignará un porcentaje de conocimiento basado en los resultados.',
}

const calificationOptions: { value: CalificationType; label: string }[] = [
    { value: 'escala_logro', label: 'Escala de Logro\n(Logró/No logrado/Con ayuda)' },
    { value: 'porcentual', label: 'Porcentual\n(Ej. 100% de conocimiento)' },
]

function TemplateConfigForm({
    name,
    description,
    calificationType,
    onNameChange,
    onDescriptionChange,
    onCalificationChange,
    disabled = false,
    preloadedInstrument = null,
    sectionNumber = 2,
}: Props) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
                {sectionNumber}. Configurar Plantilla
            </h2>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Nombre del Instrumento</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        disabled={disabled}
                        placeholder="Ej: Evaluación Hawái, EP13, Lectoescritura Básica"
                        className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    {!disabled && (
                        <p className="text-xs text-gray-400 mt-1">
                            Este nombre identificará la plantilla que podrás aplicar a diferentes alumnos
                        </p>
                    )}
                </div>

                <div className="flex gap-2 mt-1">
                    {calificationOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => !disabled && onCalificationChange(option.value)}
                            className={`flex-1 py-3 text-sm font-medium rounded-full whitespace-pre-line transition-colors ${
                                calificationType === option.value
                                    ? option.value === 'escala_logro'
                                        ? 'bg-[#FFF4BD] text-gray-700'
                                        : 'bg-[#C1E1C1] text-gray-700'
                                    : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-100'
                            } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TemplateConfigForm
