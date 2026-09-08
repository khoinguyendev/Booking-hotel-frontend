import api from "@/lib/axios";
import { Amenitie } from "@/types/amenitie";
import { ApiResponse } from "@/types/api";
import { HotelSearchParams, HotelSearchResponse, UpdateHotelRequest } from "@/types/hotel";

export const hotelService = {
  getHotelByManager() {
    return api.get<ApiResponse<Hotel>>("/hotels/manager");
  },
  updateHotelByManager(data: UpdateHotelRequest) {
    return api.put<ApiResponse<any>>("/hotels", data);
  },
  search(data: HotelSearchParams) {
    return api.get<ApiResponse<HotelSearchResponse[]>>(
      "/hotels/search",
      {
        params: data,
      }
    );
  },
};

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

  amenities: Amenitie[];
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

export type ApplyType = "Booking" | "Room" | "Night" | "Guest";
