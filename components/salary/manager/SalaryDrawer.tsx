"use client";

import {
  Banknote,
  Briefcase,
  Calendar,
  Clock3,
  Pencil,
  User,
  Wallet,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { SalaryItem } from "@/types/salary";
import SalaryBreakdown from "./SalaryBreakdown";
import SalaryHistory from "./SalaryHistory";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  salary?: SalaryItem;

  onEdit?: () => void;

  onPay?: () => void;
}

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + " ₫";

export default function SalaryDrawer({
  open,
  onOpenChange,
  salary,
  onEdit,
  onPay,
}: Props) {
  if (!salary) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="!w-full !max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Chi tiết bảng lương</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 p-8">
          {/* Employee */}

          <div className="flex items-center gap-4 rounded-2xl border p-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={salary.avatar} />

              <AvatarFallback>{salary.employeeName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{salary.employeeName}</h2>

              <p className="text-sm text-muted-foreground">
                {salary.employeeCode}
              </p>

              <Badge className="mt-2">{salary.position}</Badge>
            </div>
          </div>

          {/* General */}

          <div className="rounded-2xl border">
            <InfoRow
              icon={<Calendar size={18} />}
              label="Kỳ lương"
              value={`${salary.month}/${salary.year}`}
            />

            <InfoRow
              icon={<Clock3 size={18} />}
              label="Ngày công"
              value={`${salary.workingDays}`}
            />

            <InfoRow
              icon={<Briefcase size={18} />}
              label="OT"
              value={`${salary.overtimeHours} giờ`}
            />

            <InfoRow
              icon={<Banknote size={18} />}
              label="Thực nhận"
              value={formatCurrency(salary.totalSalary)}
            />
          </div>

          {/* Breakdown */}

          <SalaryBreakdown salary={salary} />

          {/* History */}

          <SalaryHistory employeeId={salary.employeeId} />

          {/* Footer */}

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>

            {salary.status !== "paid" && (
              <Button className="flex-1" onClick={onPay}>
                <Wallet className="mr-2 h-4 w-4" />
                Thanh toán
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;

  label: string;

  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b px-5 py-4 last:border-b-0">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}

        <span>{label}</span>
      </div>

      <span className="font-medium">{value}</span>
    </div>
  );
}
