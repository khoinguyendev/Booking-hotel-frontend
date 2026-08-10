import { OvertimePolicyFormValues } from "@/components/policy/manager/OvertimePolicyDialog";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export const overtimePolicyService = {
  create(data: OvertimePolicyFormValues) {
    const payload = {
      ...data,
      effectiveFrom: data.effectiveFrom || null,
      effectiveTo: data.effectiveTo || null,
    };
    return api.post<ApiResponse<any>>("/overtime-policies", payload);
  },
  getAll() {
    return api.get<ApiResponse<OvertimePolicyResponse[]>>("/overtime-policies");
  },
  update(id: number, data: any) {
     const payload = {
      ...data,
      effectiveFrom: data.effectiveFrom || null,
      effectiveTo: data.effectiveTo || null,
    };
    return api.put<ApiResponse<any>>(`/overtime-policies/${id}`, payload);
  },
};

export interface OvertimePolicyResponse {
  id: number;
  type: OvertimeType;
  multiplier: number;
  allowance: number;
  effectiveFrom: string;
  effectiveTo?: string | null;
  createdAt: string;
}

export enum OvertimeType {
  Weekday = 1,
  Weekend = 2,
  Holiday = 3,
}

export const overtimeTypeOptions = [
  {
    value: OvertimeType.Weekday,
    label: "Ngày thường",
  },
  {
    value: OvertimeType.Weekend,
    label: "Cuối tuần",
  },
  {
    value: OvertimeType.Holiday,
    label: "Ngày lễ",
  },
];
export const OVERTIME_TYPE_LABEL: Record<OvertimeType, string> = {
  [OvertimeType.Weekday]: "Ngày thường",
  [OvertimeType.Weekend]: "Cuối tuần",
  [OvertimeType.Holiday]: "Ngày lễ",
};