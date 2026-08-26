import DescriptionIcon from '@mui/icons-material/Description'
import { useEvaluationStore } from '@/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEvaluationById } from '../hooks/useGetEvaluationById';
import { ItemGradeForm } from '../components/ItemGradeForm';
import { useEffect, useState } from 'react';
import { useUpdateEvaluation } from '../hooks';
import type { ItemData } from '../types';

export const EvaluationPanel = () => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzg3NzE4MTUwLCJleHAiOjE3ODc3MjE3NTAsIm5iZiI6MTc4NzcxODE1MCwianRpIjoidzlNUENuS1Ztck1PNGVoWCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbImFkbWluIl19.WoFh4Da2d4EuNABGllPPw2x4zzZIj-rmtei4XSB-8CE"
    // Obtiene el ID de la evaluación desde los parametros de la URL
    const { id } = useParams();
    const navigate = useNavigate();
    // Primeramente obtiene la evaluación guardada de manera global para agilizar la información
    const { selectedEvaluation } = useEvaluationStore();
    // Realiza una petición a la API para tener la evaluación en caso de refrescar la página 
    // o que no haya una evaluación en el estado global
    //const { evaluationQuery } = useGetEvaluationById(Number(id));
    // Realiza la actualización de la evaluación al guardar el borrador o terminar la evaluación
    const { mutate: update } = useUpdateEvaluation();

    // Guarda la evaluación para mostrarla
    const evaluation = selectedEvaluation // || evaluationQuery.data?.data;

    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ answers, setAnswers ] = useState<Record<number, ItemData>>({});

    useEffect(() => {
        if (evaluation?.items) {
        const initialAnswers: Record<number, ItemData> = {};
        evaluation.items.forEach((item, index) => {
            initialAnswers[index] = {
                ...item,
                grade: "ACHIEVED_ALONE",
                comments: "",
                templateFiles: item.templateFiles ?? [],
                responseFiles: []
            };

        });
        setAnswers(initialAnswers);
        }
    }, [evaluation]);

    // Si todavía no se obtuvo la evaluación informa que esta cargando
    if(!selectedEvaluation) {
        return(
            <div className='min-h-screen bg-blue-50/30 flex flex-col items-center justify-center'>
                <p className='text-gray-500 font-medium'>Cargando información de la evaluación...</p>
            </div>
        );
    }

    // Si no se encuentra una evaluación informa y ofrece regresar a las evaluaciones
    if(!evaluation || !evaluation.items) {
        return(
            <div className='min-h-screen bg-blue-50/30 flex flex-col items-center justify-center'>
                <p className='text-gray-600 mb-4'>No se pudo recuperar la evaluación</p>
                <button
                    onClick={() => navigate('/tutor/evaluaciones')}
                    className='bg-black text-white px-4 py-2 rounded-md'>
                    Volver al Panel
                </button>
            </div>
        );
    }

    // Variables de control para el formulario de los items
    const currentItem = answers[currentIndex] || evaluation.items[currentIndex];
    const isFirstItem = currentIndex === 0;
    const isLastItem = currentIndex === evaluation.items.length - 1;

    const handleAnswerChange = (updatedItem: ItemData) => {
        setAnswers(prev => ({
            ...prev,
            [currentIndex]: {
            ...prev[currentIndex],
            ...updatedItem
            }
        }));
    };


    // Controles de los botones
    const handleNext = () => {
        if (!isLastItem) setCurrentIndex(prev => prev + 1);
    }

    const handlePrev = () => {
        if (!isFirstItem) setCurrentIndex(prev => prev - 1);
    }

    // Para volver al panel de evaluaciones
    const handleReturn = () => {
        navigate('/tutor/evaluaciones');
    }

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (!evaluation || !evaluation.id) return;

        setIsSaving(true);

        const gradedItems = Object.values(answers).map((item: ItemData) => ({
            result: item.grade,
            comments: item.comments,
            evaluation_id: evaluation.id,
            item_version_id: item.item_id,
            responseFiles: item.responseFiles || []
        }));

        const formData = new FormData();
            gradedItems.forEach((gi, giIndex) => {
                formData.append(`graded_items[${giIndex}][result]`, gi.result);
                formData.append(`graded_items[${giIndex}][comments]`, gi.comments);
                formData.append(`graded_items[${giIndex}][evaluation_id]`, gi.evaluation_id.toString());
                formData.append(`graded_items[${giIndex}][item_version_id]`, gi.item_version_id.toString());

                gi.responseFiles.forEach((fileObj, fileIndex) => {
                formData.append(`graded_items[${giIndex}][files][${fileIndex}][resource]`, fileObj.resource);
                formData.append(`graded_items[${giIndex}][files][${fileIndex}][item_version_file_id]`, fileObj.item_version_file_id.toString());
                });
            });

            // 1️⃣ Guardar calificación
            fetch("http://localhost:8000/api/evaluationGradedItems", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                console.log("Calificación creada:", data);

                // 2️⃣ Actualizar estado a CLOSED
                return fetch(`http://localhost:8000/api/evaluations/${evaluation.id}`, {
                    method: "PUT",
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status: "CLOSED" })
                });
                })
                .then(res => res.json())
                .then(updatedEval => {
                console.log("Evaluación actualizada:", updatedEval);
                useEvaluationStore.setState({ selectedEvaluation: updatedEval });
                navigate("/tutor/evaluaciones");
                window.location.reload();
                })
                .catch(err => console.error("Error al guardar:", err))
                .finally(() => setIsSaving(false));
            };





    return(
        <div className="min-h-screen bg-blue-50/30 p-6 md:p-10 flex flex-col items-center">
            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">Panel de Calificación</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Califica y adjunta observaciones a las evaluaciones de los alumnos
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <DescriptionIcon className="text-gray-400" fontSize="medium" />
                        <span className="font-bold text-gray-900 text-base">{evaluation.titulo}</span>
                    </div>
                    <ItemGradeForm item={currentItem} onChange={handleAnswerChange} ></ItemGradeForm>

                    <div className="flex flex-wrap gap-4 p-6 justify-center">
                        <button 
                            onClick={handleReturn}
                            className='bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors'>
                            Volver
                        </button>
                        {!isFirstItem && (
                            <button 
                                onClick={handlePrev}
                                className='bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors'>
                                Anterior
                            </button>
                        )}
                        {isLastItem ? (
                            <button 
                                onClick={handleSave}
                                disabled={isSaving}
                                className='bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors'>
                                {isSaving ? "Guardando..." : "Guardar Evaluación"}
                            </button>
                        ) : (
                            <button 
                                onClick={handleNext}
                                className='bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors'>
                                Siguiente
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}