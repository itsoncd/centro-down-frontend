import { useEffect, useState } from "react"
import type { EvaluationType, InstrumentMode, PreloadedInstrument } from "../types"

interface Props {
  evaluationType: EvaluationType
  mode: InstrumentMode
  onModeChange: (mode: InstrumentMode) => void
  selectedInstrument: PreloadedInstrument | null
  onInstrumentChange: (instrument: PreloadedInstrument | null) => void
}

function InstrumentSelector({ evaluationType, mode, onModeChange, selectedInstrument, onInstrumentChange }: Props) {
  const [instruments, setInstruments] = useState<PreloadedInstrument[]>([])
  const [loading, setLoading] = useState(false)

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3NTY0NjY4LCJleHAiOjE3ODc1NjgyNjgsIm5iZiI6MTc4NzU2NDY2OCwianRpIjoib2xhUnlxRXdhUlJPb1BXbiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.qz7n6v8tYHmPNVvb2PsIAiEmf9krLzS4to5A7iWqYXc"

  useEffect(() => {
    async function fetchInstruments() {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:8000/api/evaluation-templates", {
          headers: { "Authorization": `Bearer ${token}` }
        })
        const json = await res.json()
        console.log("Respuesta completa:", json)

        // Extraer los templates desde json.data.data
        const templates = json.data.data.map((version: any) => {
          const tpl = version.evaluation_template
          return {
            id: tpl.id,
            name: tpl.name,
            type: tpl.type,
            calificationType: version.grading_type,
            items: [] // si quieres cargar items después, aquí puedes dejarlos vacíos
          }
        })

        // Filtrar por tipo seleccionado
        const filtered = templates.filter((t: any) => t.type === evaluationType)
        setInstruments(filtered)
      } catch (err) {
        console.error("Error cargando instrumentos:", err)
      } finally {
        setLoading(false)
      }
    }

    if (mode === "precargado") {
      fetchInstruments()
    }
}, [mode, evaluationType])


  function handleModeChange(newMode: InstrumentMode) {
    onModeChange(newMode)
    onInstrumentChange(null)
  }

  async function handleInstrumentChange(id: string) {
    if (!id) {
      onInstrumentChange(null)
      return
    }

    try {
      const res = await fetch(`http://localhost:8000/api/evaluation-templates/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      const json = await res.json()

      const tpl = json.data
      const latestVersion = tpl.versions.find((v: any) => v.latest) || tpl.versions[0]

      const items = latestVersion.item_versions.map((iv: any) => ({
        id: iv.id,
        name: iv.version_name,
        files: [] // si quieres traer evidencias, aquí puedes mapear iv.files
      }))

      onInstrumentChange({
        id: tpl.id,
        name: tpl.name,
        calificationType: latestVersion.grading_type,
        evaluationType: tpl.type,
        items
      })
    } catch (err) {
      console.error("Error cargando instrumento:", err)
    }
  }


  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">2. Seleccionar Instrumento o Crear Personalizado</h2>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="instrumentMode"
            checked={mode === "precargado"}
            onChange={() => handleModeChange("precargado")}
          />
          Usar instrumento precargado
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="instrumentMode"
            checked={mode === "personalizado"}
            onChange={() => handleModeChange("personalizado")}
          />
          Crear evaluación personalizada
        </label>
      </div>

      {mode === "precargado" && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">Instrumento</p>
          {loading ? (
            <p className="text-sm text-gray-500">Cargando...</p>
          ) : (
            <select
              className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedInstrument?.id ?? ""}
              onChange={(e) => handleInstrumentChange(e.target.value)}
            >
              <option value="">Selecciona un instrumento</option>
              {instruments.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  )
}

export default InstrumentSelector
