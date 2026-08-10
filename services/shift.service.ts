import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export interface ShiftResponse {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  status: boolean;
}

export interface CreateShiftRequest {
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  status: boolean;
}

export interface UpdateShiftRequest {
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  status: boolean;
}

export const shiftService = {
  getAll() {
    return api.get<ApiResponse<ShiftResponse[]>>("/shifts");
  },

  create(data: CreateShiftRequest) {
    return api.post<ApiResponse<ShiftResponse>>("/shifts", data);
  },

  update(id: number, data: UpdateShiftRequest) {
    return api.put<ApiResponse<ShiftResponse>>(`/shifts/${id}`, data);
  },

  delete(id: number) {
    return api.delete<ApiResponse<void>>(`/shifts/${id}`);
  },
};