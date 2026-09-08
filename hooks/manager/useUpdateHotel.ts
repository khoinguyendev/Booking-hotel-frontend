// hooks/manager/useUpdateHotel.ts

import { useState } from "react";
import { hotelService } from "@/services/hotel.service";
import { UpdateHotelRequest } from "@/types/hotel";



export function useUpdateHotel() {
  const [loading, setLoading] = useState(false);

  const updateHotel = async (data: UpdateHotelRequest) => {
    try {
      setLoading(true);

      const response = await hotelService.updateHotelByManager(data);

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateHotel,
    loading,
  };
}