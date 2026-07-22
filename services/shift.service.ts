import api from "@/lib/axios";
import {
    Shift,
    ShiftResponse,
    ApiResponse,
} from "@/types/shift";

export interface CreateShiftRequest {
    hotelId: number;
    name: string;
    startTime: string;
    endTime: string;
}

// Lấy danh sách ca làm
export const getShifts = async () => {
    const response = await api.get<ShiftResponse>(
        "/shifts"
    );

    return response.data;
};

// Tạo ca làm
export const createShift = async (
    data: CreateShiftRequest
) => {
    const response = await api.post<
        ApiResponse<Shift>
    >("/shifts", data);

    return response.data;
};

export const updateShift = async (
    id: number,
    data: CreateShiftRequest
) => {
    const response = await api.put<
        ApiResponse<Shift>
    >(`/shifts/${id}`, data);

    return response.data;
};

// ========================
// DELETE
// DELETE /api/shifts/{id}
// ========================
export const deleteShift = async (id: number) => {
    const response = await api.delete<
        ApiResponse<null>
    >(`/shifts/${id}`);

    return response.data;
};