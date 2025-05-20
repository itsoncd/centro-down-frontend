// src/store/user.store.ts
import { create } from 'zustand';

type User = {
  name: string;
  email: string;
  roles: string[];
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
