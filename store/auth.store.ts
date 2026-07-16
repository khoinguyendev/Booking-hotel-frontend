import { create } from "zustand";

interface AuthState {
    token: string | null;
    role: string | null;
    user: UserInfo | null;

    login: (token: string, role: string, user: UserInfo) => void;

    logout: () => void;
}
export interface UserInfo {
    avatar: string | null;
    fullName: string;
    email: string;
    role: string;
    id: number;
    phone?: string | null;
}
const getSafeLocalUser = (): UserInfo | null => {
    if (typeof window === "undefined") return null;
    try {
        const localUser = localStorage.getItem("user");
        return localUser ? JSON.parse(localUser) : null;
    } catch (error) {
        console.error("Lỗi giải mã thông tin user từ localStorage:", error);
        return null;
    }
};
export const useAuthStore = create<AuthState>((set) => ({
    token:
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null,
    role:
        typeof window !== "undefined"
            ? localStorage.getItem("role")
            : null,
    user: getSafeLocalUser(),

    login: (token, role, user) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(user));
        // Đồng bộ Cookies
        document.cookie = `accessToken=${token}; path=/; max-age=86400`;
        document.cookie = `role=${role}; path=/; max-age=86400`;
        document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=86400`;
        set({ token, role, user });
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        set({ token: null, role: null, user: null });
    },
}));