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
            role: number;
            roleName:string
            hotelStaffId:number,
            hotelId:number,
        }
    }
    code: string;
    error: string;
    message: string;
    success: boolean;

}
export enum Role {
  Customer = 1,
  Staff = 2,
  Manager = 3,
  Admin = 4,
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