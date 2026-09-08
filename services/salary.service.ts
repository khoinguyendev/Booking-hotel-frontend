import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { CreateMonthlySalaryResponse, SalaryResponseItem, SalaryStatus } from "@/types/salary";


export const salaryService = {
  getByManager(params?: SalaryFilterRequest) {
    return api.get<ApiResponse<PaginatedResponse<SalaryResponseItem>>>(
      "/salaries",
      {
        params,
      },
    );
  },
  createSalaryMonth(data:CreateSalaryMonth){
    return api.post<ApiResponse<CreateMonthlySalaryResponse>>(
      "/salaries/monthly",data
    );
  }
};

export interface SalaryFilterRequest {
  month?: number;
  year?: number;
  status?: SalaryStatus;
  positionId?: number;
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface CreateSalaryMonth{
  month: number;
  year: number;
}