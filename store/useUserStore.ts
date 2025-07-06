import { create } from "zustand";

interface UserStore {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
    setUser: (user: { id: string; name: string; email: string; image: string }) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    id: null,
    name: null,
    email: null,
    image: null,
    setUser: (user) => set({ ...user }),
    clearUser: () => set({ id: null, name: null, email: null, image: null }),
}));
