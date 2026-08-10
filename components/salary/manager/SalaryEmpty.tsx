'use client';

import { Wallet } from 'lucide-react';

import {
  TableCell,
  TableRow,
} from '@/components/ui/table';

interface Props {
  colSpan?: number;
}

export default function SalaryEmpty({
  colSpan = 11,
}: Props) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-60"
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#F2F2F7]

              dark:bg-[#2C2C2E]
            "
          >
            <Wallet
              size={32}
              className="text-[#8E8E93]"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Chưa có dữ liệu lương
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Hãy chọn tháng khác hoặc tính
              lương cho nhân viên.
            </p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}