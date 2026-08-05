import type { EvaluationTemplate } from "../types"
import { X, Pencil, Play } from 'lucide-react'

interface Props {
    template: EvaluationTemplate
    typeColors: Record<string, string>
    calificationLabels: Record<string, string>
    onDelete: (id: number) => void
}

function TemplateCard({ template, typeColors, calificationLabels, onDelete }: Props) {
    const previewItems = template.item_versions?.slice(0, 3)
    const remaining = template.item_versions?.length - 3

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800">{template.version_name}</h3>
                <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(template.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${typeColors[template.evaluationType]}`}>
                    {template.evaluationType}
                </span>
                {template.instrumentMode === 'precargado' && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600">
                        Instrumento Precargado
                    </span>
                )}
                <span className="text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600">
                    {calificationLabels[template.calificationType]}
                </span>
            </div>

            <div className="flex gap-6 mb-4 text-sm text-gray-500">
                <div>
                    <p className="text-xs text-gray-400">Ítems</p>
                    <p className="font-semibold text-gray-700">{template.item_versions?.length} ítems</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Fecha de creación</p>
                    <p className="font-semibold text-gray-700">{template.createdAt}</p>
                </div>
            </div>

            {template.item_versions?.length > 0 && (
                <div className="border border-gray-100 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-2">Vista previa de ítems:</p>
                    <ul className="flex flex-col gap-1">
                        {previewItems.map((item, index) => (
                            <li key={item.id} className="text-sm text-gray-600">
                                {index + 1}. {item.name}
                            </li>
                        ))}
                        {remaining > 0 && (
                            <li className="text-sm text-gray-400 italic">... y {remaining} más</li>
                        )}
                    </ul>
                </div>
            )}

            <button className="mt-4 w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <Play size={16} /> Aplicar a Alumno
            </button>
        </div>
    )
}

export default TemplateCard
