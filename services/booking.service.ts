import api from "@/lib/axios";

import { Booking, BookingStatus, PaymentStatus } from "@/types/booking";

import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";

/* ========================================================= */
/* Request Types                                               */
/* ========================================================= */

export interface GetBookingsParams {
  page?: number;

  pageSize?: number;

  search?: string;

  status?: BookingStatus;

  checkinFrom?: string;

  checkinTo?: string;

  paymentStatus?: PaymentStatus;
}
export interface GetStatusParams {
  month: number;
  year: number;
}
export interface CreateBookingRequest {
  roomTypeId: number;

  customerId?: number | null;

  guestName: string;

  guestEmail: string;

  guestPhone: string;

  checkin: string;

  checkout: string;

  roomQuantity: number;

  depositAmount?: number;
}

export interface UpdateBookingRequest {
  roomTypeId?: number;

  guestName?: string;

  guestEmail?: string;

  guestPhone?: string;

  checkin?: string;

  checkout?: string;

  roomQuantity?: number;
}

export interface CancelBookingRequest {
  reason?: string;
}

/* ========================================================= */
/* Response Types                                              */
/* ========================================================= */

export interface BookingStatsData {
  month: number;
  year: number;
  totalBookings: number;

  pendingBookings: number;

  confirmedBookings: number;

  totalRevenue: number;

  paidAmount: number;
}

/* ========================================================= */
/* Service                                                     */
/* ========================================================= */

export const bookingService = {
  /* ======================================================= */
  /* Get list                                                  */
  /* ======================================================= */

  getBookings(params?: GetBookingsParams) {
    return api.get<ApiResponse<PaginatedResponse<Booking>>>("/bookings", {
      params,
    });
  },

  /* ======================================================= */
  /* Get detail                                                */
  /* ======================================================= */

  getById(id: number) {
    return api.get<ApiResponse<Booking>>(`/bookings/${id}`);
  },

  /* ======================================================= */
  /* Get by booking code                                       */
  /* ======================================================= */

  getByCode(code: string) {
    return api.get<ApiResponse<Booking>>(`/bookings/code/${code}`);
  },

  /* ======================================================= */
  /* Create                                                    */
  /* ======================================================= */

  createBooking(data: CreateBookingRequest) {
    return api.post<ApiResponse<Booking>>("/bookings", data);
  },

  /* ======================================================= */
  /* Update                                                    */
  /* ======================================================= */

  updateBooking(id: number, data: UpdateBookingRequest) {
    return api.put<ApiResponse<Booking>>(`/bookings/${id}`, data);
  },

  /* ======================================================= */
  /* Confirm                                                   */
  /* ======================================================= */

  confirmBooking(id: number) {
    return api.patch<ApiResponse<Booking>>(`/bookings/${id}/confirm`);
  },

  /* ======================================================= */
  /* Check-in                                                   */
  /* ======================================================= */

  checkIn(id: number) {
    return api.patch<ApiResponse<Booking>>(`/bookings/${id}/check-in`);
  },

  /* ======================================================= */
  /* Check-out                                                  */
  /* ======================================================= */

  checkOut(id: number) {
    return api.patch<ApiResponse<Booking>>(`/bookings/${id}/check-out`);
  },

  /* ======================================================= */
  /* Cancel                                                    */
  /* ======================================================= */

  cancelBooking(id: number, data: CancelBookingRequest) {
    return api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`, data);
  },

  /* ======================================================= */
  /* Stats                                                      */
  /* ======================================================= */

  getStats(params: GetStatusParams) {
    return api.get<ApiResponse<BookingStatsData>>("/bookings/stats",{
      params,
    });
  },

  /* ======================================================= */
  /* Import                                                     */
  /* ======================================================= */

  importBookings(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    return api.post<ApiResponse<any>>("/bookings/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /* ======================================================= */
  /* Export                                                     */
  /* ======================================================= */

  exportBookings(params?: GetBookingsParams) {
    return api.get("/bookings/export", {
      params,

      responseType: "blob",
    });
  },
};
