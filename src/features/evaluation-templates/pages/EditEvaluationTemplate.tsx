import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import type { EvaluationTemplate, CalificationType, EvaluationItem, EvaluationType, InstrumentMode, PreloadedInstrument } from "../types"
import EvaluationTypeSelector from "../components/EvaluationTypeSelector"
import InstrumentSelector from "../components/InstrumentSelector"
import TemplateConfigForm from "../components/TemplateConfigForm"
import ItemsSection from "../components/ItemsSection"
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from "react-router-dom";

function EditEvaluationTemplate() {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3NTI5ODE5LCJleHAiOjE3ODc1MzM0MTksIm5iZiI6MTc4NzUyOTgxOSwianRpIjoiR1d3cmZ1OFJTTE5tejFnSiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.jYiCu_T4FMyFG5-nEX-lvWIE_7mADLmdVG8RD5GMO14"
  const navigate = useNavigate();
  const { id } = useParams();
  const [template, setTemplate] = useState<EvaluationTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados editables
  const [evaluationType, setEvaluationType] = useState<EvaluationType>("Académica");
  const [instrumentMode, setInstrumentMode] = useState<InstrumentMode>("personalizado");
  const [selectedInstrument, setSelectedInstrument] = useState<PreloadedInstrument | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [calificationType, setCalificationType] = useState<CalificationType>("porcentual");
  const [items, setItems] = useState<EvaluationItem[]>([]);

  useEffect(() => {

  async function fetchTemplate() {
    try {
      // Paso 1: traer el template completo
      const res = await fetch(`http://localhost:8000/api/evaluation-templates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      const tpl = json.data;

      setTemplate(tpl);

      // Seleccionar la versión más reciente
      const latestVersion = tpl.versions.find((v: any) => v.latest) || tpl.versions[0];

      // Actualizar estados
      setEvaluationType(tpl.type ?? "Académica");
      setInstrumentMode("personalizado");
      setName(tpl.name ?? "");
      setDescription(tpl.description ?? "");
      setCalificationType(latestVersion.grading_type ?? "porcentual");
      setItems(
        (latestVersion.item_versions ?? []).map((iv: any) => ({
            id: iv.id,
            name: iv.version_name,
            files: [],
        }))
        );


      setLoading(false);
    } catch (err) {
      console.error("Error cargando plantilla:", err);
    }
  }

  fetchTemplate();
}, [id]);

    
    const isAcademica = evaluationType === 'Académica'
    const isPrecargado = instrumentMode === 'precargado' && selectedInstrument !== null
    const configSectionNumber = isAcademica ? 2 : 3
    const itemsSectionNumber = isAcademica ? 3 : 4
    
    function handleAddItem(item: EvaluationItem) {
        setItems([...items, item])
    }

    function handleRemoveItem(id: number) {
        setItems(items.filter((i) => i.id !== id));
    }

    function goBack() {
        navigate("/director/plantillas/mis-plantillas");
    }

    async function handleUpdate() {
        const formData = new FormData();

        // Campos del template
        formData.append("name", name);
        formData.append("type", evaluationType);
        formData.append("grading_type", calificationType);

        items.forEach((item, index) => {
        if (!item.isNew && item.id && Number.isInteger(item.id)) {
            // Item existente
            formData.append(`items[${index}][id]`, item.id.toString());
        } else {
            // Item nuevo
            formData.append(`items[${index}][name]`, item.name);

            if (item.files && item.files.length > 0) {
            item.files.forEach((file: File, fIndex: number) => {
                formData.append(`items[${index}][files][${fIndex}]`, file);
            });
            }
        }
        });



        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }


        try {
            formData.append("_method", "PUT");

            const res = await fetch(
                `http://localhost:8000/api/evaluation-templates/${template?.id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const json = await res.json();

            if (res.ok) {
            console.log("Plantilla actualizada:", json);
            alert("Plantilla actualizada exitosamente");
            goBack();
            } else {
            console.error("Error al actualizar:", json);
            alert("Error al actualizar la plantilla");
            }
        } catch (err) {
            console.error("Error de red:", err);
            alert("Error de red al actualizar la plantilla");
        }
    }

    if (loading) return <p>Cargando...</p>;
    if (!template) return <p>No hay plantilla...</p>;

    

    return (
        <div className="bg-blue-50 p-6 -m-6 min-h-screen">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <button onClick={goBack} className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1 bg-white hover:bg-gray-50">
                        <ArrowLeft size={14} /> Volver al panel
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Editar Plantilla de Evaluación</h1>
                </div>
                
                <EvaluationTypeSelector
                    selected={evaluationType}
                    onChange={() => {}}
                />
                
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
                    <button onClick={goBack} className="flex-1 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                            Cancelar
                    </button>
                    <button onClick={handleUpdate} className="flex-1 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Guardar cambios
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditEvaluationTemplate
