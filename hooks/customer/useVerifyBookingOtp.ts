"use client";

import { bookingOtpVerificationService } from "@/services/bookingOtpVerification.service";
import { useState } from "react";
import toast from "react-hot-toast";

export function useVerifyBookingOtp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const verifyOtp = async (id: number, otp: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookingOtpVerificationService.verify(id, otp);

      return response.data.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyOtp,
    loading,
    error,
  };
}
