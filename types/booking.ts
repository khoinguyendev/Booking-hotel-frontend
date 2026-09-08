import { AvailableRoomTypeResponse } from "./roomtype";

export interface BookingDraft {
  hotelId: number;
  roomTypeId: number;

  hotelName?: string;

  checkIn: string;
  checkOut: string;

  guests: number;
  rooms: number;

  room: AvailableRoomTypeResponse;
}

export enum BookingStatus {
  Pending = 1,
  Confirmed = 2,
  CheckedIn = 3,
  CheckedOut = 4,
  Cancelled =5,
  NoShow = 6,
  Expired = 7,
}

export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Failed = 3,
  Expired = 4,
  Refunded = 5,
}

export interface BookingPayment {
  id: number;
  bookingId: number;
  amount: number;
  method: number;
  status: PaymentStatus;
  transactionCode?: string | null;
  providerTransactionId?: string | null;
  providerSessionId?: string | null;
  paidAt?: string | null;
  expiresAt?: string | null;
  failureReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;

  roomTypeId: number;
  roomTypeName?: string;

  customerId?: number | null;

  bookingCode: string;

  guestName: string;
  guestEmail: string;
  guestPhone: string;

  checkin: string;
  checkout: string;

  status: BookingStatus;

  roomQuantity: number;

  total: number;
  depositAmount: number;
  paidAmount: number;
  remainingAmount: number;

  actualCheckinAt?: string | null;
  actualCheckoutAt?: string | null;

  expiresAt?: string | null;

  cancelledAt?: string | null;
  cancellationReason?: string | null;

  createdAt: string;
  updatedAt?: string | null;

  payments?: BookingPayment[];
}

