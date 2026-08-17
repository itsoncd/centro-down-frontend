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

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3MDA5NDc1LCJleHAiOjE3ODcwMTMwNzUsIm5iZiI6MTc4NzAwOTQ3NSwianRpIjoiR0JxTllDZFlxcEtob3ZUWSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.aTi99RVxtmYFxcyt82UpOxG887Ox7E3QSe1RncqXOf4"

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

  function handleInstrumentChange(id: string) {
    const instrument = instruments.find(i => i.id === Number(id)) || null
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
