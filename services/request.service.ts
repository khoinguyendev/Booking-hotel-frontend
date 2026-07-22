import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { LeaveRequest, ShiftChangeRequest, StaffRequest } from "@/types/requests";


export const requestService = {
    getEmployeeRequests() {
        return api.get<ApiResponse<StaffRequest[]>>(
            "/staff-requests/me",
        );
    },
    deleteRequest(requestId: number) {
        return api.delete<ApiResponse<null>>(
            `/staff-requests/${requestId}`,
        );
    },
    createLeaveRequest(payload: { fromDate: string; toDate: string; reason: string }) {
        return api.post<ApiResponse<LeaveRequest>>(
            "/leave-requests",
            payload
        );
    },
    createShiftChangeRequest(payload: ShiftChangeRequest) {
        return api.post<ApiResponse<any>>(
            "/shift-change-requests",
            payload
        );
    }
   
};