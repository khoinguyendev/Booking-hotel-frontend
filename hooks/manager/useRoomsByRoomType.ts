import { useCallback, useEffect, useState } from "react";

import { usePagination } from "../usePayroll";
import { Room, RoomStatus } from "@/types/room";
import { roomService } from "@/services/room.service";

interface Props {
  roomTypeId?: number;
  search?: string;
  status?: RoomStatus | null;
}

export interface CreateRoomRequest {
  roomNumber: string;
  floor: number;
  status: RoomStatus;
}

export function useRoomsByRoomType({
  roomTypeId,
  search,
  status,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([]);

  const pagination = usePagination();

  const {
    page,
    pageSize,
    setTotalItems,
    setTotalPages,
  } = pagination;

  // =========================
  // Get rooms
  // =========================

  const fetchRooms = useCallback(async () => {
    if (!roomTypeId || roomTypeId <= 0) {
      setRooms([]);
      return;
    }

    try {
      setLoading(true);

      const res = await roomService.getRoomsByRoomType(
        roomTypeId,
        {
          page,
          pageSize,
          search: search?.trim() || undefined,
          status,
        },
      );

      const data = res.data.data;

      setRooms(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi lấy danh sách phòng:", error);

      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [
    roomTypeId,
    page,
    pageSize,
    search,
    status,
    setTotalItems,
    setTotalPages,
  ]);

  // =========================
  // Create room
  // =========================

  const createRoom = useCallback(
    async (data: CreateRoomRequest) => {
      if (!roomTypeId || roomTypeId <= 0) {
        return false;
      }

      try {
        setCreating(true);

        await roomService.createRoom({
          roomTypeId,
          roomNumber: data.roomNumber,
          floor: data.floor,
          status: data.status,
        });

        await fetchRooms();

        return true;
      } catch (error) {
        console.error("Lỗi tạo phòng:", error);

        return false;
      } finally {
        setCreating(false);
      }
    },
    [roomTypeId, fetchRooms],
  );

  // =========================
  // Fetch
  // =========================

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    loading,

    creating,
    createRoom,

    pagination,

    refetch: fetchRooms,
  };
}