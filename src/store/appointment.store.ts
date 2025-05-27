import { create } from 'zustand';

type AppointmentStore = {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
