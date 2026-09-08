"use client";

import { Calculator, Eye, MoreHorizontal, Pencil, Wallet } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SalaryResponseItem } from "@/types/salary";

interface Props {
  salary: SalaryResponseItem;

  checked?: boolean;

  onCheckedChange?: (checked: boolean) => void;

  onView?: (salary: SalaryResponseItem) => void;

  onEdit?: (salary: SalaryResponseItem) => void;
  onCaculate?: (salary: SalaryResponseItem) => void;

  onPay?: (salary: SalaryResponseItem) => void;
}

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + " ₫";

export default function SalaryTableRow({
  salary,
  checked = false,
  onCheckedChange,
  onView,
  onCaculate,
  onEdit,
  onPay,
}: Props) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => onCheckedChange?.(!!value)}
        />
      </TableCell>

      {/* Employee */}

      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={salary?.avatar || ""} />

            <AvatarFallback>
              {salary.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">{salary.fullName}</div>

            <div className="text-sm text-muted-foreground">
              {salary.employeeCode}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Position */}

      {/* <TableCell>{salary.position}</TableCell> */}

      {/* Working Days */}

      <TableCell className="text-center">{salary.workingDays}</TableCell>

      {/* OT */}

      <TableCell className="text-center">{salary.overtimeHours}h</TableCell>

      {/* Allowance */}
      <TableCell className="text-right text-green-600">
        + {formatCurrency(salary.shiftSalary)}
      </TableCell>
      <TableCell className="text-right text-green-600">
        + {formatCurrency(salary.overtimeSalary)}
      </TableCell>
      <TableCell className="text-right text-green-600">
        + {formatCurrency(salary.totalAllowance)}
      </TableCell>

      {/* Bonus */}

      <TableCell className="text-right text-green-600">
        + {formatCurrency(salary.totalBonus)}
      </TableCell>

      {/* Deduction */}

      <TableCell className="text-right text-red-600">
        - {formatCurrency(salary.totalDeduction)}
      </TableCell>

      {/* Total */}

      <TableCell className="text-right font-semibold">
        {formatCurrency(salary.netSalary)}
      </TableCell>

      {/* Status */}

      <TableCell className="text-center">
        {salary.status === 1 && <Badge variant="secondary">Chưa tính</Badge>}

        {salary.status === 2 && <Badge>Đã tính</Badge>}

        {salary.status === 4 && (
          <Badge className="bg-green-600">Đã thanh toán</Badge>
        )}
      </TableCell>

      {/* Actions */}

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(salary)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit?.(salary)}>
              <Pencil className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCaculate?.(salary)}>
              <Calculator className="mr-2 h-4 w-4" />
              Tính lương
            </DropdownMenuItem>
            {salary.status !== 4 && (
              <DropdownMenuItem onClick={() => onPay?.(salary)}>
                <Wallet className="mr-2 h-4 w-4" />
                Thanh toán
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
