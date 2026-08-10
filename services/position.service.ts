import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export interface PositionResponse {
  id: number;
  name: string;
  description?: string;
  status: boolean;
  createdAt: string;
}

export interface CreatePositionRequest {
  name: string;
  description?: string;
  status: boolean;
}

export interface UpdatePositionRequest {
  name: string;
  description?: string;
  status: boolean;
}

export const positionService = {
  getAll() {
    return api.get<ApiResponse<PositionResponse[]>>("/positions");
  },

  getById(id: number) {
    return api.get<ApiResponse<PositionResponse>>(`/positions/${id}`);
  },

  create(data: CreatePositionRequest) {
    console.log(data)
    return api.post<ApiResponse<PositionResponse>>("/positions", data);
  },

  update(id: number, data: UpdatePositionRequest) {
    return api.put<ApiResponse<PositionResponse>>(`/positions/${id}`, data);
  },

  delete(id: number) {
    return api.delete<ApiResponse<void>>(`/positions/${id}`);
  },
};
