import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { AvailableRoomTypeParams, AvailableRoomTypeResponse, RoomType } from "@/types/roomtype";

export const roomTypeService = {
  create(data: any) {
    return api.post<ApiResponse<any>>("/room-types", data);
  },
  getById(id: number) {
    return api.get<ApiResponse<RoomType>>(`/room-types/${id}`);
  },
  update(id: number, data: UpdateRoomTypeRequest) {
    return api.put<ApiResponse<RoomType>>(`/room-types/${id}`, data);
  },
  getAvailable(params: AvailableRoomTypeParams) {
    return api.get<ApiResponse<AvailableRoomTypeResponse[]>>(
      "/room-types/available",
      {
        params: {
          hotelId: params.hotelId,
          checkIn: params.checkIn,
          checkOut: params.checkOut,
          rooms: params.rooms ?? 1,
          guests: params.guests ?? 1,
        },
      },
    );
  },
};
export interface UpdateRoomTypeRequest {
  name?: string;
  maxGuest?: number;
  bedType?: string;
  roomSize?: number;
  description?: string;
  images?: string;
}
