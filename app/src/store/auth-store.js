import { persist } from "zustand/middleware";
import { create } from "zustand";
const handler = (set) => ({
  isAuthenticated: false,
  token: null,
  user: null,

  login: ({ token, user }) =>
    set({ isAuthenticated: true, token: token, user: user }),
  logout: () => set({ isAuthenticated: false, token: null, user: null }),
});

export const useAuthStore = create(
  persist(handler, {
    name: "auth-storage",
  })
);
