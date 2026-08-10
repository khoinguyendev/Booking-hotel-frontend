'use client';

import {
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  current: number;

  previous: number;
}

const formatCurrency = (
  value: number
) =>
  value.toLocaleString('vi-VN') +
  ' ₫';

export default function SalaryComparisonCard({
  current,
  previous,
}: Props) {
  const diff = current - previous;

  const percent =
    previous === 0
      ? 0
      : (diff / previous) * 100;

  const increase = diff >= 0;

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          So sánh quỹ lương
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        <div className="flex items-center justify-between">

          <span className="text-muted-foreground">
            Tháng này
          </span>

          <span className="text-lg font-semibold">
            {formatCurrency(current)}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-muted-foreground">
            Tháng trước
          </span>

          <span>
            {formatCurrency(previous)}
          </span>

        </div>

        <div
          className={`flex items-center gap-2 rounded-xl p-4 ${
            increase
              ? 'bg-green-50 text-green-600 dark:bg-green-950'
              : 'bg-red-50 text-red-600 dark:bg-red-950'
          }`}
        >
          {increase ? (
            <ArrowUpRight size={22} />
          ) : (
            <ArrowDownRight size={22} />
          )}

          <div>

            <div className="font-semibold">
              {increase ? '+' : ''}
              {percent.toFixed(1)}%
            </div>

            <div className="text-sm opacity-80">
              {increase
                ? 'Quỹ lương tăng'
                : 'Quỹ lương giảm'}
            </div>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}