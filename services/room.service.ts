import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { CreateRoomRequest, Room, RoomStatus } from "@/types/room";

export const roomService = {
  getRoomsByRoomType(
    roomTypeId: number,
    params?: {
      page?: number;
      pageSize?: number;
      search?: string;
      status?: RoomStatus | null;
    },
  ) {
    return api.get<ApiResponse<PaginatedResponse<Room>>>(
      `/rooms/room-type/${roomTypeId}`,
      {
        params,
      },
    );
  },
  createRoom(data: CreateRoomRequest) {
    return api.post("/rooms", data);
  },
};
