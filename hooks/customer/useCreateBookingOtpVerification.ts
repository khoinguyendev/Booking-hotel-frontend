"use client";

import { bookingOtpVerificationService } from "@/services/bookingOtpVerification.service";
import { CreateBookingOtpVerificationRequest } from "@/types/bookingOtpVerification";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCreateBookingOtpVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const createOtp = async (data: CreateBookingOtpVerificationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookingOtpVerificationService.create(data);

      return response.data.data;
    } catch (error: any) {
      toast.error(error.response.data.message)
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOtp,
    loading,
    error,
  };
}
