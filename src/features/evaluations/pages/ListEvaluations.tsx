import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { useStudentStore } from "@/store";
import { useDebouncedValue } from "@/hooks";
import { EvaluationCard } from "../components/EvaluationCard";
import { EvaluationsFilters } from "../components/EvaluationsFilters";
import { EvaluationsPagination } from "../components/EvaluationsPagination";
import { StudentFilter } from "../components/StudentFilter";
import { useGetEvaluations } from "../hooks";
import type { EvaluationStatus, GetEvaluationsParams } from "../types";
import { collectStudentsFromEvaluations } from "../utils/evaluationMapper";
import { evaluationStatusOptions, isEvaluationStatus } from "../utils/statusMapper";

// Orden canónico de las opciones de tipo; valores desconocidos se agregan al final
const typePreference = ["Académica", "Lenguaje", "Psicológica"];

// Tamaños de página que ofrece la UI (la API acepta de 1 a 100, 10 por defecto)
const perPageOptions = [10, 25, 50];
const defaultPerPage = 10;

// La lista está paginada, así que las opciones de los filtros se piden aparte con el
// tamaño de página más grande que permite la API
const optionsPerPage = 100;
const optionsQueryParams: GetEvaluationsParams = { per_page: optionsPerPage };

// Deduplica valores (sin distinguir mayúsculas) y los ordena según la preferencia
const orderOptions = (values: string[], preference: string[]): string[] => {
    const unique: string[] = [];
    const seen = new Set<string>();
    for (const value of values) {
        const key = value.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(value);
        }
    }
    const preferred = preference.filter((p) => unique.some((u) => u.toLowerCase() === p.toLowerCase()));
    const rest = unique
        .filter((u) => !preference.some((p) => p.toLowerCase() === u.toLowerCase()))
        .sort((a, b) => a.localeCompare(b));
    return [...preferred, ...rest];
};

export const ListEvaluations = () => {
    const { selectedStudent, setSelectedStudent } = useStudentStore();
    const [searchInput, setSearchInput] = useState("");
    const [statusFilter, setStatusFilter] = useState<"" | EvaluationStatus>("");
    const [typeFilter, setTypeFilter] = useState("");
    const [perPage, setPerPage] = useState(defaultPerPage);
    const [page, setPage] = useState(1);

    // La búsqueda la resuelve el servidor (evaluation_template_name), así que se espera a
    // que el usuario deje de escribir para no pedir una página por cada tecla
    const searchText = useDebouncedValue(searchInput);

    // Cualquier cambio de filtro o de tamaño de página vuelve a la primera página. Se deriva
    // en el render en lugar de usar un efecto, para no pedir una página que ya no aplica
    const filtersKey = [selectedStudent?.id ?? "", statusFilter, typeFilter, searchText, perPage].join("|");
    const [pageFiltersKey, setPageFiltersKey] = useState(filtersKey);
    const currentPage = filtersKey === pageFiltersKey ? page : 1;

    // Filtros y paginación que resuelve el servidor. Los que están vacíos viajan como undefined
    // para que axios los omita: un ?status= vacío haría fallar la validación de la API (422).
    // `user_id` está prohibido por la API; el filtro por evaluador es `evaluator_id`
    const serverParams = useMemo<GetEvaluationsParams>(() => ({
        student_id: selectedStudent?.id,
        status: statusFilter === "" ? undefined : statusFilter,
        evaluation_template_type: typeFilter || undefined,
        evaluation_template_name: searchText.trim() || undefined,
        page: currentPage,
        per_page: perPage,
    }), [selectedStudent, statusFilter, typeFilter, searchText, currentPage, perPage]);

    // Página de evaluaciones filtrada por el servidor
    const { evaluationQuery } = useGetEvaluations(serverParams);

    // Consulta sin filtros: alimenta el sidebar de estudiantes y las opciones de tipo, para
    // que las opciones no desaparezcan cuando hay un filtro aplicado
    const { evaluationQuery: allEvaluationsQuery } = useGetEvaluations(optionsQueryParams);

    const pageData = evaluationQuery.data?.data;
    const evaluations = useMemo(() => pageData?.data ?? [], [pageData]);
    const referenceEvaluations = useMemo(() => allEvaluationsQuery.data?.data.data ?? [], [allEvaluationsQuery.data]);

    // Estudiantes que aparecen en las evaluaciones, para el filtro lateral
    const students = useMemo(() => collectStudentsFromEvaluations(referenceEvaluations), [referenceEvaluations]);

    // Opciones del combo de tipo, derivadas del conjunto sin filtrar
    const typeOptions = useMemo(() => {
        const types = referenceEvaluations.map((e) => e.type).filter((type) => type.length > 0);
        return orderOptions(types, typePreference).map((type) => ({ value: type, label: type }));
    }, [referenceEvaluations]);

    // El sidebar sólo puede listar los estudiantes de las evaluaciones consultadas
    const referenceTotal = allEvaluationsQuery.data?.data.total ?? 0;
    const studentsArePartial = referenceTotal > referenceEvaluations.length;

    const hasActiveFilters = Boolean(selectedStudent) || statusFilter !== "" || typeFilter !== "" || searchInput.trim() !== "";

    const handleStatusChange = (value: string) => {
        setStatusFilter(isEvaluationStatus(value) ? value : "");
    };

    const handlePageChange = (nextPage: number) => {
        // Los filtros no cambiaron, así que la página pedida es la que corresponde a esta combinación
        setPageFiltersKey(filtersKey);
        setPage(nextPage);
    };

    const handleClearFilters = () => {
        setSearchInput("");
        setStatusFilter("");
        setTypeFilter("");
        setSelectedStudent(null);
    };

    // Reemplazar por la navegación a la página de creación de evaluaciones cuando exista
    const handleStartEvaluation = () => {
        toast.info("La creación de evaluaciones estará disponible próximamente");
    };

    return (
        <div className="min-h-screen bg-blue-50/40 p-6 md:p-10 flex flex-col">
            <div className="space-y-6 flex flex-1 flex-col">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">Evaluaciones</h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                        Administra las evaluaciones que se han realizado
                    </p>
                </div>

                {/* Botón para empezar una evaluación — arriba, ocupa 2/12 y alineado a la derecha */}
                <div className="flex justify-end">
                    <div className="w-2/12">
                        <Button variant="primary" size="lg" className="w-full" onClick={handleStartEvaluation}>
                            Empezar Evaluación
                        </Button>
                    </div>
                </div>

                {/* Contenedor: filtro de estudiantes a la izquierda, resto a la derecha */}
                <div className="flex flex-col md:flex-row gap-6 flex-1">
                    {/* Filtro de estudiantes por nombre */}
                    <aside className="w-full md:w-2/12 bg-white rounded-sm border border-gray-200 shadow-sm p-3">
                        {allEvaluationsQuery.isLoading ? (
                            <p className="px-4 py-3 text-sm text-gray-500 font-medium">Cargando estudiantes...</p>
                        ) : (
                            <StudentFilter students={students} />
                        )}

                        {studentsArePartial && (
                            <p className="px-3 pt-3 text-xs text-gray-400 font-medium">
                                Se listan los estudiantes de las {referenceEvaluations.length} evaluaciones más recientes.
                            </p>
                        )}
                    </aside>

                    {/* El resto */}
                    <section className="w-full md:w-10/12 flex flex-col">
                        {/* Contenedor aparte: filtros + lista de evaluaciones */}
                        <div className="flex flex-col gap-4 flex-1">
                            {/* Filtros de evaluaciones */}
                            <EvaluationsFilters
                                search={searchInput}
                                onSearchChange={setSearchInput}
                                status={statusFilter}
                                onStatusChange={handleStatusChange}
                                type={typeFilter}
                                onTypeChange={setTypeFilter}
                                statusOptions={evaluationStatusOptions}
                                typeOptions={typeOptions}
                                onClearFilters={handleClearFilters}
                            />

                            {/* Lista de evaluaciones */}
                            {evaluationQuery.isLoading ? (
                                <div className="flex flex-col items-center gap-3 mb-6 text-gray-500 font-medium py-8">
                                    Cargando evaluaciones...
                                </div>
                            ) : evaluationQuery.isError ? (
                                <div className="flex flex-col items-center gap-3 mb-6 text-gray-500 font-medium py-8">
                                    <p>No se pudieron obtener las evaluaciones</p>
                                    <Button variant="secondary" size="sm" onClick={() => evaluationQuery.refetch()}>
                                        Reintentar
                                    </Button>
                                </div>
                            ) : evaluations.length === 0 ? (
                                <div className="flex flex-col items-center gap-3 mb-6 text-gray-500 font-medium py-8">
                                    {hasActiveFilters
                                        ? "No se encontraron evaluaciones con los filtros aplicados"
                                        : "No hay evaluaciones registradas"}
                                </div>
                            ) : (
                                <div
                                    className={`flex flex-col gap-4 transition-opacity ${evaluationQuery.isFetching ? "opacity-60" : ""}`}
                                    aria-busy={evaluationQuery.isFetching}>
                                    {evaluations.map((evaluation) => (
                                        <EvaluationCard
                                            key={evaluation.id}
                                            evaluation={evaluation}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Paginación: al fondo de la página, sólo cuando hay resultados */}
                            {(pageData?.total ?? 0) > 0 && (
                                <div className="mt-auto">
                                    <EvaluationsPagination
                                        currentPage={currentPage}
                                        lastPage={pageData?.last_page ?? 1}
                                        from={pageData?.from ?? null}
                                        to={pageData?.to ?? null}
                                        total={pageData?.total ?? 0}
                                        perPage={perPage}
                                        perPageOptions={perPageOptions}
                                        onPageChange={handlePageChange}
                                        onPerPageChange={setPerPage}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};