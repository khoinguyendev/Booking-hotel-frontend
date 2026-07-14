import { create } from "zustand";

interface AuthState {
    token: string | null;
    role: string | null;

    login: (token: string,role : string) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token:
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null,
    role:
        typeof window !== "undefined"
            ? localStorage.getItem("role")
            : null,

    login: (token,role) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", role);
        document.cookie = `accessToken=${token}; path=/; max-age=86400`;
        document.cookie = `role=${role}; path=/; max-age=86400`;
        set({ token, role });
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        set({ token: null, role: null });
    },
}));