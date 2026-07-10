import { useState } from "react"
import type { CalificationType, EvaluationItem, EvaluationType, InstrumentMode, PreloadedInstrument } from "../types"
import EvaluationTypeSelector from "../components/EvaluationTypeSelector"
import InstrumentSelector from "../components/InstrumentSelector"
import TemplateConfigForm from "../components/TemplateConfigForm"
import ItemsSection from "../components/ItemsSection"
import { ArrowLeft } from 'lucide-react'

const MOCK_TEMPLATE = {
    evaluationType: 'Académica' as EvaluationType,
    instrumentMode: 'personalizado' as InstrumentMode,
    name: 'Evaluación de Lectoescritura',
    description: 'Diagnóstico de Lectoescritura Nivel 1',
    calificationType: 'escala_logro' as CalificationType,
    items: [
        { id: 1, description: 'Reconoce las vocales en mayúscula', evidences: [] },
        { id: 2, description: 'Reconoce las vocales en minúscula', evidences: [] },
    ],
}

function EditEvaluationTemplate() {
    const [evaluationType] = useState<EvaluationType>(MOCK_TEMPLATE.evaluationType)
    const [instrumentMode] = useState<InstrumentMode>(MOCK_TEMPLATE.instrumentMode)
    const [selectedInstrument] = useState<PreloadedInstrument | null>(null)
    const [name, setName] = useState<string>(MOCK_TEMPLATE.name)
    const [description, setDescription] = useState<string>(MOCK_TEMPLATE.description)
    const [calificationType, setCalificationType] = useState<CalificationType>(MOCK_TEMPLATE.calificationType)
    const [items, setItems] = useState<EvaluationItem[]>(MOCK_TEMPLATE.items)
    
    const isAcademica = evaluationType === 'Académica'
    const isPrecargado = instrumentMode === 'precargado' && selectedInstrument !== null
    const configSectionNumber = isAcademica ? 2 : 3
    const itemsSectionNumber = isAcademica ? 3 : 4
    
    function handleAddItem(item: EvaluationItem) {
        setItems([...items, item])
    }

    function handleRemoveItem(id: number) {
        setItems(items.filter(i => i.id !== id))
    }

    return (
        <div className="bg-blue-50 p-6 -m-6 min-h-screen">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1 bg-white hover:bg-gray-50">
                        <ArrowLeft size={14} /> Volver al panel
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Editar Plantilla de Evaluación</h1>
                </div>
                
                <EvaluationTypeSelector
                    selected={evaluationType}
                    onChange={() => {}}
                />
                
                {!isAcademica && (
                    <InstrumentSelector
                        evaluationType={evaluationType}
                        mode={instrumentMode}
                        onModeChange={() => {}}
                        selectedInstrument={selectedInstrument}
                        onInstrumentChange={() => {}}
                    />
                )}
                
                <TemplateConfigForm
                    name={name}
                    description={description}
                    calificationType={calificationType}
                    onNameChange={setName}
                    onDescriptionChange={setDescription}
                    onCalificationChange={setCalificationType}
                    disabled={isPrecargado}
                    preloadedInstrument={selectedInstrument}
                    sectionNumber={configSectionNumber}
                />

                <ItemsSection
                    items={items}
                    onAddItem={handleAddItem}
                    onRemoveItem={handleRemoveItem}
                    canRemove={!isPrecargado}
                    sectionNumber={itemsSectionNumber}
                />

                <div className="flex gap-3">
                    <button className="flex-1 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                            Cancelar
                    </button>
                    <button className="flex-1 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Guardar cambios
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditEvaluationTemplate
