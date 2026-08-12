import React, { useState } from "react"
import type { EvaluationItem } from "../types"
import { Image, FileText, Paperclip } from 'lucide-react'

interface Props {
    onAdd: (item: EvaluationItem) => void
    onClose: () => void
}

function ItemModal({ onAdd, onClose }: Props) {
    const [name, setName] = useState<string>('')
    const [evidences, setEvidences] = useState<File[]>([])

    function handleAddFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setEvidences([...evidences, ...Array.from(e.target.files)])
        }
    }

    function handleAdd() {
        if (name.trim() === '') return
        onAdd({
            id: Date.now(),
            name: name,
            evidences
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Agregar Ítem con Evidencias</h3>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Descripción del Ítem</label>
                        <textarea
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Reconoce las vocales en mayúscula y minúscula"
                            rows={3}
                            className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Evidencias (Fotos, PDFs)</label>
                        <p className="text-xs text-gray-400 mb-2">
                            Adjunta fotografías o documentos que servirán como evidencias para este ítem
                        </p>
                        <div className="flex gap-2">
                            <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                                <Image size={16} /> Adjuntar JPG
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    multiple
                                    hidden
                                    onChange={handleAddFile}
                                />
                            </label>
                            <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                                <FileText size={16} /> Adjuntar PDF
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    hidden
                                    onChange={handleAddFile}
                                />
                            </label>
                        </div>

                        <div className="mt-2 border border-dashed border-gray-200 rounded-lg p-4 min-h-16">
                            {evidences.length === 0 ? (
                                <p className="text-sm text-gray-300 text-center">Sin evidencias adjuntas</p>
                            ) : (
                                <ul className="flex flex-col gap-1">
                                    {evidences.map((file, index) => (
                                        <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                                            <Paperclip size={12} /> {file.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={name.trim() === ''}
                        className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Agregar Ítem
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemModal
