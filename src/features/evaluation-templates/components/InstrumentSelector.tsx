import type { EvaluationType, InstrumentMode, PreloadedInstrument } from "../types"

interface Props {
    evaluationType: EvaluationType
    mode: InstrumentMode
    onModeChange: (mode: InstrumentMode) => void
    selectedInstrument: PreloadedInstrument | null
    onInstrumentChange: (instrument: PreloadedInstrument | null) => void
}

const PRELOADED_INSTRUMENTS: PreloadedInstrument[] = [
    {
        id: 1,
        name: 'Evaluación de Lenguaje Expresivo - Nivel Básico',
        calificationType: 'escala_logro',
        evaluationType: 'Lenguaje',
        items: [
            { id: 1, description: 'Pronuncia palabras simples correctamente', evidences: [] },
            { id: 2, description: 'Forma frases de 2-3 palabras', evidences: [] },
            { id: 3, description: 'Responde a preguntas simples', evidences: [] },
            { id: 4, description: 'Nombra objetos comunes', evidences: [] },
            { id: 5, description: 'Expresa necesidades básicas verbalmente', evidences: [] },
        ],
    },
    {
        id: 2,
        name: 'Evaluación de Lenguaje Comprensivo',
        calificationType: 'escala_logro',
        evaluationType: 'Lenguaje',
        items: [
            { id: 1, description: 'Sigue instrucciones de un paso', evidences: [] },
            { id: 2, description: 'Sigue instrucciones de dos pasos', evidences: [] },
            { id: 3, description: 'Identifica objetos por nombre', evidences: [] },
            { id: 4, description: 'Comprende conceptos espaciales básicos', evidences: [] },
            { id: 5, description: 'Responde a preguntas de sí/no', evidences: [] },
        ],
    },
    {
        id: 3,
        name: 'EP13 - Evaluación Psicológica Integral',
        calificationType: 'porcentual',
        evaluationType: 'Psicológica',
        items: [
            { id: 1, description: 'Atención sostenida', evidences: [] },
            { id: 2, description: 'Memoria de trabajo', evidences: [] },
            { id: 3, description: 'Control inhibitorio', evidences: [] },
            { id: 4, description: 'Flexibilidad cognitiva', evidences: [] },
            { id: 5, description: 'Planificación', evidences: [] },
        ],
    },
    {
        id: 4,
        name: 'Evaluación Socioemocional',
        calificationType: 'escala_logro',
        evaluationType: 'Psicológica',
        items: [
            { id: 1, description: 'Reconoce emociones básicas', evidences: [] },
            { id: 2, description: 'Interactúa con pares', evidences: [] },
            { id: 3, description: 'Maneja frustración apropiadamente', evidences: [] },
            { id: 4, description: 'Sigue reglas sociales básicas', evidences: [] },
            { id: 5, description: 'Muestra empatía', evidences: [] },
        ],
    },
]

function InstrumentSelector({ evaluationType, mode, onModeChange, selectedInstrument, onInstrumentChange }: Props) {
    const filtered = PRELOADED_INSTRUMENTS.filter(i => i.evaluationType === evaluationType)

    function handleModeChange(newMode: InstrumentMode) {
        onModeChange(newMode)
        onInstrumentChange(null)
    }

    function handleInstrumentChange(id: string) {
        const instrument = filtered.find(i => i.id === Number(id)) || null
        onInstrumentChange(instrument)
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">2. Seleccionar Instrumento o Crear Personalizado</h2>
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="radio"
                        name="instrumentMode"
                        checked={mode === 'precargado'}
                        onChange={() => handleModeChange('precargado')}
                    />
                    Usar instrumento precargado
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="radio"
                        name="instrumentMode"
                        checked={mode === 'personalizado'}
                        onChange={() => handleModeChange('personalizado')}
                    />
                    Crear evaluación personalizada
                </label>
            </div>

            {mode === 'precargado' && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Instrumento</p>
                    <select
                        className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedInstrument?.id ?? ''}
                        onChange={(e) => handleInstrumentChange(e.target.value)}
                    >
                        <option value="">Selecciona un instrumento</option>
                        {filtered.map(i => (
                            <option key={i.id} value={i.id}>{i.name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}

export default InstrumentSelector
