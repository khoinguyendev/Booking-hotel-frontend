'use client';

import {
  Calendar,
  CheckCircle2,
  Clock3,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

interface SalaryHistoryItem {
  id: number;

  month: number;

  year: number;

  totalSalary: number;

  paidDate?: string;

  status: 'paid' | 'calculated' | 'pending';
}

interface Props {
  employeeId: number;

  histories?: SalaryHistoryItem[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString('vi-VN') + ' ₫';

export default function SalaryHistory({
  histories = [],
}: Props) {
  const data =
    histories.length > 0
      ? histories
      : [
          {
            id: 1,
            month: 7,
            year: 2026,
            totalSalary: 11200000,
            paidDate: '05/08/2026',
            status: 'paid',
          },
          {
            id: 2,
            month: 6,
            year: 2026,
            totalSalary: 10800000,
            paidDate: '05/07/2026',
            status: 'paid',
          },
          {
            id: 3,
            month: 5,
            year: 2026,
            totalSalary: 10300000,
            paidDate: '',
            status: 'calculated',
          },
        ];

  return (
    <div className="rounded-2xl border bg-white dark:bg-[#1C1C1E]">

      <div className="border-b px-5 py-4">

        <h3 className="font-semibold">
          Lịch sử lương
        </h3>

      </div>

      <div className="divide-y">

        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between px-5 py-4"
          >
            <div className="flex gap-4">

              <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Calendar size={18} />
              </div>

              <div>

                <div className="font-medium">
                  Tháng {item.month}/{item.year}
                </div>

                <div className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(
                    item.totalSalary
                  )}
                </div>

                {item.paidDate && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">

                    <Clock3 size={14} />

                    Thanh toán:
                    {item.paidDate}

                  </div>
                )}

              </div>

            </div>

            <StatusBadge
              status={item.status}
            />

          </div>
        ))}

      </div>

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: SalaryHistoryItem['status'];
}) {
  switch (status) {
    case 'paid':
      return (
        <Badge className="bg-green-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Đã thanh toán
        </Badge>
      );

    case 'calculated':
      return (
        <Badge>
          Đã tính
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          Chưa tính
        </Badge>
      );
  }
}