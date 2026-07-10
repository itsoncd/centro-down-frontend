import { useState } from "react"
import type { EvaluationTemplate } from "../types"
import TemplateCard from "../components/TemplateCard"
import { Image, FileText, Paperclip, Plus , X, Pencil, ArrowLeft, Play } from 'lucide-react'

const MOCK_TEMPLATES: EvaluationTemplate[] = [
    {
        id: 1,
        name: 'Evaluación de Lectoescritura',
        description: 'Diagnóstico de Lectoescritura Nivel 1',
        evaluationType: 'Académica',
        calificationType: 'escala_logro',
        instrumentMode: 'personalizado',
        items: [
            { id: 1, description: 'Reconoce las vocales en mayúscula', evidences: [] },
            { id: 2, description: 'Reconoce las vocales en minúscula', evidences: [] },
            { id: 3, description: 'Escribe su nombre completo', evidences: [] },
        ],
        createdAt: '9/5/2026',
    },
    {
        id: 2,
        name: 'Evaluación de Lenguaje Expresivo - Nivel Básico',
        description: '',
        evaluationType: 'Lenguaje',
        calificationType: 'escala_logro',
        instrumentMode: 'precargado',
        items: [
            { id: 1, description: 'Pronuncia palabras simples correctamente', evidences: [] },
            { id: 2, description: 'Forma frases de 2-3 palabras', evidences: [] },
            { id: 3, description: 'Responde a preguntas simples', evidences: [] },
            { id: 4, description: 'Nombra objetos comunes', evidences: [] },
            { id: 5, description: 'Expresa necesidades básicas verbalmente', evidences: [] },
        ],
        createdAt: '9/5/2026',
    },
]

const calificationLabels: Record<string, string> = {
    escala_logro: 'Escala de Logro',
    porcentual: 'Porcentual',
}

const typeColors: Record<string, string> = {
    Académica: 'bg-[#FFF4BD] text-gray-700',
    Lenguaje: 'bg-[#C1E1C1] text-gray-700',
    Psicológica: 'bg-[#DCD0FF] text-gray-700',
}

function MyTemplates() {
    const [templates, setTemplates] = useState<EvaluationTemplate[]>(MOCK_TEMPLATES)
    const [search, setSearch] = useState<string>('')

    const filtered = templates.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
    )

    function handleDelete(id: number) {
        setTemplates(templates.filter(t => t.id !== id))
    }

    return (
        <div className="bg-blue-50 p-6 -m-6 min-h-screen">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1 bg-white hover:bg-gray-50">
                        <ArrowLeft size={14} /> Volver al panel
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Mis Plantillas</h1>
                    <span className="text-sm text-gray-400">{templates.length} plantilla(s) disponible(s)</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700">
                        Filtros
                    </button>
                </div>

                {filtered.length === 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                        <p className="text-sm text-gray-400">No se encontraron plantillas</p>
                    </div>
                )}

                {filtered.map(template => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        typeColors={typeColors}
                        calificationLabels={calificationLabels}
                        onDelete={handleDelete}
                    />
                ))}

            </div>
        </div>
    )
}

export default MyTemplates
