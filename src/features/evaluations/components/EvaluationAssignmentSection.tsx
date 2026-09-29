import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import type { ApiEvaluatorOption, ApiStudent } from "../types";

interface EvaluationAssignmentSectionProps {
    // Catálogo del combo (GET /evaluators/options)
    evaluators: ApiEvaluatorOption[];
    students: ApiStudent[];
    evaluatorId: number | "";
    studentId: number | "";
    onEvaluatorChange: (id: number | "") => void;
    onStudentChange: (id: number | "") => void;
    // El roster se recarga al cambiar de evaluador: lo espera este campo, no la página
    isStudentsLoading: boolean;
    isStudentsError: boolean;
    onRetryStudents: () => void;
    // Sin rol admin/director el evaluador queda fijo en el perfil del propio usuario
    isEvaluatorLocked: boolean;
}

interface FormFieldProps {
    id: string;
    label: string;
    placeholder: string;
    emptyText: string;
    value: number | "";
    onChange: (value: number | "") => void;
    options: { value: number; label: string }[];
    errorText?: string;
    isError?: boolean;
    onRetry?: () => void;
    // Tiene prioridad sobre los demás estados: el campo aún no se puede usar
    disabledText?: string;
    // Su presencia muestra el spinner del campo con ese texto
    loadingText?: string;
    // El combo se muestra pero no se puede cambiar
    disabled?: boolean;
    // Explica por qué el combo está limitado
    helpText?: string;
}

const selectClassName =
    "w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500";

const FormField = ({
    id,
    label,
    placeholder,
    emptyText,
    value,
    onChange,
    options,
    errorText,
    isError,
    onRetry,
    disabledText,
    loadingText,
    disabled,
    helpText,
}: FormFieldProps) => {
    const { t } = useTranslation("evaluations");

    return (
        <div>
            <label htmlFor={id} className="block text-sm text-gray-600 mb-1">
                {label}
            </label>

            {disabledText ? (
                <p className="text-sm text-gray-400 font-medium">{disabledText}</p>
            ) : loadingText ? (
                <Spinner size="sm" message={loadingText} className="items-start" />
            ) : isError ? (
                <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-red-600 font-medium">{errorText}</p>
                    {onRetry && (
                        <Button variant="secondary" size="sm" onClick={onRetry}>
                            {t("actions.retry", { ns: "common" })}
                        </Button>
                    )}
                </div>
            ) : options.length === 0 ? (
                <p className="text-sm text-gray-500 font-medium">{emptyText}</p>
            ) : (
                <>
                    <select
                        id={id}
                        value={value}
                        disabled={disabled}
                        onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
                        className={selectClassName}>
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {helpText && <p className="mt-1 text-xs text-gray-400 font-medium">{helpText}</p>}
                </>
            )}
        </div>
    );
};

export const EvaluationAssignmentSection = ({
    evaluators,
    students,
    evaluatorId,
    studentId,
    onEvaluatorChange,
    onStudentChange,
    isStudentsLoading,
    isStudentsError,
    onRetryStudents,
    isEvaluatorLocked,
}: EvaluationAssignmentSectionProps) => {
    const { t } = useTranslation("evaluations");

    return (
        <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-800">{t("create.assignment.title")}</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Evaluador: bloqueado al perfil propio cuando el rol no puede elegir */}
                <FormField
                    id="evaluator-select"
                    label={t("create.assignment.evaluatorLabel")}
                    placeholder={t("create.assignment.evaluatorPlaceholder")}
                    emptyText={t("create.assignment.evaluatorsEmpty")}
                    value={evaluatorId}
                    onChange={onEvaluatorChange}
                    options={evaluators.map((evaluator) => ({
                        value: evaluator.id,
                        label: evaluator.name,
                    }))}
                    disabled={isEvaluatorLocked}
                    helpText={isEvaluatorLocked ? t("create.assignment.evaluatorLocked") : undefined}
                    disabledText={
                        isEvaluatorLocked && evaluators.length === 0
                            ? t("create.assignment.evaluatorMissing")
                            : undefined
                    }
                />

                {/* Alumno al que se le aplicará la evaluación: sale del roster del evaluador */}
                <FormField
                    id="student-select"
                    label={t("create.assignment.studentLabel")}
                    placeholder={t("create.assignment.studentPlaceholder")}
                    emptyText={t("create.assignment.studentsEmpty")}
                    value={studentId}
                    onChange={onStudentChange}
                    options={students.map((student) => ({
                        value: student.id,
                        label: student.name,
                    }))}
                    isError={isStudentsError}
                    errorText={t("create.assignment.studentsLoadError")}
                    onRetry={onRetryStudents}
                    loadingText={isStudentsLoading ? t("create.assignment.studentsLoading") : undefined}
                    disabledText={
                        evaluatorId === "" ? t("create.assignment.selectEvaluatorFirst") : undefined
                    }
                />
            </div>
        </section>
    );
};
