export interface CreateHotelStaffRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  hotelId: number;
  positionId: number;
  role: string;
  codeId: string;
}

export interface Attendance {
  id: number;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: string;
  note: string | null;
}

export interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

export interface WorkSchedule {
  id: number;
  workDate: string;
  isDayOff: boolean;
  shift: Shift | null;
  attendance: Attendance | null;
}

export interface HotelStaff {
  id: number;
  userId: number;
  fullName: string;
  employeeCode: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  position: string;
  joinedAt: string;
  status: boolean;
  workSchedule: WorkSchedule | null;
}

export interface HotelStaffPaging {
  items: HotelStaff[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
  errors: unknown;
}