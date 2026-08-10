import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export interface OvertimeResponse {
  id: number;
  startTime: string;
  endTime: string;
  hours: number;
  totalAmount: number;
  note?: string;
}

export interface CreateOvertimeRequest {
  workScheduleId: number;
  policyId: number;
  startTime: string;
  endTime: string;
  note?: string;
}

export interface UpdateOvertimeRequest {
  policyId: number;
  startTime: string;
  endTime: string;
  note?: string;
}

export const overtimeService = {
  getAll() {
    return api.get<ApiResponse<OvertimeResponse[]>>("/overtimes");
  },

  getById(id: number) {
    return api.get<ApiResponse<OvertimeResponse>>(`/overtimes/${id}`);
  },

  create(data: CreateOvertimeRequest) {
    console.log(data,"data")
    return api.post<ApiResponse<OvertimeResponse>>(
      "/overtimes",
      data
    );
  },

  update(id: number, data: UpdateOvertimeRequest) {
    return api.put<ApiResponse<OvertimeResponse>>(
      `/overtimes/${id}`,
      data
    );
  },

  delete(id: number) {
    return api.delete<ApiResponse<void>>(
      `/overtimes/${id}`
    );
  },
};