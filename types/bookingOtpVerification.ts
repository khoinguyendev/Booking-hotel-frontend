export interface CreateBookingOtpVerificationRequest {
  roomTypeId: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkin: string;
  checkout: string;
  guests: number;
  roomQuantity: number;
}

export interface CreateBookingOtpVerificationResponse {
  verificationId: number;
  expiresAt: string;
}