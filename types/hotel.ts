
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

export interface ApiResponse<T> {
    success: boolean;
    code: string;
    message: string;
    data: T;
    errors: any;
}

export interface HotelResponse
    extends ApiResponse<Hotel[]> {}