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
  status: "Present" | "Absent" | "Late" | "Leave";
  note: string | null;
}

export interface WorkSchedule {
  id: number;
  workDate: string;
  isDayOff: boolean;
  shift: Shift | null;
  attendance: Attendance | null;
}

export interface AttendanceRecord {
  id: number;
  userId: number;
  fullName: string;
  employeeCode: string;
  email: string;
  phone: string;
  avatar: string | null;
  position: string;
  joinedAt: string;
  status: boolean;
  workSchedule: WorkSchedule;
}