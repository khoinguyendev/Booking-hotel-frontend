import { Shift } from "./shift";

export interface CreateWorkScheduleRequest {
  hotelStaffId: number;
  shiftId: number;
  workDate: string;
  isDayOff: boolean;
}

export interface WorkScheduleResponse {
  id: number;
  workDate: string;
  isDayOff: boolean;
  shift: Shift;
  attendance: any;
}

export type ScheduleStatus = "Scheduled" | "DayOff" | "Unassigned" | "holiday";

// export interface Shift {
//   id: number;

//   name: string;

//   code?: string;

//   startTime: string;

//   endTime: string;

//   color?: string;
// }

export interface AttendanceInfo {
  checkedIn: boolean;

  checkedOut: boolean;

  checkInTime?: string;

  checkOutTime?: string;

  status?: "ON_TIME" | "LATE" | "EARLY_LEAVE" | "ABSENT";

  note?: string;
}

export interface ScheduleItem {
  id: number;

  workDate: string;

  shiftId?: number;

  shiftName?: string;

  startTime?: string;

  endTime?: string;

  isDayOff: boolean;

  status: ScheduleStatus;

  attendance?: AttendanceInfo;

  note?: string;
  overtime?:OvertimeItem|null
}
export interface OvertimeItem {
  id: number;
  policyId:number;
  startTime: string;
  endTime: string;
  hours: number;
  totalAmount: number;
  note: null;
}
export interface EmployeeSchedule {
  id: number;

  employeeCode: string;

  fullName: string;

  avatar?: string;

  phone?: string;

  email?: string;

  position: string;

  active: boolean;

  schedules: ScheduleItem[];
}

export interface ScheduleStats {
  totalEmployees: number;

  working: number;

  dayOff: number;

  morningShift: number;

  eveningShift: number;

  nightShift: number;
}

export interface PositionOption {
  value: string;

  label: string;
}

export interface ShiftOption {
  value: string;

  label: string;
}
