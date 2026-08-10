import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export interface AttendancePolicyResponse {
  id: number;
  lateToleranceMinutes: number;
  earlyLeaveToleranceMinutes: number;
  latePenaltyPerMinute: number;
  earlyLeavePenaltyPerMinute: number;
  absencePenaltyPercent: number;
}

export interface CreateAttendancePolicyRequest {
  lateToleranceMinutes: number;
  earlyLeaveToleranceMinutes: number;
  latePenaltyPerMinute: number;
  earlyLeavePenaltyPerMinute: number;
  absencePenaltyPercent: number;
}

export interface UpdateAttendancePolicyRequest {
  lateToleranceMinutes: number;
  earlyLeaveToleranceMinutes: number;
  latePenaltyPerMinute: number;
  earlyLeavePenaltyPerMinute: number;
  absencePenaltyPercent: number;
}

export const attendancePolicyService = {
  getAll() {
    return api.get<ApiResponse<AttendancePolicyResponse[]>>(
      "/attendance-policies"
    );
  },

  getById(id: number) {
    return api.get<ApiResponse<AttendancePolicyResponse>>(
      `/attendance-policies/${id}`
    );
  },

  create(data: CreateAttendancePolicyRequest) {
    return api.post<ApiResponse<AttendancePolicyResponse>>(
      "/attendance-policies",
      data
    );
  },

  update(id: number, data: UpdateAttendancePolicyRequest) {
    return api.put<ApiResponse<AttendancePolicyResponse>>(
      `/attendance-policies/${id}`,
      data
    );
  },

  delete(id: number) {
    return api.delete<ApiResponse<void>>(
      `/attendance-policies/${id}`
    );
  },
};