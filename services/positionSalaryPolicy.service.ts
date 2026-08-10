import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  CreatePositionSalaryPolicyRequest,
  PositionSalaryPolicyResponse,
  UpdatePositionSalaryPolicyRequest,
} from "@/types/positionSalaryPolicy";

export const positionSalaryPolicyService = {
  getAll() {
    return api.get<ApiResponse<PositionSalaryPolicyResponse[]>>(
      "/position-salary-policies"
    );
  },

  create(data: CreatePositionSalaryPolicyRequest) {
    const payload={
      ...data,
      effectiveFrom: data.effectiveFrom || null,
      effectiveTo: data.effectiveTo || null,
    }
    return api.post<ApiResponse<void>>(
      "/position-salary-policies",
      payload
    );
  },

  update(
    id: number,
    data: UpdatePositionSalaryPolicyRequest
  ) {
     const payload={
      ...data,
      effectiveFrom: data.effectiveFrom || null,
      effectiveTo: data.effectiveTo || null,
    }
    return api.put<ApiResponse<void>>(
      `/position-salary-policies/${id}`,
      payload
    );
  },

  delete(id: number) {
    return api.delete<ApiResponse<void>>(
      `/position-salary-policies/${id}`
    );
  },
};