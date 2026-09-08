"use client";

import { useState } from "react";
import type {
    HotelSearchParams,
  HotelSearchResponse,
} from "@/types/hotel";
import { hotelService } from "@/services/hotel.service";

export function useHotelSearch() {
  const [results, setResults] = useState<HotelSearchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: HotelSearchParams) => {
    try {
      setLoading(true);
      setError(null);

      const response = await hotelService.search(params);

      setResults(response.data.data);

      return response.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Không thể tìm kiếm khách sạn.";

      setError(message);
      setResults([]);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    search,
  };
}