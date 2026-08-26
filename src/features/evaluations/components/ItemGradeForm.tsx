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
                    value={item?.grade || "ACHIEVED_ALONE"}
                    onChange={(e) => onChange({ ...item, grade: e.target.value })}
                    className="w-full bg-gray-100 border-transparent rounded-md py-3 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                >
                    <option value="ACHIEVED_ALONE">Logrado solo</option>
                    <option value="ACHIEVED_WITH_HELP">Logrado con ayuda</option>
                    <option value="NOT_ACHIEVED">No logrado</option>
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

            <div className="border border-purple-200 rounded-md p-4">
                {(item.templateFiles ?? []).map((templateFile) => (
                    <div key={templateFile.id} className="mb-4">
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                        Adjuntar Evidencias
                        </label>
                        <p>Archivo: {templateFile.name}.{templateFile.extension}</p>
                        <input className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            const newResponses = [
                                ...(item.responseFiles || []),
                                { resource: file, item_version_file_id: templateFile.pivot.id }
                            ];
                            onChange({ ...item, responseFiles: newResponses });
                            }
                        }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};