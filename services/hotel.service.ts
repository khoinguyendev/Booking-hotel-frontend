import api from "@/lib/axios";
import {
    Hotel,
    HotelResponse,
    ApiResponse,
    CreateHotelRequest,
} from "@/types/hotel";

// GET
export const getHotels = async () => {
    const response =
        await api.get<HotelResponse>("/hotels");

    return response.data;
};

// CREATE
export const createHotel = async (
    data: CreateHotelRequest
) => {
    const response =
        await api.post<ApiResponse<Hotel>>(
            "/hotels",
            data
        );

    return response.data;
};

// UPDATE
export const updateHotel = async (
    id: number,
    data: CreateHotelRequest
) => {
    const response =
        await api.put<ApiResponse<Hotel>>(
            `/hotels/${id}`,
            data
        );

    return response.data;
};

// DELETE
export const deleteHotel = async (
    id: number
) => {
    const response =
        await api.delete<ApiResponse<null>>(
            `/hotels/${id}`
        );

    return response.data;
};
export const getHotelById = async (
    id: number
) => {
    const response =
        await api.get<ApiResponse<Hotel>>(
            `/hotels/${id}`
        );

    return response.data;
};