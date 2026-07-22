"use client";

import AttendanceHistory from "@/components/attendance/AttendanceHistory";
import AttendanceStatistic from "@/components/attendance/AttendanceStatistic";
import EmployeeCard from "@/components/attendance/EmployeeCard";
import MonthlyChart from "@/components/attendance/MonthlyChart";
import TodayAttendanceCard from "@/components/attendance/TodayAttendanceCard";
import { attendanceMockData } from "@/data/mock";

export default function AttendancePage() {
  const employee = attendanceMockData[0];

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-6 dark:bg-[#000000]">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Chấm công của tôi
          </h1>

          <p className="mt-2 text-sm text-[#8E8E93]">
            Theo dõi lịch làm việc, thời gian check in/check out và thống kê
            chấm công.
          </p>
        </div>

        {/* Top */}

        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <EmployeeCard employee={employee} />
          </div>

          <div className="lg:col-span-2">
    <TodayAttendanceCard schedule={employee.workSchedule} />
  </div>
        </div>

        {/* Statistics */}

        <AttendanceStatistic records={attendanceMockData} />

        {/* Chart + History */}

        <div className="grid gap-6 xl:grid-cols-3">
          <div>
            <MonthlyChart records={attendanceMockData} />
          </div>

          <div className="xl:col-span-2">
            <AttendanceHistory records={attendanceMockData} />
          </div>
        </div>
      </div>
    </div>
  );
}
