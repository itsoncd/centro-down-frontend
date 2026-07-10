import type { EvaluationType } from "../types"

interface Props {
    selected: EvaluationType
    onChange: (type: EvaluationType) => void
}

const types: EvaluationType[] = ['Académica', 'Lenguaje', 'Psicológica']

const descriptions: Record<EvaluationType, string> = {
    Académica: 'Crea una evaluación personalizada para medir conocimientos básicos como letras, números, nombre, edad, etc.',
    Lenguaje: 'Utiliza instrumentos precargados o crea uno personalizado.',
    Psicológica: 'Utiliza instrumentos establecidos como EP13 u otros.',
}

const colors: Record<EvaluationType, string> = {
    Académica: 'bg-[#FFF4BD] text-gray-700',
    Lenguaje: 'bg-[#C1E1C1] text-gray-700',
    Psicológica: 'bg-[#DCD0FF] text-gray-700',
}

function EvaluationTypeSelector({ selected, onChange }: Props) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">1. Tipo de Evaluación</h2>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => onChange(type)}
                        className={`flex-1 py-2 text-sm font-medium transition-colors rounded-full ${
                            selected === type
                                ? colors[type]
                                    : 'bg-white text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Evaluación {selected}: </span>
                {descriptions[selected]}
            </p>
        </div>
    )
}

export default EvaluationTypeSelector
