"use client";

import { roomTypeService } from "@/services/roomType.service";
import { AvailableRoomTypeParams } from "@/types/roomtype";
import { useQuery } from "@tanstack/react-query";

export function useAvailableRoomTypes(
  params: AvailableRoomTypeParams | null,
) {
  const query = useQuery({
    queryKey: ["available-room-types", params],

    queryFn: async () => {
      if (!params) {
        throw new Error("Missing search parameters");
      }

      const response = await roomTypeService.getAvailable(params);

      return response.data.data ?? [];
    },

    enabled:
      !!params &&
      !!params.hotelId &&
      !!params.checkIn &&
      !!params.checkOut,

    staleTime: 30 * 1000,
  });

  return {
    rooms: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}