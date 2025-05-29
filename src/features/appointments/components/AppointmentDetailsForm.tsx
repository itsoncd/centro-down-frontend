import { InputField } from '@/components/InputField'
import React from 'react'

export const AppointmentDetailsForm = () => {
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            id="correo"
            label="Correo del tutor"
            type="email"
            registration={register("correo", {
              required: "El correo es obligatorio",
            })}
            error={errors.correo}
          />
    
          <InputField
            id="fecha_cita"
            label="Fecha de la cita"
            type="date"
            readOnly
            registration={register("fecha_cita", {
              required: "La fecha es obligatoria",
            })}
            error={errors.fecha_cita}
          />
    
          <InputField
            id="hora_inicio"
            label="Hora de inicio"
            type="time"
            registration={register("hora_inicio", {
              required: "La hora de inicio es obligatoria",
            })}
            error={errors.hora_inicio}
          />
    
          <InputField
            id="hora_fin"
            label="Hora de fin"
            type="time"
            registration={register("hora_fin", {
              required: "La hora de fin es obligatoria",
            })}
            error={errors.hora_fin}
          />
    
          <InputField
            id="nombre_alumno"
            label="Nombre del alumno"
            registration={register("nombre_alumno", {
              required: "El nombre del alumno es obligatorio",
            })}
            error={errors.nombre_alumno}
          />
    
          <InputField
            id="nombre_tutor"
            label="Nombre del tutor"
            registration={register("nombre_tutor", {
              required: "El nombre del tutor es obligatorio",
            })}
            error={errors.nombre_tutor}
          />
    
          <Button type="submit" variant="primary">
            "Agendar"
          </Button>
        </form>
    </>
  )
}
