import { FilterX } from "lucide-react";
import Button from "@/components/Button";
import { SearchBar } from "@/components/SearchBar";

export interface FilterOption {
    value: string;
    label: string;
}

interface EvaluationsFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string; // "" = todos
    onStatusChange: (value: string) => void;
    type: string; // "" = todos
    onTypeChange: (value: string) => void;
    statusOptions: FilterOption[];
    typeOptions: FilterOption[];
    onClearFilters: () => void;
}

export const EvaluationsFilters = ({
    search,
    onSearchChange,
    status,
    onStatusChange,
    type,
    onTypeChange,
    statusOptions,
    typeOptions,
    onClearFilters,
}: EvaluationsFiltersProps) => {
    const selectClassName = "w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-3">
            <div className="flex flex-wrap items-end gap-3">
                {/* Buscador de evaluaciones por título de la plantilla.
                    El título viene del nombre de la plantilla (evaluation_template.name). */}
                <div className="flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-600 mb-1">Buscar</p>
                    <SearchBar
                        placeholder="Buscar evaluación por título..."
                        value={search}
                        onSearch={onSearchChange}
                        className="w-full"
                    />
                </div>

                {/* Filtro por estado (lo resuelve el servidor con ?status=) */}
                <div className="w-48">
                    <p className="text-sm text-gray-600 mb-1">Estado</p>
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className={selectClassName}>
                        <option value="">Todos los estados</option>
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por tipo de evaluación (se resuelve en el cliente) */}
                <div className="w-48">
                    <p className="text-sm text-gray-600 mb-1">Tipo</p>
                    <select
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className={selectClassName}>
                        <option value="">Todos los tipos</option>
                        {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                {/* Botón para limpiar los filtros */}
                <Button variant="secondary" size="sm" onClick={onClearFilters}>
                    <FilterX size={16} />
                    Limpiar filtros
                </Button>
            </div>
        </div>
    );
};