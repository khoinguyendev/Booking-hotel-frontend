
export interface Hotel {
  id: number;
  brandId: number;
  brandName: string;
  ownerId: number;
  cityId: number;
  city: string;
  name: string;
  slug: string;
  image: string;
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
  createdAt: string;
  updatedAt: string;
  amenities: [];
}
export interface CreateHotelRequest {
    brandId: number;
    city: string;
    name: string;
    slug: string;
    image: string;
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
}
export interface UpdateHotelRequest {
  city?: string;
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  banner?: string;
  star?: number;
  checkinTime?: string;
  checkoutTime?: string;
  status?: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    code: string;
    message: string;
    data: T;
    errors: any;
}

export interface HotelResponse
    extends ApiResponse<Hotel[]> {}

export interface HotelSearchParams {
  destination?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface HotelSearchResponse {
  id: number;
  slug: string;
  name: string;
  city: string;
  region: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  tags: string[];
  description?: string | null;
  availableRooms: number;
}