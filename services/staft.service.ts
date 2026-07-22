import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { HotelStaff } from "@/types/staff";


export const staffService = {
    getEmployee() {
        return api.get<ApiResponse<PaginatedResponse<HotelStaff>>>(
            "/hotel-staffs/attendance",
        );
    },
    getWorkScheduleByMe(year: string, month: string) {
        return api.get<ApiResponse<any>>(
            `/hotel-staffs/me/work-schedules?year=${year}&month=${month}`,
        );
    },
    getWorkScheduleByEmployee(employeeId: string, year: string, month: string) {
        return api.get<ApiResponse<any>>(
            `/hotel-staffs/${employeeId}/work-schedules?year=${year}&month=${month}`,
        );
    }
};