'use client';

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Wallet,
} from 'lucide-react';

import { SalaryItem } from '@/types/salary';

import {
  TableCell,
  TableRow,
} from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  salary: SalaryItem;

  checked?: boolean;

  onCheckedChange?: (
    checked: boolean
  ) => void;

  onView?: (salary: SalaryItem) => void;

  onEdit?: (salary: SalaryItem) => void;

  onPay?: (salary: SalaryItem) => void;
}

const formatCurrency = (value: number) =>
  value.toLocaleString('vi-VN') + ' ₫';

export default function SalaryTableRow({
  salary,
  checked = false,
  onCheckedChange,
  onView,
  onEdit,
  onPay,
}: Props) {
  return (
    <TableRow>

      <TableCell>

        <Checkbox
          checked={checked}
          onCheckedChange={(value) =>
            onCheckedChange?.(!!value)
          }
        />

      </TableCell>

      {/* Employee */}

      <TableCell>

        <div className="flex items-center gap-3">

          <Avatar className="h-10 w-10">

            <AvatarImage
              src={salary.avatar}
            />

            <AvatarFallback>

              {salary.employeeName
                .charAt(0)
                .toUpperCase()}

            </AvatarFallback>

          </Avatar>

          <div>

            <div className="font-medium">
              {salary.employeeName}
            </div>

            <div className="text-sm text-muted-foreground">
              {salary.employeeCode}
            </div>

          </div>

        </div>

      </TableCell>

      {/* Position */}

      <TableCell>

        {salary.position}

      </TableCell>

      {/* Working Days */}

      <TableCell className="text-center">

        {salary.workingDays}

      </TableCell>

      {/* OT */}

      <TableCell className="text-center">

        {salary.overtimeHours}h

      </TableCell>

      {/* Allowance */}

      <TableCell className="text-right text-green-600">

        + {formatCurrency(salary.allowance)}

      </TableCell>

      {/* Bonus */}

      <TableCell className="text-right text-green-600">

        + {formatCurrency(salary.bonus)}

      </TableCell>

      {/* Deduction */}

      <TableCell className="text-right text-red-600">

        - {formatCurrency(salary.deduction)}

      </TableCell>

      {/* Total */}

      <TableCell className="text-right font-semibold">

        {formatCurrency(
          salary.totalSalary
        )}

      </TableCell>

      {/* Status */}

      <TableCell className="text-center">

        {salary.status ===
          'pending' && (
          <Badge
            variant="secondary"
          >
            Chưa tính
          </Badge>
        )}

        {salary.status ===
          'calculated' && (
          <Badge>
            Đã tính
          </Badge>
        )}

        {salary.status ===
          'paid' && (
          <Badge className="bg-green-600">
            Đã thanh toán
          </Badge>
        )}

      </TableCell>

      {/* Actions */}

      <TableCell>

        <DropdownMenu>

          <DropdownMenuTrigger
            
          >
           
              <MoreHorizontal size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
          >

            <DropdownMenuItem
              onClick={() =>
                onView?.(salary)
              }
            >
              <Eye className="mr-2 h-4 w-4" />

              Xem chi tiết

            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                onEdit?.(salary)
              }
            >
              <Pencil className="mr-2 h-4 w-4" />

              Chỉnh sửa

            </DropdownMenuItem>

            {salary.status !==
              'paid' && (
              <DropdownMenuItem
                onClick={() =>
                  onPay?.(salary)
                }
              >
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