"use client";


import { Salary } from "@/types/salary";
import SalaryStatusBadge from "./SalaryStatusBadge";
import { formatCurrency } from "@/utils/format";

interface Props {
  salaries: Salary[];
  onSelect?: (salary: Salary) => void;
}

export default function SalaryHistoryTable({
  salaries,
  onSelect,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        shadow-sm
        overflow-hidden
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="border-b border-[#E5E5EA] p-6 dark:border-[#2C2C2E]">
        <h2 className="text-xl font-bold">
          Lịch sử bảng lương
        </h2>

        <p className="mt-1 text-sm text-[#8E8E93]">
          Các kỳ lương trước đây
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F7F8] dark:bg-[#2C2C2E]">
            <tr className="text-left text-sm">
              <th className="px-6 py-4 font-semibold">Tháng</th>
              <th className="px-6 py-4 font-semibold">Ngày công</th>
              <th className="px-6 py-4 font-semibold">OT</th>
              <th className="px-6 py-4 font-semibold">Thực nhận</th>
              <th className="px-6 py-4 font-semibold">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {salaries.map((salary) => (
              <tr
                key={salary.id}
                onClick={() => onSelect?.(salary)}
                className="
                  cursor-pointer
                  border-t
                  border-[#F2F2F7]
                  transition
                  hover:bg-[#F9FAFB]
                  dark:border-[#2C2C2E]
                  dark:hover:bg-[#2C2C2E]
                "
              >
                <td className="px-6 py-4 font-semibold">
                  {salary.month}/{salary.year}
                </td>

                <td className="px-6 py-4">
                  {salary.workingDays} ngày
                </td>

                <td className="px-6 py-4">
                  {salary.overtimeHours} giờ
                </td>

                <td className="px-6 py-4 font-bold text-green-600">
                  {formatCurrency(salary.netSalary)}
                </td>

                <td className="px-6 py-4">
                  <SalaryStatusBadge
                    isPaid={salary.isPaid}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}