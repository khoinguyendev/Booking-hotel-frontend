import api from "@/lib/axios";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    ResendEmailRequest,
    VerifyEmailRequest,
} from "@/types/auth";

export const authService = {
    login(data: LoginRequest) {
        return api.post<LoginResponse>(
            "/auth/employee/login",
            data
        );
    },

    register(data: RegisterRequest) {
        return api.post(
            "/auth/register",
            data
        );
    },

    verifyEmail(data: VerifyEmailRequest) {
        return api.post(
            "/auth/verify-email",
            data
        );
    },
    resendEmail(data: ResendEmailRequest) {
        return api.post(
            "/auth/resend-email",
            data
        );
    },
};