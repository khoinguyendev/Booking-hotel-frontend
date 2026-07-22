import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { HotelStaff } from "@/types/staff";


export const workService = {
    createWork(data: any) {
        return api.post<ApiResponse<any>>(
            "/work-schedules",
            data
        );
    },
    
};