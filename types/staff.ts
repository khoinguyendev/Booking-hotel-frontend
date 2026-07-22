// types/staff.ts

export interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

export interface Attendance {
  id: number;
  shiftTime: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: string;
  note: string | null;
}

export interface WorkSchedule {
  id: number;
  workDate: string;
  isDayOff: boolean;
  shift: Shift;
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

