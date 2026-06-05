import DescriptionIcon from '@mui/icons-material/Description'
import { useEvaluationStore } from '@/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEvaluationById } from '../hooks/useGetEvaluationById';
import { ItemGradeForm } from '../components/ItemGradeForm';
import { useState } from 'react';
import { useUpdateEvaluation } from '../hooks';
import type { ItemData } from '../types';

export const EvaluationPanel = () => {
    // Obtiene el ID de la evaluación desde los parametros de la URL
    const { id } = useParams();
    const navigate = useNavigate();
    // Primeramente obtiene la evaluación guardada de manera global para agilizar la información
    const { selectedEvaluation } = useEvaluationStore();
    // Realiza una petición a la API para tener la evaluación en caso de refrescar la página 
    // o que no haya una evaluación en el estado global
    const { evaluationQuery } = useGetEvaluationById(Number(id));
    // Realiza la actualización de la evaluación al guardar el borrador o terminar la evaluación
    const { mutate: update } = useUpdateEvaluation();

    // Guarda la evaluación para mostrarla
    const evaluation = selectedEvaluation || evaluationQuery.data?.data;

    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ answers, setAnswers ] = useState<Record<number, ItemData>>({});

    // Si todavía no se obtuvo la evaluación informa que esta cargando
    if(evaluationQuery.isLoading && !selectedEvaluation) {
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
            [currentIndex]: updatedItem
        }));
    }

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

    // Actualiza la información de la evaluación
    const handleSave = () => {
        if(!evaluation || !evaluation.id) {
            console.error("El ID de la evaluación no existe");
            return;
        }

        const updatedItems = evaluation.items.map((originalItem: ItemData, index: number) => {
            return answers[index] || originalItem;
        });

        const isEvaluationCompleted = updatedItems[updatedItems.length - 1].grade !== "";
        const status = isEvaluationCompleted ? "Completado" : "En Progreso"

        const bodyToSend = {
            ...evaluation,
            items: updatedItems,
            status: status
        };

        console.log("Enviando a la API ", bodyToSend);
        update({ id: Number(evaluation.id), body: bodyToSend });
    }

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
                        <button 
                            onClick={handleSave}
                            className='bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors'>
                            Guardar Borrador
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
                                className='bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors'>
                                Guardar Evaluación
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