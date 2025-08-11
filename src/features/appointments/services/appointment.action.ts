import { api } from "@/lib/axios"
import type { HTTPAppointmentCreated, AppointmentLike, HTTPGetAppointments } from "../types"
import { sleep } from "@/utils/awaitFetch.utils";

export const createAppointment = async (body: AppointmentLike): Promise<HTTPAppointmentCreated> => {
    const { data } = await api.post<HTTPAppointmentCreated>('/citas', body);
    console.log('🚀data: ', data);
    return data;
}

export const getAllAppointments = async (): Promise<HTTPGetAppointments> => {
    // await sleep(1);
    const { data } = await api.get<HTTPGetAppointments>('/citas');
    console.log('🚀data: ', data);
    return data;
}

export const updateAppointment = async (
  id: number,
  body: AppointmentLike
): Promise<HTTPAppointmentCreated> => {
  const { data } = await api.put<HTTPAppointmentCreated>(`/citas/${id}`, body);
  console.log("🛠️ Cita actualizada:", data);
  return data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  await api.delete(`/citas/${id}`);
};