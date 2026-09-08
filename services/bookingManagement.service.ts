import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { BookingManagementResponse } from "@/types/bookingManagement";

export const bookingManagementService = {
  getBooking(token: string) {
    return api.get<ApiResponse<BookingManagementResponse>>(
      `/booking-management/${token}`,
    );
  },
};
