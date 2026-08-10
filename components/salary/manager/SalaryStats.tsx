'use client';

import {
  Banknote,
  Calculator,
  CheckCircle2,
  Wallet,
} from 'lucide-react';

interface Props {
  stats: {
    calculated: number;
    unCalculated: number;
    paid: number;
    totalSalary: number;
  };
}

const formatCurrency = (value: number) => {
  if (value >= 1_000_000_000)
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`;

  if (value >= 1_000_000)
    return `${(value / 1_000_000).toFixed(1)} triệu`;

  return value.toLocaleString('vi-VN');
};

export default function SalaryStats({
  stats,
}: Props) {
  const items = [
    {
      title: 'Đã tính lương',
      value: stats.calculated,
      icon: Calculator,
      color:
        'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
      title: 'Chưa tính',
      value: stats.unCalculated,
      icon: Wallet,
      color:
        'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    },
    {
      title: 'Đã thanh toán',
      value: stats.paid,
      icon: CheckCircle2,
      color:
        'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    },
    {
      title: 'Quỹ lương',
      value: formatCurrency(stats.totalSalary),
      icon: Banknote,
      color:
        'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              rounded-3xl
              border
              border-[#E5E5EA]
              bg-white
              p-5
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:shadow-lg

              dark:border-[#2C2C2E]
              dark:bg-[#1C1C1E]
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#8E8E93]">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#1C1C1E] dark:text-white">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}