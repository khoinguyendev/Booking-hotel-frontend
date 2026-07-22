export type AttendanceStatus =
  | "Present"
  | "Late"
  | "Absent"
  | "Leave";

export interface EmployeeInfo {
  id: number;
  fullName: string;
  employeeCode: string;
  position: string;
  avatar?: string;
}

export interface TodayShift {
  shiftName: string;
  startTime: string;
  endTime: string;
  location: string;
}

export interface AttendanceSummary {
  checkIn?: string;
  checkOut?: string;
  workingHours: number;
  overtimeHours: number;
  status: AttendanceStatus;
}

export interface SalarySummary {
  currentSalary: number;
  expectedSalary: number;
}

export interface RequestSummary {
  pending: number;
  approved: number;
  rejected: number;
}

export interface WeeklyScheduleItem {
  day: string;
  date: string;
  shiftName: string;
  startTime: string;
  endTime: string;
  isDayOff: boolean;
}

export interface AttendanceChartItem {
  day: string;
  hours: number;
}

export interface AttendancePieItem {
  name: string;
  value: number;
}

export interface SalaryChartItem {
  month: string;
  salary: number;
}

export interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type:
    | "attendance"
    | "checkout"
    | "request"
    | "leave"
    | "salary";
}
import { LucideIcon } from "lucide-react";

export interface Statistic {
  title: string;

  value: string | number;
  subtitle?: string;

  icon: LucideIcon;

  iconColor?: string;

  iconBg?: string;

  trend?: {
    value: string;
    positive: boolean;
  };
}
export interface NoticeItem {
  id: number;

  title: string;

  content: string;

  time: string;

  unread: boolean;

  type:
    | "announcement"
    | "schedule"
    | "warning";
}
export interface PendingRequest {
  id: number;
  type: "Leave" | "Shift" | "Overtime";
  date: string;
}
export interface WeeklyAttendance {
  day: string;
  hours: number;
}
export interface DashboardData {
  employee: EmployeeInfo;
    pendingRequests:PendingRequest[];
  todayShift: TodayShift;
    weeklyAttendance:WeeklyAttendance[];
  attendance: AttendanceSummary;

  salary: SalarySummary;

  requests: RequestSummary;
statistics: Statistic[];
  weeklySchedules: WeeklyScheduleItem[];

  attendanceChart: AttendanceChartItem[];

  attendancePie: AttendancePieItem[];

  salaryChart: SalaryChartItem[];

  activities: ActivityItem[];

  notices: NoticeItem[];
}