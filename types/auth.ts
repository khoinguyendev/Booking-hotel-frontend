export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: {
        accessToken: string;
        expiredAt: string;
        user: {
            avatar: string;
            fullName: string;
            email: string;
            role: string;
        }
    }
    code: string;
    error: string;
    message: string;
    success: boolean;

}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface VerifyEmailRequest {
    email: string;
    otp: string;
}
export interface ResendEmailRequest {
    email: string;
}