import { DashboardData } from "@/types/dashboardstaff";
import {
  CalendarDays,
  Clock3,
  Wallet,
  FileClock,
} from "lucide-react";
export const dashboardData: DashboardData = {
  employee: {
    id: 28,
    fullName: "Lê Văn C",
    employeeCode: "EMP002",
    position: "Lễ tân",
    avatar: "https://i.pravatar.cc/300?img=15",
  },

  todayShift: {
    shiftName: "Ca sáng",
    startTime: "07:00",
    endTime: "15:00",
    location: "Khách sạn Sunrise Luxury",
  },
statistics: [
  {
    title: "Ngày làm",
    value: 22,
    subtitle: "Trong tháng",
    icon: CalendarDays,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    trend: {
      value: "+2 ngày",
      positive: true,
    },
  },
  {
    title: "Giờ làm",
    value: "176h",
    subtitle: "Đã hoàn thành",
    icon: Clock3,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    trend: {
      value: "+6%",
      positive: true,
    },
  },
  {
    title: "Lương tháng",
    value: "10.500.000₫",
    subtitle: "Đã nhận",
    icon: Wallet,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    trend: {
      value: "+8%",
      positive: true,
    },
  },
  {
    title: "Đơn chờ",
    value: 3,
    subtitle: "Yêu cầu",
    icon: FileClock,
    iconColor: "text-red-600",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    trend: {
      value: "-1",
      positive: false,
    },
  },
],
  attendance: {
    checkIn: "06:56",
    checkOut: "15:03",
    workingHours: 8,
    overtimeHours: 1.5,
    status: "Present",
  },

  salary: {
    currentSalary: 9250000,
    expectedSalary: 10800000,
  },

  requests: {
    pending: 2,
    approved: 8,
    rejected: 1,
  },
  weeklyAttendance: [
  { day: "T2", hours: 8 },
  { day: "T3", hours: 8 },
  { day: "T4", hours: 7 },
  { day: "T5", hours: 10 },
  { day: "T6", hours: 8 },
  { day: "T7", hours: 5 },
  { day: "CN", hours: 0 },
],
    pendingRequests: [
    {
        id: 1,
        type: "Leave",
        date: "20/07/2026",
    },
    
    {
        id: 2,
        type: "Shift",
        date: "22/07/2026",
    },
    {
        id: 3,
        type: "Overtime",
        date: "25/07/2026",
    },
    ],
  weeklySchedules: [
    {
      day: "Thứ 2",
      date: "20/07",
      shiftName: "Ca sáng",
      startTime: "07:00",
      endTime: "15:00",
      isDayOff: false,
    },
    {
      day: "Thứ 3",
      date: "21/07",
      shiftName: "Ca chiều",
      startTime: "15:00",
      endTime: "23:00",
      isDayOff: false,
    },
    {
      day: "Thứ 4",
      date: "22/07",
      shiftName: "",
      startTime: "",
      endTime: "",
      isDayOff: true,
    },
    {
      day: "Thứ 5",
      date: "23/07",
      shiftName: "Ca sáng",
      startTime: "07:00",
      endTime: "15:00",
      isDayOff: false,
    },
    {
      day: "Thứ 6",
      date: "24/07",
      shiftName: "Ca tối",
      startTime: "23:00",
      endTime: "07:00",
      isDayOff: false,
    },
    {
      day: "Thứ 7",
      date: "25/07",
      shiftName: "Ca chiều",
      startTime: "15:00",
      endTime: "23:00",
      isDayOff: false,
    },
    {
      day: "CN",
      date: "26/07",
      shiftName: "",
      startTime: "",
      endTime: "",
      isDayOff: true,
    },
  ],

  attendanceChart: [
    { day: "1", hours: 8 },
    { day: "2", hours: 8 },
    { day: "3", hours: 9 },
    { day: "4", hours: 8 },
    { day: "5", hours: 0 },
    { day: "6", hours: 8 },
    { day: "7", hours: 10 },
    { day: "8", hours: 8 },
    { day: "9", hours: 8 },
    { day: "10", hours: 9 },
    { day: "11", hours: 8 },
    { day: "12", hours: 0 },
    { day: "13", hours: 8 },
    { day: "14", hours: 8 },
    { day: "15", hours: 8 },
    { day: "16", hours: 9 },
    { day: "17", hours: 8 },
    { day: "18", hours: 8 },
    { day: "19", hours: 8 },
    { day: "20", hours: 9 },
  ],

  attendancePie: [
    {
      name: "Có mặt",
      value: 18,
    },
    {
      name: "Đi trễ",
      value: 2,
    },
    {
      name: "Nghỉ phép",
      value: 1,
    },
    {
      name: "Vắng",
      value: 0,
    },
  ],

  salaryChart: [
    {
      month: "T1",
      salary: 8200000,
    },
    {
      month: "T2",
      salary: 8450000,
    },
    {
      month: "T3",
      salary: 8700000,
    },
    {
      month: "T4",
      salary: 9050000,
    },
    {
      month: "T5",
      salary: 9400000,
    },
    {
      month: "T6",
      salary: 9650000,
    },
    {
      month: "T7",
      salary: 10250000,
    },
  ],

 activities: [
  {
    id: 1,
    title: "Check-in",
    description: "Đã check-in lúc 06:56",
    time: "06:56",
    type: "attendance",
  },
  {
    id: 2,
    title: "Đổi ca",
    description: "Đơn đổi ca đã được phê duyệt",
    time: "Hôm qua",
    type: "request",
  },
  {
    id: 3,
    title: "Nhận lương",
    description: "Lương tháng 07 đã được chuyển khoản",
    time: "2 ngày trước",
    type: "salary",
  },
  {
    id: 4,
    title: "Check-out",
    description: "Hoàn thành ca làm lúc 15:03",
    time: "3 ngày trước",
    type: "checkout",
  },
  {
    id: 5,
    title: "Nghỉ phép",
    description: "Đơn nghỉ phép đã được duyệt",
    time: "1 tuần trước",
    type: "leave",
  },
],

  notices: [
  {
    id: 1,
    title: "Thay đổi lịch làm việc",
    content:
      "Ca làm ngày 22/07 đã được chuyển sang Ca chiều.",
    time: "10 phút trước",
    unread: true,
    type: "schedule",
  },
  {
    id: 2,
    title: "Thông báo họp nhân viên",
    content:
      "Toàn bộ nhân viên tham gia họp lúc 16:00 thứ Sáu tại phòng họp tầng 2.",
    time: "Hôm nay",
    unread: true,
    type: "announcement",
  },
  {
    id: 3,
    title: "Hoàn thành chấm công",
    content:
      "Vui lòng hoàn tất check-out trước khi rời khách sạn.",
    time: "Hôm qua",
    unread: false,
    type: "warning",
  },
],
};