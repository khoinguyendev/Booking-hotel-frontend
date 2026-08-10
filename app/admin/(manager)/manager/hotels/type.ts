export interface Hotel {
  id: number;
  brandId: number;
  brandName: string;

  city: string;
  name: string;
  slug: string;

  image: string;
  banner: string;

  description: string;
  address: string;

  latitude: number;
  longitude: number;

  phone: string;
  email: string;

  star: number;

  checkinTime: string;
  checkoutTime: string;

  status: boolean;

  roomTypeCount: number;
  roomCount: number;
  amenityCount: number;
  surchargeCount: number;

  amenities: Amenity[];
  surcharges: HotelSurcharge[];
  roomTypes: RoomType[];

  createdAt: string;
  updatedAt: string | null;
}

export interface RoomType {
  id: number;
  hotelId: number;

  name: string;
  maxGuest: number;
  basePrice: number;

  bedType: string;
  roomSize: number;

  description: string;

  // Backend hiện trả về chuỗi URL, ngăn cách bằng dấu ,
  images: string;

  roomCount: number;
}

export interface Amenity {
  id: number;
  name: string;
  icon: string | null;
}

export interface HotelSurcharge {
  id: number;
  hotelId: number;

  name: string;
  description: string;

  chargeType: ChargeType;
  applyType: ApplyType;

  amount: number;

  isRequired: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string | null;
}

export type ChargeType = "Fixed" | "Percentage";

export type ApplyType =
  | "Booking"
  | "Room"
  | "Night"
  | "Guest";