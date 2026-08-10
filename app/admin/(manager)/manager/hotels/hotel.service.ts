import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

import { Hotel } from "./type";

export const hotelService = {
    getHotelByManager(){
        return api.get<ApiResponse<Hotel>>(
            "/hotels/manager",
        );
    },
    updateHotelByManager(data:any){
        return api.put<ApiResponse<any>>(
            "/hotels",
            data
        )
    }
    
};