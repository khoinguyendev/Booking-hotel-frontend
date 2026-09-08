import { OvertimeResponse } from "@/services/overtimeService.service";
import { AttendanceStatus } from "./dashboardstaff";

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

  employeeId: number;

  employeeCode: string;

  fullName: string;

  avatar?: string;

  position: string;

  shift: string;

  workDate: string;
  overtime?:OvertimeResponse|null;

  checkInTime?: string;

  checkOutTime?: string;

  status: AttendanceType;
  note?: string;
}


export interface AttendanceStatsResponse {
  working: number;
  present: number;
  late: number;
  notCheckIn: number;
  absent: number;
  total:number
}

export interface CalendarAttendanceResponse {
  date: string;
  working: number;
  present: number;
  late: number;
  absent: number;
}

export enum AttendanceType {
  Absent = 0,
  Present = 1,
  Late = 2,
  Leave = 3,
  Holiday = 4,
}

export const ATTENDANCES_TYPE_LABEL: Record<AttendanceType, string> = {
  [AttendanceType.Absent]: "Vắng",
  [AttendanceType.Present]: "Đã checkin",
  [AttendanceType.Holiday]: "Nghỉ lễ",
  [AttendanceType.Late]: "Đi muộn",
  [AttendanceType.Leave]: "Nghỉ có phép",
};


export interface AttendanceHistoryResponse {
  id: number;

  workScheduleId: number;

  workDate: string;

  shiftId: number | null;

  shiftName: string | null;

  shiftStartTime: string | null;

  shiftEndTime: string | null;

  startTimeOt: string | null;

  endTimeOt: string | null;

  checkInTime: string | null;

  checkOutTime: string | null;

  status: AttendanceType;

  lateMinutes: number;

  earlyLeaveMinutes: number;

  penaltyAmount: number;

  note: string | null;
}

