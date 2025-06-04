import type { AppointmentData } from "@/features/appointments/types";
import { create } from "zustand";

type AppointmentStore = {
  selectedAppointment: AppointmentData | null;
  setSelectedAppointment: (appointment: AppointmentData | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedHour: string | null;
  setSelectedHour: (hour: string) => void;
  openHour: string;
  closeHour: string;
};

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  selectedAppointment: null,
  setSelectedAppointment: (appointment) =>
    set({ selectedAppointment: appointment }),
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  selectedHour: null,
  setSelectedHour: (hour) => set({ selectedHour: hour }),
  openHour: "08:00",
  closeHour: "18:00",
}));
