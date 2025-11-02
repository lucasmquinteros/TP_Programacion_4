import { create } from "zustand";
import { persist } from "zustand/middleware";

const handler = (set) => ({
  isAuthenticated: false,
  user: null,
  login: ({ user }) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
});

export const useAuthStore = create(persist(handler, { name: "auth-store" }));
