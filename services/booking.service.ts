// services/booking.service.ts

export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  CheckedIn = 2,
  CheckedOut = 3,
  Cancelled = 4
}

export enum PaymentStatus {
  Unpaid = 0,
  Paid = 1,
  PartiallyPaid = 2
}

export interface BookingRecord {
  id: number;
  roomId: number;
  roomNumber: string;
  roomType: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  bookingCode: string;
  checkin: string;
  checkout: string;
  status: BookingStatus;
  total: number;
  paymentStatus: PaymentStatus;
}

export const getMockBookings = (): BookingRecord[] => [
  {
    id: 101,
    roomId: 12,
    roomNumber: "P.302",
    roomType: "Deluxe Double",
    customerId: 204,
    customerName: "Nguyễn Văn Hải",
    customerEmail: "hai.nguyen@gmail.com",
    bookingCode: "BK-8291-O9",
    checkin: "2026-07-16T14:00:00",
    checkout: "2026-07-18T12:00:00",
    status: BookingStatus.Confirmed,
    total: 2400000.00, // Đảm bảo giữ nguyên số thực không làm tròn theo yêu cầu của bạn
    paymentStatus: PaymentStatus.Paid
  },
  {
    id: 102,
    roomId: 5,
    roomNumber: "P.101",
    roomType: "Standard Single",
    customerId: 301,
    customerName: "Trần Thị Thu thảo",
    customerEmail: "thao.ttt@hotmail.com",
    bookingCode: "BK-4421-U3",
    checkin: "2026-07-16T14:00:00",
    checkout: "2026-07-17T12:00:00",
    status: BookingStatus.CheckedIn,
    total: 850000.00,
    paymentStatus: PaymentStatus.Paid
  },
  {
    id: 103,
    roomId: 24,
    roomNumber: "P.505",
    roomType: "VIP President Suite",
    customerId: 112,
    customerName: "Lê Hoàng Nam",
    customerEmail: "namle.99@gmail.com",
    bookingCode: "BK-0912-P9",
    checkin: "2026-07-20T14:00:00",
    checkout: "2026-07-25T12:00:00",
    status: BookingStatus.Pending,
    total: 15250000.00,
    paymentStatus: PaymentStatus.Unpaid
  },
  {
    id: 104,
    roomId: 8,
    roomNumber: "P.204",
    roomType: "Superior Twin",
    customerId: 88,
    customerName: "Marcus Aurelius",
    customerEmail: "marcus.philosopher@rome.edu",
    bookingCode: "BK-3012-X2",
    checkin: "2026-07-14T14:00:00",
    checkout: "2026-07-15T12:00:00",
    status: BookingStatus.CheckedOut,
    total: 1350000.00,
    paymentStatus: PaymentStatus.Paid
  }
];