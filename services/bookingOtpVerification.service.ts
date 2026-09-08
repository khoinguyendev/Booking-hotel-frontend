import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { CreateBookingOtpVerificationRequest, CreateBookingOtpVerificationResponse } from "@/types/bookingOtpVerification";

export const bookingOtpVerificationService = {
  create(data: CreateBookingOtpVerificationRequest) {
    return api.post<ApiResponse<CreateBookingOtpVerificationResponse>>(
      "/booking-otp-verifications",
      data,
    );
  },
   verify(id: number, otp: string) {
    return api.post<ApiResponse<any>>(
      `/booking-otp-verifications/${id}/verify`,
      {
        otp,
      },
    );
  },
};