import { useStudentStore } from "@/store";
import type { StudentData } from "../types";


interface StudentListProps {
    students: StudentData[]
}

export const StudentList = ({ students }: StudentListProps) => {
    const { selectedStudent, setSelectedStudent } = useStudentStore();

    return(
        <ul className="space-y-1 overflow-y-auto h-full p-2 custom-scrollbar">
            {students.map((student) => (
                <li
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`px-4 py-3 rounded-lg cursor-pointer text-sm font-semibold transition-colors ${
                        selectedStudent === student
                            ? "bg-gray-200 text-gray-900" // Esta seleccionado
                            : "text-gray-700 hover:bg-gray-50" // Esta deseleccionado
                    }`}>
                    {student.nombre}
                </li>
            ))}
        </ul>
    )

}