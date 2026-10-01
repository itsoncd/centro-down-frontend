import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { canManageEvaluators } from "@/utils";
import { EvaluationAssignmentSection } from "../components/EvaluationAssignmentSection";
import { EvaluationTemplateSection } from "../components/EvaluationTemplateSection";
import {
    useCreateEvaluation,
    useGetEvaluationTemplateDetail,
    useGetEvaluationTemplateOptions,
    useGetEvaluatorByUser,
    useGetEvaluatorDetail,
    useGetEvaluatorOptions,
} from "../hooks";
import type { ApiEvaluatorOption } from "../types";
import { extractApiErrorMessage } from "../utils/apiError";
import { getLatestTemplateVersion } from "../utils/templateMapper";

const evaluationsListPath = "/evaluaciones/aplicacion-de-evaluaciones";

export const CreateEvaluation = () => {
    const { t } = useTranslation("evaluations");
    const navigate = useNavigate();

    // El combo guarda el id de la plantilla; la versión que se aplica sale de su detalle
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | "">("");
    const [studentId, setStudentId] = useState<number | "">("");
    const [selectedEvaluatorId, setSelectedEvaluatorId] = useState<number | "">("");
    const [isEvaluatorTouched, setIsEvaluatorTouched] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // El privilegio se decide con TODOS los roles del usuario, no con el rol elegido en el login
    const { currentUserQuery } = useCurrentUser();
    const canManage = canManageEvaluators(currentUserQuery.data?.roles);

    // Catálogos de los dos combos; el de evaluadores solo lo piden los roles con privilegio
    const { templateOptionsQuery } = useGetEvaluationTemplateOptions();
    const { evaluatorOptionsQuery } = useGetEvaluatorOptions(canManage);

    // Detalle de la plantilla elegida: se pide al seleccionar una opción
    const { templateDetailQuery } = useGetEvaluationTemplateDetail(selectedTemplateId);

    const templateOptions = useMemo(() => templateOptionsQuery.data ?? [], [templateOptionsQuery.data]);
    const evaluatorOptions = useMemo(() => evaluatorOptionsQuery.data ?? [], [evaluatorOptionsQuery.data]);
    const templateDetail = templateDetailQuery.data ?? null;

    // El endpoint de detalle no ordena las versiones, así que la versión aplicable se deriva
    const latestVersion = useMemo(() => getLatestTemplateVersion(templateDetail), [templateDetail]);
    const templateVersionId = latestVersion?.id ?? "";

    // El perfil propio se consulta por el user_id de la sesión: sirve de evaluador por defecto
    // y, sin privilegio, es el único evaluador disponible
    const { myEvaluatorQuery } = useGetEvaluatorByUser(currentUserQuery.data?.id ?? "");
    const myEvaluator = myEvaluatorQuery.data ?? null;

    const defaultEvaluatorId = myEvaluator?.id ?? "";
    const activeEvaluatorId = isEvaluatorTouched ? selectedEvaluatorId : defaultEvaluatorId;

    const evaluatorOptionsForCombo = useMemo<ApiEvaluatorOption[]>(() => {
        if (canManage) return evaluatorOptions;

        return myEvaluator
            ? [{ id: myEvaluator.id, name: myEvaluator.user?.name ?? myEvaluator.user?.email ?? "" }]
            : [];
    }, [canManage, evaluatorOptions, myEvaluator]);

    // El detalle del evaluador activo trae su user_id (lo que se envía) y sus alumnos asignados
    const { evaluatorDetailQuery } = useGetEvaluatorDetail(activeEvaluatorId);

    const evaluatorDetail = evaluatorDetailQuery.data ?? null;
    const students = useMemo(() => evaluatorDetail?.students ?? [], [evaluatorDetail]);

    // La página espera a todo lo necesario para quedar utilizable: la sesión (que decide el
    // privilegio), los catálogos, el perfil propio y el detalle del evaluador por defecto.
    // isLoading solo es true cuando no hay datos en caché, así que ni un refetch en segundo
    // plano vuelve a vaciar la página; y el detalle que depende del combo del usuario (el
    // cambio de evaluador) lo espera el propio campo de alumno
    const isLoadingResources =
        currentUserQuery.isLoading ||
        templateOptionsQuery.isLoading ||
        myEvaluatorQuery.isLoading ||
        (canManage && evaluatorOptionsQuery.isLoading) ||
        (!isEvaluatorTouched && evaluatorDetailQuery.isLoading);

    const isResourcesError =
        currentUserQuery.isError ||
        templateOptionsQuery.isError ||
        myEvaluatorQuery.isError ||
        (canManage && evaluatorOptionsQuery.isError);

    const { evaluationMutation } = useCreateEvaluation({
        onSucces: () => navigate(evaluationsListPath),
        onError: (error) => setSubmitError(extractApiErrorMessage(error, t("create.submitError"))),
    });

    // Cambiar de evaluador invalida el alumno elegido: pertenecía a otro roster.
    // Sin privilegio el combo está deshabilitado, así que no hay cambio que aplicar
    const handleEvaluatorChange = (value: number | "") => {
        if (!canManage) return;

        setIsEvaluatorTouched(true);
        setSelectedEvaluatorId(value);
        setStudentId("");
    };

    const handleRetryResources = () => {
        if (currentUserQuery.isError) currentUserQuery.refetch();
        if (templateOptionsQuery.isError) templateOptionsQuery.refetch();
        if (myEvaluatorQuery.isError) myEvaluatorQuery.refetch();
        if (evaluatorOptionsQuery.isError) evaluatorOptionsQuery.refetch();
    };

    const canSave =
        templateVersionId !== "" &&
        studentId !== "" &&
        evaluatorDetail !== null &&
        !evaluationMutation.isPending;

    const handleSubmit = () => {
        if (!canSave || !evaluatorDetail) return;

        setSubmitError("");
        evaluationMutation.mutate({
            student_id: Number(studentId),
            template_version_id: Number(templateVersionId),
            user_id: evaluatorDetail.user_id,
        });
    };

    const handleCancel = () => navigate(evaluationsListPath);

    return (
        <div className="min-h-screen bg-blue-50/40 p-6 md:p-10">
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">{t("create.title")}</h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{t("create.subtitle")}</p>
                </div>

                {/* El título queda visible; el resto de la página espera a sus recursos */}
                {isLoadingResources ? (
                    <div className="flex items-center justify-center py-16">
                        <Spinner size="lg" message={t("states.loading", { ns: "common" })} />
                    </div>
                ) : isResourcesError ? (
                    <div className="flex flex-col items-center gap-3 py-16 text-center">
                        <p className="text-sm text-red-600 font-medium">{t("create.loadError")}</p>
                        <div className="flex flex-col-reverse gap-3 sm:flex-row">
                            <Button variant="cancel" size="sm" onClick={handleCancel}>
                                {t("create.actions.cancel")}
                            </Button>
                            <Button variant="secondary" size="sm" onClick={handleRetryResources}>
                                {t("actions.retry", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Sección 1: plantilla de evaluación y sus detalles */}
                        <EvaluationTemplateSection
                            options={templateOptions}
                            selectedId={selectedTemplateId}
                            onSelect={setSelectedTemplateId}
                            detail={templateDetail}
                            latestVersion={latestVersion}
                            isDetailLoading={templateDetailQuery.isLoading}
                            isDetailError={templateDetailQuery.isError}
                            onRetryDetail={() => templateDetailQuery.refetch()}
                        />

                        {/* Sección 2: evaluador y alumno a evaluar */}
                        <EvaluationAssignmentSection
                            evaluators={evaluatorOptionsForCombo}
                            students={students}
                            evaluatorId={activeEvaluatorId}
                            studentId={studentId}
                            onEvaluatorChange={handleEvaluatorChange}
                            onStudentChange={setStudentId}
                            isStudentsLoading={evaluatorDetailQuery.isLoading}
                            isStudentsError={evaluatorDetailQuery.isError}
                            onRetryStudents={() => evaluatorDetailQuery.refetch()}
                            isEvaluatorLocked={!canManage}
                        />

                        {submitError && (
                            <p className="text-sm font-medium text-red-600" role="alert">
                                {submitError}
                            </p>
                        )}

                        {/* Acciones de la página */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                variant="cancel"
                                size="lg"
                                onClick={handleCancel}
                                disabled={evaluationMutation.isPending}>
                                {t("create.actions.cancel")}
                            </Button>
                            <Button variant="primary" size="lg" onClick={handleSubmit} disabled={!canSave}>
                                {evaluationMutation.isPending
                                    ? t("create.actions.saving")
                                    : t("create.actions.save")}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
