import { api } from "@/lib/axios";
import type { HTTPResponseSchedules, ScheduleData, HolidayPostBody, HTTPResponseHolidayPost } from "../types";

export const getSchedule = async (): Promise<ScheduleData> => {
  const res = await api.get<HTTPResponseSchedules>("/schedules");
  if (res.data.data.length === 0) throw new Error("No schedule found");
  return res.data.data[0];
};

export const updateSchedule = async (id: number, payload: { start_time: string; end_time: string }) => {
  const res = await api.put<HTTPResponseSchedules>(`/schedules/${id}`, payload);
  return res.data;
};

export const postHoliday = async (payload: HolidayPostBody) => {
  const res = await api.post<HTTPResponseHolidayPost>("/holidays", payload);
  return res.data;
};

import type { HTTPResponseHolidays } from "../types";

export const getHolidays = async (): Promise<HTTPResponseHolidays> => {
  const { data } = await api.get<HTTPResponseHolidays>("/holidays");
  return data;
};
