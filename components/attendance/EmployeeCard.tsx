"use client";

import { AttendanceRecord } from "@/types/attendance";
import { Mail, Phone, BadgeCheck, User } from "lucide-react";


interface Props {
  employee: AttendanceRecord;
}

export default function EmployeeCard({ employee }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
      {/* Header */}

      <div className="bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] px-6 py-8 text-white">
        <div className="flex flex-col items-center">
          {employee.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.fullName}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur">
              <User size={42} />
            </div>
          )}

          <h2 className="mt-4 text-2xl font-black">{employee.fullName}</h2>

          <p className="mt-1 text-sm opacity-90">{employee.position}</p>

          <div className="mt-4 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur">
            {employee.employeeCode}
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-950/30">
            <Mail size={18} className="text-[#007AFF]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-[#8E8E93]">Email</p>

            <p className="truncate text-sm font-semibold">
              {employee.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-green-50 p-3 dark:bg-green-950/30">
            <Phone size={18} className="text-green-600" />
          </div>

          <div>
            <p className="text-xs text-[#8E8E93]">Số điện thoại</p>

            <p className="text-sm font-semibold">{employee.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-orange-50 p-3 dark:bg-orange-950/30">
            <BadgeCheck size={18} className="text-orange-500" />
          </div>

          <div>
            <p className="text-xs text-[#8E8E93]">Trạng thái</p>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                employee.status
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {employee.status ? "Đang làm việc" : "Đã nghỉ"}
            </span>
          </div>
        </div>

        <div className="border-t pt-5 dark:border-[#2C2C2E]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8E8E93]">Ngày vào làm</span>

            <span className="font-semibold">
              {new Date(employee.joinedAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}