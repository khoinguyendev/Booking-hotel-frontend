"use client";

import AttendanceHistory from "@/components/attendance/employee/AttendanceHistory";
import AttendanceStatistic from "@/components/attendance/employee/AttendanceStatistic";
import EmployeeCard from "@/components/attendance/employee/EmployeeCard";
import MonthlyChart from "@/components/attendance/employee/MonthlyChart";
import MonthNavigator from "@/components/attendance/employee/MonthNavigator";
import TodayAttendanceCard from "@/components/attendance/employee/TodayAttendanceCard";
import { attendanceMockData } from "@/data/mock";
import { useAttendanceHistory } from "@/hooks/useAttendanceStaff";
import { useState } from "react";

export default function EmployeeAttendance() {
  const employee = attendanceMockData[0];
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const { records, loading, refetch } = useAttendanceHistory({
    month,
    year,
  });
  console.log(records, "con cho");
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
        {/* Month Navigator */}{" "}
        <MonthNavigator
          month={month}
          year={year}
          onChange={(newMonth, newYear) => {
            setMonth(newMonth);
            setYear(newYear);
          }}
        />
        <AttendanceStatistic records={records} />
        {/* Chart + History */}
        <div className="grid min-w-0 gap-6 xl:grid-cols-3">
          <div className="min-w-0">
            <MonthlyChart records={records} />
          </div>

          <div className="min-w-0 xl:col-span-2">
            <AttendanceHistory records={records} />
          </div>
        </div>
      </div>
    </div>
  );
}
