"use client";

import { bookingManagementService } from "@/services/bookingManagement.service";
import { useQuery } from "@tanstack/react-query";

export function useBookingManagement(token: string) {
  const query = useQuery({
    queryKey: ["booking-management", token],

    queryFn: async () => {
      if (!token) {
        throw new Error("Missing booking token");
      }

      const response =
        await bookingManagementService.getBooking(token);

      return response.data.data;
    },

    enabled: !!token,

    staleTime: 30 * 1000,
  });

  return {
    booking: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

