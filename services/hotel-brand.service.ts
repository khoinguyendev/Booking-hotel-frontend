import api from "@/lib/axios";
import {
    ApiResponse,
    HotelBrand,
    HotelBrandResponse,
    CreateHotelBrandRequest,
} from "@/types/hotel-brand";


// ===========================
// GET
// ===========================
export const getHotelBrands = async () => {
    const response =
        await api.get<HotelBrandResponse>(
            "/hotel-brands"
        );

    return response.data;
};


// ===========================
// POST
// ===========================
export const createHotelBrand = async (
    data: CreateHotelBrandRequest
) => {
    const response =
        await api.post<ApiResponse<HotelBrand>>(
            "/hotel-brands",
            data
        );

    return response.data;
};


// ===========================
// PUT
// ===========================
export const updateHotelBrand = async (
    id: number,
    data: CreateHotelBrandRequest
) => {
    const response =
        await api.put<ApiResponse<HotelBrand>>(
            `/hotel-brands/${id}`,
            data
        );

    return response.data;
};


// ===========================
// DELETE
// ===========================
export const deleteHotelBrand = async (
    id: number
) => {
    const response =
        await api.delete<ApiResponse<null>>(
            `/hotel-brands/${id}`
        );

    return response.data;
};