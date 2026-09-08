"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  checked?: boolean;

  onCheckedChange?: (checked: boolean) => void;
}

export default function SalaryTableHeader({
  checked = false,
  onCheckedChange,
}: Props) {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-12">
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => onCheckedChange?.(!!value)}
          />
        </TableHead>

        <TableHead className="min-w-[260px]">Nhân viên</TableHead>

        {/* <TableHead>Chức vụ</TableHead> */}

        <TableHead className="text-center">Ngày công</TableHead>

        <TableHead className="text-center">OT</TableHead>
        <TableHead className="text-right">Lương tháng</TableHead>
        <TableHead className="text-right">Lương OT</TableHead>

        <TableHead className="text-right">Phụ cấp</TableHead>

        <TableHead className="text-right">Thưởng</TableHead>

        <TableHead className="text-right">Khấu trừ</TableHead>

        <TableHead className="text-right">Thực nhận</TableHead>

        <TableHead className="text-center">Trạng thái</TableHead>

        <TableHead className="w-[110px] text-center">Thao tác</TableHead>
      </TableRow>
    </TableHeader>
  );
}
