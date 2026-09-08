export type RequestNotificationType =
  | "leave"
  | "shift"
  | "overtime";

export interface RequestNotification {
requestId:number;
  name: string;
  employeeCode: string;
  position?: string | null;
  avatar?: string | null;

  title: string;
  description?: string | null;

  type: RequestNotificationType;

  // Dữ liệu riêng của StaffRequest
  currentWorkDate?: string | null;
  newWorkDate?: string | null;

  currentShiftName?: string | null;
  newShiftName?: string | null;

  fromDate?: string | null;
  toDate?: string | null;

  // Sau này overtime thêm field ở đây
  [key: string]: unknown;
}

export interface PaymentNotification {
  bookingId: number;
  bookingCode: string;

  paymentId: number;
  amount: number;

  guestName: string;

  paymentMethod: string;
  paymentStatus: string;

  bookingStatus: string;

  paidAmount: number;
  remainingAmount: number;

  paidAt: string | null;
}
