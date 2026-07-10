import { useState } from "react"
import type { EvaluationItem } from "../types"
import ItemModal from "./ItemModal"
import { Plus , X } from 'lucide-react'

interface Props {
    items: EvaluationItem[]
    onAddItem: (item: EvaluationItem) => void
    onRemoveItem: (id: number) => void
    canRemove?: boolean
    sectionNumber?: number
}

function ItemsSection({ items, onAddItem, onRemoveItem, canRemove = true, sectionNumber = 3 }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
                {sectionNumber}. Ítems a Evaluar
            </h2>

            <p className="text-sm font-medium text-gray-700 mb-2">Agregar Ítem</p>
            <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={16} /> Agregar Ítem con Evidencias
            </button>

            {items.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Ítems ({items.length})</p>
                    <ul className="flex flex-col gap-2">
                        {items.map((item, index) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-2"
                            >
                                <span className="text-sm text-gray-700">
                                    {index + 1}. {item.description}
                                </span>
                                {canRemove && (
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showModal && (
                <ItemModal
                    onAdd={onAddItem}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

export default ItemsSection
