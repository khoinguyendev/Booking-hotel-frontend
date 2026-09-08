import { useCallback, useEffect, useState } from "react";

import { hotelService } from "@/services/hotel.service";
import { Hotel } from "@/services/hotel.service";

export function useManagerHotel() {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHotel = useCallback(async () => {
    try {
      setLoading(true);

      const response = await hotelService.getHotelByManager();

      setHotel(response.data.data);
    } catch (error) {
      console.error("Lỗi lấy thông tin khách sạn:", error);
      setHotel(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotel();
  }, [fetchHotel]);

  return {
    hotel,
    loading,
    refetch: fetchHotel,
  };
}