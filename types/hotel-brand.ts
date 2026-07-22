export interface HotelBrand {
    id: number;
    name: string;
    slug: string;
    logo: string;
    banner: string;
    description: string;
    website: string;
    phone: string;
    email: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateHotelBrandRequest {
    name: string;
    slug: string;
    logo: string;
    banner: string;
    description: string;
    website: string;
    phone: string;
    email: string;
    status: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    code: string;
    message: string;
    data: T;
    errors: any;
}

export interface HotelBrandResponse
    extends ApiResponse<HotelBrand[]> {}