import { StudentList } from "../components/StudentList";
import { EvaluationList } from "../components/EvaluationList";
import { mockStudents } from "../mocks/mockStudents";
import { useEvaluationStore, useStudentStore } from "@/store";
import { useGetEvaluationsByStudent } from "../hooks/useGetEvaluationsByStudent";
import { useNavigate } from "react-router-dom";
import type { EvaluationData } from "../types";

export const DashboardEvaluations = () => {
  const { selectedStudent } = useStudentStore();
  const { setSelectedEvaluation } = useEvaluationStore();
  const navigate = useNavigate();
  const { data: evaluations, isLoading } = useGetEvaluationsByStudent(selectedStudent?.id ?? null);

  const handleGrade = (evaluation: EvaluationData) => {
    setSelectedEvaluation(evaluation);
    navigate(`/tutor/calificar/${evaluation.id}`);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-blue-50/30 flex flex-col items-center justify-center'>
        <p className='text-gray-500 font-medium'>Cargando evaluaciones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50/40 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Mis evaluaciones</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Administra las evaluaciones que se han realizado
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Lista de estudiantes */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-sm border border-gray-200 shadow-sm p-3 h-hit">
            <StudentList students={mockStudents} />
          </div>

          {/* Lista de evaluaciones */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-sm border border-gray-200 shadow-sm p-6 min-h-[400px]">
            <EvaluationList evaluations={evaluations ?? []} student={selectedStudent} onGrade={handleGrade} />
          </div>
        </div>
      </div>
    </div>
  );
};
