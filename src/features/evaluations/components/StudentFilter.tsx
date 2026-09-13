import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/SearchBar";
import { useStudentStore } from "@/store";
import type { StudentData } from "../types";

interface StudentFilterProps {
    students: StudentData[]
}

export const StudentFilter = ({ students }: StudentFilterProps) => {
    const { t } = useTranslation("evaluations");
    const { selectedStudent, setSelectedStudent } = useStudentStore();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students.filter((student) =>
        student.nombre.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    return (
        <div className="flex flex-col gap-2">
            {/* Buscador de estudiantes por nombre */}
            <SearchBar
                placeholder={t("students.searchPlaceholder")}
                onSearch={setSearchTerm}
                className="w-full"
            />

            {/* Opción para mostrar todos los estudiantes */}
            <button
                onClick={() => setSelectedStudent(null)}
                className={`px-4 py-3 rounded-lg cursor-pointer text-sm font-semibold transition-colors text-left ${
                    selectedStudent === null
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                }`}>
                {t("students.all")}
            </button>

            {/* Lista de estudiantes */}
            {filteredStudents.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-500 font-medium">
                    {t("students.empty")}
                </p>
            ) : (
                <ul className="space-y-1 overflow-y-auto h-full p-2 custom-scrollbar">
                    {filteredStudents.map((student) => (
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
            )}
        </div>
    );
};