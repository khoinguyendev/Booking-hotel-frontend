"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CalendarDays, FileText } from "lucide-react";

import { SalaryDetail } from "@/types/salary";
import { formatCurrency } from "@/utils/format";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail?: SalaryDetail | null;
}

function getTypeColor(type: SalaryDetail["type"]) {
  switch (type) {
    case "Allowance":
      return "bg-blue-100 text-blue-700";

    case "Bonus":
      return "bg-green-100 text-green-700";

    case "Deduction":
      return "bg-red-100 text-red-700";

    case "Overtime":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getTypeName(type: SalaryDetail["type"]) {
  switch (type) {
    case "Allowance":
      return "Phụ cấp";

    case "Bonus":
      return "Thưởng";

    case "Deduction":
      return "Khấu trừ";

    case "Overtime":
      return "Lương OT";

    default:
      return "Khác";
  }
}

export default function SalaryDetailDialog({
  open,
  onOpenChange,
  detail,
}: Props) {
  if (!detail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Chi tiết khoản lương
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#8E8E93]">Loại</span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${getTypeColor(
                detail.type
              )}`}
            >
              {getTypeName(detail.type)}
            </span>
          </div>

          <div>
            <p className="text-sm text-[#8E8E93]">Tên khoản</p>

            <p className="mt-1 text-lg font-bold">
              {detail.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#8E8E93]">Số tiền</p>

            <p className="mt-1 text-3xl font-black text-[#007AFF]">
              {formatCurrency(detail.amount)}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText size={18} />

              <span className="font-semibold">
                Mô tả
              </span>
            </div>

            <div className="rounded-2xl bg-[#F7F7F8] p-4 text-sm dark:bg-[#2C2C2E]">
              {detail.description || "Không có mô tả"}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#8E8E93]">
            <CalendarDays size={16} />

            <span>
              Tạo lúc {detail.createdAt}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}