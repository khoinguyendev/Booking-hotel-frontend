"use client";

import AttendanceCard from "@/components/dashboard/employee/AttendanceCard";
import AttendanceStatusPieChart from "@/components/dashboard/employee/AttendanceStatusPieChart";
import AttendanceWeeklyChart from "@/components/dashboard/employee/AttendanceWeeklyChart";
import DashboardHeader from "@/components/dashboard/employee/DashboardHeader";
import NoticeCard from "@/components/dashboard/employee/NoticeCard";
import PendingRequestCard from "@/components/dashboard/employee/PendingRequestCard";
import RecentActivities from "@/components/dashboard/employee/RecentActivities";
import SalaryCard from "@/components/dashboard/employee/SalaryCard";
import SalaryTrendChart from "@/components/dashboard/employee/SalaryTrendChart";
import StatisticCard from "@/components/dashboard/employee/StatisticCard";
import TodayShiftCard from "@/components/dashboard/employee/TodayShiftCard";
import WeeklyScheduleCard from "@/components/dashboard/employee/WeeklyScheduleCard";
import { dashboardData } from "@/data/mock2";

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6 p-6 bg-[#F5F7FB] dark:bg-[#000] min-h-screen">
      {/* Header */}

      <DashboardHeader employee={dashboardData.employee} />

      {/* Statistic */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardData.statistics.map((item) => (
          <StatisticCard key={item.title} statistic={item} />
        ))}
      </div>

      {/* Shift + Attendance + Salary + Request */}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <TodayShiftCard shift={dashboardData.todayShift} />

        <AttendanceCard attendance={dashboardData.attendance} />

        <SalaryCard salary={dashboardData.salary} />

        <PendingRequestCard requests={dashboardData.pendingRequests} />
      </div>

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AttendanceWeeklyChart data={dashboardData.weeklyAttendance} />
        </div>

        <AttendanceStatusPieChart data={dashboardData.attendancePie} />
      </div>

      {/* Salary + Weekly Schedule */}

      <div className="grid gap-6 xl:grid-cols-2">
        <SalaryTrendChart data={dashboardData.salaryChart} />

        <WeeklyScheduleCard schedules={dashboardData.weeklySchedules} />
      </div>

      {/* Timeline + Notice */}

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentActivities activities={dashboardData.activities} />

        <NoticeCard notices={dashboardData.notices} />
      </div>
    </div>
  );
}
