import { roomTypeService, UpdateRoomTypeRequest } from "@/services/roomType.service";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export function useUpdateRoomType(id?: number) {
  const [loading, setLoading] = useState(false);

  const updateRoomType = useCallback(
    async (data: UpdateRoomTypeRequest) => {
      if (!id || id <= 0) return;

      try {
        setLoading(true);

        const res = await roomTypeService.update(
          id,
          data
        );
        toast.success("Đã thêm")
        return res.data.data;
        
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  return {
    updateRoomType,
    loading,
  };
}