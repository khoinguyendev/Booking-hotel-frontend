export interface Room {
  id: number;
  roomNumber: number;
  floor: string;
  status: RoomStatus;
  image: string | null;
}
export enum RoomStatus {
  Available = 1, // Sẵn sàng cho thuê
  Occupied = 2, // Đang có khách
  Reserved = 3, // Đã được đặt
  Cleaning = 4, // Đang dọn phòng
  Maintenance = 5, // Đang bảo trì
  OutOfService = 6, // Ngừng sử dụng
}
export const ROOM_TYPE_LABEL: Record<RoomStatus, string> = {
  [RoomStatus.Available]: "Sẵn sàng cho thuê",
  [RoomStatus.Occupied]: "Đang có khách",
  [RoomStatus.Reserved]: "Đã được đặt",
  [RoomStatus.Cleaning]: "Đang dọn phòng",
  [RoomStatus.OutOfService]: "Ngừng sử dụng",
    [RoomStatus.Maintenance]: "Đang bảo trì",

};

export interface CreateRoomRequest {
  roomTypeId: number;
  roomNumber: string;
  floor: number;
  status: RoomStatus;
}