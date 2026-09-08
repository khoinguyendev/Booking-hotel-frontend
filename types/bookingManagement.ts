export interface BookingManagementResponse {
  bookingCode: string;

  hotelName: string;
  hotelSlug: string;
  city: string;
  region: string;

  roomTypeName: string;
  roomQuantity: number;
  guests: number;

  checkin: string;
  checkout: string;

  guestName: string;
  guestEmail: string;
  guestPhone: string;

  status: number;

  total: number;
  depositAmount: number;
  paidAmount: number;
  remainingAmount: number;

  paymentStatus: number;

  expiresAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
}
