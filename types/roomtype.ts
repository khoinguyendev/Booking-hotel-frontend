export interface RoomType {
  id: number;
  hotelId: number;
  name: string;
  maxGuest: number;
  basePrice: number;
  bedType: string;
  roomSize: number;
  description: string | null;
  images: string | null;
  roomCount: number;
  availableCount: number;
  occupiedCount: number;
  reservedCount: number;
  cleaningCount: number;
  maintenanceCount: number;
  outOfServiceCount: number;
}


export interface AvailableRoomTypeResponse {
  id: number;
  name: string;
  roomSize: number;
  bed: string;
  guests: number;
  view: string;
  price: number;
  image: string;
  description?: string | null;
  amenities: string[];
  availableRooms: number;
}

export interface AvailableRoomTypeParams {
  hotelId: number;
  checkIn: string;
  checkOut: string;
  rooms?: number;
  guests?: number;
}