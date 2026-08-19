import { useState } from "react"
import type { CalificationType, EvaluationItem, EvaluationType, InstrumentMode, PreloadedInstrument } from "../types"
import EvaluationTypeSelector from "../components/EvaluationTypeSelector"
import InstrumentSelector from "../components/InstrumentSelector"
import TemplateConfigForm from "../components/TemplateConfigForm"
import ItemsSection from "../components/ItemsSection"
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from "react-router-dom";

function CreateEvaluationTemplate() {
    const navigate = useNavigate();

    const [type, setType] = useState<EvaluationType>('Académica')
    const [instrumentMode, setInstrumentMode] = useState<InstrumentMode>('personalizado')
    const [selectedInstrument, setSelectedInstrument] = useState<PreloadedInstrument | null>(null)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [gradingType, setGradingType] = useState<CalificationType>('escala_logro')
    const [items, setItems] = useState<EvaluationItem[]>([])
    
    const isAcademica = type === 'Académica'
    const isPrecargado = instrumentMode === 'precargado' && selectedInstrument !== null
    const configSectionNumber = isAcademica ? 2 : 3
    const itemsSectionNumber = isAcademica ? 3 : 4
    
    function handleEvaluationTypeChange(type: EvaluationType) {
        setType(type)
        setInstrumentMode('personalizado')
        setSelectedInstrument(null)
        setName('')
        setDescription('')
        setGradingType('escala_logro')
        setItems([])
    }
    
    function handleInstrumentChange(instrument: PreloadedInstrument | null) {
        setSelectedInstrument(instrument)
        if (instrument) {
            setName(instrument.name)
            setGradingType(instrument.calificationType)
            setItems(instrument.items)
        } else {
            setName('')
            setGradingType('escala_logro')
            setItems([])
        }
    }

    function handleAddItem(item: EvaluationItem) {
        setItems([...items, { ...item, files: item.files || [] }])
    }


    function handleRemoveItem(id: number) {
        setItems(items.filter(i => i.id !== id))
    }

    function buildFormData(payload: any): FormData {
        const formData = new FormData();

        // Template
        formData.append("template[name]", payload.template.name);
        formData.append("template[type]", payload.template.type);
        formData.append("template[grading_type]", payload.template.grading_type);

        // Items
        payload.items.forEach((item: any, index: number) => {
            if (item.id && !String(item.id).startsWith("1787")) {
            // items precargados
            formData.append(`items[${index}][id]`, item.id);
            }
            if (item.name) {
            formData.append(`items[${index}][name]`, item.name);
            }
            if (item.files && item.files.length > 0) {
            item.files.forEach((file: File) => {
                formData.append(`items[${index}][files][]`, file);
            });
            }
        });

        console.log([...formData.entries()]);

        return formData;
        }



    const handleSubmit = async () => {
        try {
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3MTI4Mzg4LCJleHAiOjE3ODcxMzE5ODgsIm5iZiI6MTc4NzEyODM4OCwianRpIjoiZTlJRXFjSG52WFBtWTRrVCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.DQQ9UDQv1xHGxqV8FxumqHiCL9BtmxZxpYnlwuP020I"

            let url = ""
            if (isPrecargado && selectedInstrument) {
            // Crear nueva versión del template existente
            url = `http://localhost:8000/api/evaluation-templates/${selectedInstrument.id}/versions`
            } else {
            // Crear template nuevo
            url = "http://localhost:8000/api/evaluation-templates/full"
            }


            // Construir el objeto template
            const evaluationTemplate = {
            name,
            type,
            grading_type: gradingType,
            };

            const payload = {
                template: evaluationTemplate,
                items
            }


            console.log("Payload a enviar:", payload);

            const res = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: buildFormData(payload) // función que convierte JSON + files a FormData
            });

            const data = await res.json();
            console.log("Guardado con éxito:", data);
            navigate("mis-plantillas");
        } catch (err) {
            console.error(err);
        }
        };



    return (
        <div className="bg-blue-50 p-6 -m-6 min-h-screen">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1 bg-white hover:bg-gray-50">
                        <ArrowLeft size={14} /> Volver al panel
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Crear Plantilla de Evaluación</h1>
                </div>
                    
                <EvaluationTypeSelector
                    selected={type}
                    onChange={handleEvaluationTypeChange}
                />
            
                {!isAcademica && (
                    <InstrumentSelector
                        evaluationType={type}
                        mode={instrumentMode}
                        onModeChange={setInstrumentMode}
                        selectedInstrument={selectedInstrument}
                        onInstrumentChange={handleInstrumentChange}
                    />
                )}
            
                <TemplateConfigForm
                    name={name}
                    description={description}
                    calificationType={gradingType}
                    onNameChange={setName}
                    onDescriptionChange={setDescription}
                    onCalificationChange={setGradingType}
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
                    <button onClick={handleSubmit} className="flex-1 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Crear Plantilla
                    </button>
                </div>
        
            </div>
        </div>
    )
}

export default CreateEvaluationTemplate
