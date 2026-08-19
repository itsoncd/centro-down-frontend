import { useEffect, useState } from "react"
import type { EvaluationTemplate } from "../types"
import TemplateCard from "../components/TemplateCard"
import { Image, FileText, Paperclip, Plus , X, Pencil, ArrowLeft, Play } from 'lucide-react'

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

    const [loading, setLoading] = useState(true);

    const [templates, setTemplates] = useState<EvaluationTemplate[]>([]);

    const [pagination, setPagination] = useState<any>({ 
        currentPage: 1,
        lastPage: 1,
        perPage: 3,
        total: 0});

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US");
    };

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3MTI4Mzg4LCJleHAiOjE3ODcxMzE5ODgsIm5iZiI6MTc4NzEyODM4OCwianRpIjoiZTlJRXFjSG52WFBtWTRrVCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.DQQ9UDQv1xHGxqV8FxumqHiCL9BtmxZxpYnlwuP020I"

    const fetchEvaluationTemplates = (page: number = 1, perPage: number = 5, sortBy: string = "id", direction: string = "desc") => {
        setLoading(true);
        fetch(`http://localhost:8000/api/evaluation-templates/page?page=${page}&per_page=${perPage}&sort_by=${sortBy}&direction=${direction}`, {
            headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                const evaluationTemplateVersions: EvaluationTemplate[] = json.data.data.map((evaluationTemplateVersion: any) => ({
                id: evaluationTemplateVersion.id,
                version_name: evaluationTemplateVersion.version_name,
                evaluationType: evaluationTemplateVersion.evaluation_template.type,
                calificationType: evaluationTemplateVersion.grading_type,
                item_versions: evaluationTemplateVersion.item_versions.map((item_version: any) => ({
                    id: item_version.id,
                    name: item_version.version_name
                })),

                createdAt: formatDate(evaluationTemplateVersion.created_at)
            }));

            setTemplates(evaluationTemplateVersions);
            setPagination({
                currentPage: json.data.current_page,
                lastPage: json.data.last_page,
                perPage: json.data.per_page,
                total: json.data.total
            });
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchEvaluationTemplates();
    }, []);

    const [search, setSearch] = useState<string>('')

    const filtered = templates.filter(t =>
        t.version_name.toLowerCase().includes(search.toLowerCase())
    )

    function handleDelete(id: number) {
        setTemplates(templates.filter(t => t.id !== id))
    }

    if (loading) {
        return <div className="bg-blue-50 p-6 -m-6 min-h-screen">
            <p>Cargando plantillas de evaluación...</p>
        </div> 
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

                <div className="pagination bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700"
                    disabled={pagination.currentPage <= 1}
                    onClick={() => fetchEvaluationTemplates(pagination.currentPage - 1)}
                    >
                    Anterior
                    </button>

                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700"
                    disabled={pagination.currentPage >= pagination.lastPage}
                    onClick={() => fetchEvaluationTemplates(pagination.currentPage + 1)}
                    >
                    Siguiente
                    </button>
                </div>

            </div>

        </div>
    )
}

export default MyTemplates
