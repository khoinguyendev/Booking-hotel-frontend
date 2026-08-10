import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { RequestFilter, RequestResponse } from "@/types/requests";

export const requestService = {
  getByManager(params?: RequestFilter) {
    return api.get<ApiResponse<PaginatedResponse<RequestResponse>>>(
      "/staff-requests",
      {
        params,
      },
    );
  },
  getEmployeeRequests(params?: RequestFilter) {
    return api.get<ApiResponse<PaginatedResponse<RequestResponse>>>(
      "/staff-requests/me",
      {
        params,
      },
    );
  },
  deleteRequest(requestId: number) {
    return api.delete<ApiResponse<null>>(`/staff-requests/${requestId}`);
  },

  //LEAVE
  createLeaveRequest(payload: {
    fromDate: string;
    toDate: string;
    reason: string;
  }) {
    return api.post<ApiResponse<any>>("/leave-requests", payload);
  },
  createShiftChangeRequest(payload: any) {
    return api.post<ApiResponse<any>>("/shift-change-requests", payload);
  },
  approveLeaveRequest(id:number){
     return api.put<ApiResponse<any>>(`/leave-requests/${id}/approve`);
  },
   approveShiftRequest(id:number){
     return api.put<ApiResponse<any>>(`/shift-change-requests/${id}/approve`);
  }
};
