"use client";

import AttendanceCard from "@/components/dashbordstaff/AttendanceCard";
import AttendanceStatusPieChart from "@/components/dashbordstaff/AttendanceStatusPieChart";
import AttendanceWeeklyChart from "@/components/dashbordstaff/AttendanceWeeklyChart";
import DashboardHeader from "@/components/dashbordstaff/DashboardHeader";
import NoticeCard from "@/components/dashbordstaff/NoticeCard";
import PendingRequestCard from "@/components/dashbordstaff/PendingRequestCard";
import RecentActivities from "@/components/dashbordstaff/RecentActivities";
import SalaryCard from "@/components/dashbordstaff/SalaryCard";
import SalaryTrendChart from "@/components/dashbordstaff/SalaryTrendChart";
import StatisticCard from "@/components/dashbordstaff/StatisticCard";
import TodayShiftCard from "@/components/dashbordstaff/TodayShiftCard";
import WeeklyScheduleCard from "@/components/dashbordstaff/WeeklyScheduleCard";
import { dashboardData } from "@/data/mock2";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6 bg-[#F5F7FB] dark:bg-[#000] min-h-screen">
      {/* Header */}

      <DashboardHeader employee={dashboardData.employee} />

      {/* Statistic */}

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {dashboardData.statistics.map((item) => (
    <StatisticCard
      key={item.title}
      statistic={item}
    />
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
