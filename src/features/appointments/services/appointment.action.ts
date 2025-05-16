import { api } from "@/lib/axios"
import type { AppointmentCreated, AppointmentLike, GetAppointments } from "../types"


export const createAppointment = async (body: AppointmentLike): Promise<AppointmentCreated> => {
    const { data } = await api.post<AppointmentCreated>('/citas', body);
    console.log('🚀data: ', data);
    return data;
}

export const getAllAppointments = async (): Promise<GetAppointments> => {
    const { data } = await api.get<GetAppointments>('/citas');
    console.log('🚀data: ', data);
    return data;
}