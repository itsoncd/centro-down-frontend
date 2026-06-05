import type { ItemData } from "../types";

interface ItemGradeFormProps {
    item: ItemData;
    onChange: (updatedItem: ItemData) => void;
}

export const ItemGradeForm = ({ item, onChange }: ItemGradeFormProps) => {
    return(
        <div className="space-y-4">
            <div className="border border-purple-200 rounded-md p-4">
                <label className="block text-sm font-bold text-gray-900 mb-2">
                    {item?.name}
                </label>
                <select 
                    value={item?.grade || "en_proceso"}
                    onChange={(e) => onChange({ ...item, grade: e.target.value })}
                    className="w-full bg-gray-100 border-transparent rounded-md py-3 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                >
                    <option value="logrado">Logrado</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="apoyo_visual">Requiere apoyo visual</option>
                    <option value="apoyo_fisico">Requiere apoyo fisico</option>
                    <option value="no_logrado">No logrado</option>
                </select>
            </div>

            <div className="border border-purple-200 rounded-md p-4">
                <label className="block text-sm font-bold text-gray-900 mb-2">
                    Observaciones
                </label>
                <textarea
                    value={item?.comments || ""}
                    onChange={(e) => onChange({ ...item, comments: e.target.value })}
                    className="w-full bg-transparent border border-gray-200 rounded-md p-3 text-sm text-gray-700 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Escribe observaciones específicas sobre esta evaluación."
                ></textarea>
            </div>
        </div>
    );
};