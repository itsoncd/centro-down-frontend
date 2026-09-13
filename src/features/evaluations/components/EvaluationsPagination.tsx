import Button from "@/components/Button";

interface EvaluationsPaginationProps {
    currentPage: number;
    lastPage: number;
    from: number | null;
    to: number | null;
    total: number;
    perPage: number;
    perPageOptions: number[];
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
}

export const EvaluationsPagination = ({
    currentPage,
    lastPage,
    from,
    to,
    total,
    perPage,
    perPageOptions,
    onPageChange,
    onPerPageChange,
}: EvaluationsPaginationProps) => {
    const selectClassName = "border border-gray-200 rounded-lg p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

    // El paginador devuelve from/to en null cuando la página no tiene elementos
    const rangeLabel = total === 0 || from === null || to === null
        ? "Sin evaluaciones"
        : `Mostrando ${from}-${to} de ${total}`;

    // La última página siempre es al menos 1, incluso sin resultados
    const lastPageSafe = Math.max(lastPage, 1);

    return (
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600 font-medium">{rangeLabel}</p>

            <div className="flex flex-wrap items-center gap-3">
                {/* Tamaño de página: la API acepta de 1 a 100 (10 por defecto) */}
                <label className="flex items-center gap-2 text-sm text-gray-600">
                    Por página
                    <select
                        value={perPage}
                        onChange={(e) => onPerPageChange(Number(e.target.value))}
                        className={selectClassName}>
                        {perPageOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}>
                    Anterior
                </Button>

                <span className="text-sm text-gray-600 font-medium">
                    Página {currentPage} de {lastPageSafe}
                </span>

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage >= lastPageSafe}
                    onClick={() => onPageChange(currentPage + 1)}>
                    Siguiente
                </Button>
            </div>
        </div>
    );
};
