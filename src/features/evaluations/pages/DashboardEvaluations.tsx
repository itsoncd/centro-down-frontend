import { EvaluationList } from "../components/EvaluationList";
import { mockEvaluations } from "../mocks/mockEvaluations";
import { mockStudents } from "../mocks/mockStudents";
import { StudentList } from "../components/StudentList";
import { useStudentStore } from "@/store";
import { useGetEvaluations } from "../hooks";

export const DashboardEvaluations = () => {
    const { selectedStudent } = useStudentStore();

    // Pide las evaluaciones a la API
    const { evaluationQuery } = useGetEvaluations();

    const evaluations = mockEvaluations || evaluationQuery.data?.data;

    if(evaluationQuery.isLoading && !evaluations) {
        return (
            <div className='min-h-screen bg-blue-50/30 flex flex-col items-center justify-center'>
                <p className='text-gray-500 font-medium'>Cargando evaluaciones...</p>
            </div>
        );
    }
        
    
    if(!evaluations) {
        return (
            <div className='min-h-screen bg-blue-50/30 flex flex-col items-center justify-center'>
                <p className='text-gray-500 font-medium'>No se pudieron obtener las evaluaciones</p>
            </div>
        );
    }
        
    return (
        <>
            <div className="min-h-screen bg-blue-50/40 p-6 md:p-10">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-800">Mis evaluaciones</h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium">
                            Administra las evaluaciones que se han realizado
                        </p>
                    </div>

                    {/* Contenedor de las dos columnas de estudiantes y evaluaciones*/}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Lista de estudiantes */}
                        <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-sm border border-gray-200 shadow-sm p-3 h-hit">
                            <StudentList students={mockStudents} />
                        </div>
                        
                        {/* Lista de evaluaciones */}
                        <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-sm border border-gray-200 shadow-sm p-6 min-h-[400px]">
                            <EvaluationList evaluations={evaluations} student={selectedStudent} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}