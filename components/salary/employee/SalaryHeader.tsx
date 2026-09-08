"use client";

import { CalendarDays, Wallet } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import SalaryStatusBadge from "./SalaryStatusBadge";
import { Salary } from "@/types/salary";

interface Props {
  salary: Salary;
}

export default function SalaryHeader({ salary }: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-[#007AFF]
        via-[#3B82F6]
        to-[#5AC8FA]
        p-8
        text-white
        shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">
            Lương tháng {salary.month}/{salary.year}
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {salary.netSalary.toLocaleString("vi-VN")}đ
          </h1>

          <div className="mt-6">
            <SalaryStatusBadge isPaid={salary.isPaid} />
          </div>
        </div>

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
            bg-white/20
            backdrop-blur
          "
        >
          <Wallet size={34} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-white/80">
            <CalendarDays size={16} />
            <span className="text-sm">Ngày thanh toán</span>
          </div>

          <p className="mt-2 text-lg font-bold">
            {salary.paidAt
              ? format(new Date(salary.paidAt), "dd/MM/yyyy", {
                  locale: vi,
                })
              : "--/--/----"}
          </p>
        </div>

        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
          <p className="text-sm text-white/80">
            Tổng thu nhập tháng này
          </p>

          <p className="mt-2 text-lg font-bold">
            {(
              salary.basicSalary +
              salary.totalAllowance +
              salary.totalBonus +
              salary.overtimeSalary
            ).toLocaleString("vi-VN")}
            đ
          </p>
        </div>
      </div>
    </div>
  );
}