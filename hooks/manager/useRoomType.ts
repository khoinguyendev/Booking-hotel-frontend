import { roomTypeService } from "@/services/roomType.service";
import { RoomType } from "@/types/roomtype";
import { useCallback, useEffect, useState } from "react";


export function useRoomType(id?: number) {
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRoomType = useCallback(async () => {
    if (!id || id <= 0) return;

    try {
      setLoading(true);

      const res = await roomTypeService.getById(id);

      setRoomType(res.data.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRoomType();
  }, [fetchRoomType]);

  return {
    roomType,
    loading,
    refetch: fetchRoomType,
  };
}