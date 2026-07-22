"use client";

import { Bell, CalendarDays, Sparkles } from "lucide-react";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DashboardData } from "@/types/dashboardstaff";


interface Props {
  employee: DashboardData["employee"];
}

export default function DashboardHeader({ employee }: Props) {
  const today = format(new Date(), "EEEE, dd/MM/yyyy", {
    locale: vi,
  });

  return (
    <div
      className="
        rounded-3xl
        bg-gradient-to-r
        from-[#007AFF]
        via-[#4DA3FF]
        to-[#5AC8FA]
        p-8
        text-white
        shadow-lg
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} />

            <span className="text-sm font-semibold opacity-90">
              Employee Dashboard
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-black">
            Xin chào, {employee.fullName} 👋
          </h1>

          <p className="mt-3 max-w-xl text-white/90">
            Chúc bạn có một ngày làm việc hiệu quả.
            Theo dõi lịch làm, chấm công, lương và
            các thông báo mới nhất ngay tại đây.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 backdrop-blur">
              <CalendarDays size={18} />

              <span className="text-sm font-medium capitalize">
                {today}
              </span>
            </div>

            <div className="rounded-2xl bg-green-500/20 px-4 py-2">
              <span className="text-sm font-semibold">
                🟢 Đang hoạt động
              </span>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5 rounded-3xl bg-white/15 p-6 backdrop-blur">
          <img
            src={
              employee.avatar ??
              "https://ui-avatars.com/api/?name=Employee"
            }
            alt={employee.fullName}
            className="h-20 w-20 rounded-full border-4 border-white object-cover"
          />

          <div>
            <h3 className="text-xl font-bold">
              {employee.fullName}
            </h3>

            <p className="mt-1 text-sm text-white/80">
              {employee.position}
            </p>

            <p className="mt-1 text-xs text-white/70">
              {employee.employeeCode}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#007AFF]">
              <Bell size={16} />

              <span className="text-xs font-bold">
                3 thông báo mới
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}