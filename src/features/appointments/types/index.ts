

export interface AppointmentLike {
    user_id: number;
    fecha_cita: string;
    correo: string;
    nombre_alumno: string;
    nombre_tutor: string;
}

//?? HTTP Responses

export interface AppointmentCreated {
    status_code: number;
    message:     string;
    data:        AppointmentData;
}

export interface GetAppointments {
    status_code: number;
    message: string;
    data: AppointmentData[];
}

export interface AppointmentData {
    user_id:       number;
    fecha_cita:    Date;
    correo:        string;
    nombre_alumno: string;
    nombre_tutor:  string;
    updated_at:    Date;
    created_at:    Date;
    id:            number;
}
