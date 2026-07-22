import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { HotelStaff, Shift } from "@/types/staff";


export const shiftService = {
    getShifts() {
        return api.get<ApiResponse<Shift[]>>(
            "/shifts/hotel",
        );
    },
    
   
};