"use client";

import { SalaryResponseItem } from "@/types/salary";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  Briefcase,
  Clock3,
  Wallet,
} from "lucide-react";

interface Props {
  salary: SalaryResponseItem;
}

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + " ₫";

export default function SalaryBreakdown({ salary }: Props) {
  // Có thể đổi thành salary.basicSalary nếu sau này thêm field
  const basicSalary =
    salary.shiftSalary +
    salary.overtimeSalary +
    salary.totalAllowance +
    salary.totalBonus -
    salary.totalDeduction;

  return (
    <div className="rounded-2xl border bg-white dark:bg-[#1C1C1E]">
      <div className="border-b px-5 py-4">
        <h3 className="font-semibold">Chi tiết lương</h3>
      </div>

      <div className="divide-y">
        <BreakdownItem
          icon={<Banknote size={18} />}
          label="Lương cơ bản"
          value={salary.shiftSalary}
        />

        <BreakdownItem
          icon={<Clock3 size={18} />}
          label={`OT (${salary.overtimeHours} giờ)`}
          value={salary.overtimeSalary}
        />

        <BreakdownItem
          icon={<ArrowUpCircle size={18} />}
          label="Phụ cấp"
          value={salary.totalAllowance}
          positive
        />

        <BreakdownItem
          icon={<Briefcase size={18} />}
          label="Thưởng"
          value={salary.totalBonus}
          positive
        />

        <BreakdownItem
          icon={<ArrowDownCircle size={18} />}
          label="Khấu trừ"
          value={salary.totalDeduction}
          negative
        />
      </div>

      <div className="flex items-center justify-between rounded-b-2xl bg-muted px-5 py-5">
        <div className="flex items-center gap-3">
          <Wallet size={20} />

          <span className="text-lg font-semibold">Thực nhận</span>
        </div>

        <span className="text-xl font-bold text-green-600">
          {formatCurrency(basicSalary)}
        </span>
      </div>
    </div>
  );
}

interface BreakdownItemProps {
  icon: React.ReactNode;

  label: string;

  value: number;

  positive?: boolean;

  negative?: boolean;
}

function BreakdownItem({
  icon,
  label,
  value,
  positive,
  negative,
}: BreakdownItemProps) {
  const color = positive ? "text-green-600" : negative ? "text-red-600" : "";

  const prefix = positive ? "+ " : negative ? "- " : "";

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}

        <span>{label}</span>
      </div>

      <span className={`font-medium ${color}`}>
        {prefix}
        {formatCurrency(value)}
      </span>
    </div>
  );
}
