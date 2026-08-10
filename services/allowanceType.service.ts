import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export interface AllowanceTypeResponse {
  id: number;
  name: string;
  description?: string;
}

export interface CreateAllowanceTypeRequest {
  name: string;
  description?: string;
}

export interface UpdateAllowanceTypeRequest {
  name: string;
  description?: string;
}

export const allowanceTypeService = {
  getAll() {
    return api.get<ApiResponse<AllowanceTypeResponse[]>>(
      "/allowance-types"
    );
  },

  getById(id: number) {
    return api.get<ApiResponse<AllowanceTypeResponse>>(
      `/allowance-types/${id}`
    );
  },

  create(data: CreateAllowanceTypeRequest) {
    return api.post<ApiResponse<AllowanceTypeResponse>>(
      "/allowance-types",
      data
    );
  },

  update(id: number, data: UpdateAllowanceTypeRequest) {
    return api.put<ApiResponse<AllowanceTypeResponse>>(
      `/allowance-types/${id}`,
      data
    );
  },

  delete(id: number) {
    return api.delete<ApiResponse<void>>(
      `/allowance-types/${id}`
    );
  },
};