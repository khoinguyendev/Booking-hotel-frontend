'use client';

import { Calculator, CheckCircle2, CreditCard, Layers3 } from 'lucide-react';

import { cn } from '@/lib/utils';

export type SalaryQuickFilter =
  | 'all'
  | 'calculated'
  | 'pending'
  | 'paid'
  | 'unpaid';

interface Props {
  value: SalaryQuickFilter;

  onChange: (value: SalaryQuickFilter) => void;
}

export default function QuickSalaryFilter({
  value,
  onChange,
}: Props) {
  const items = [
    {
      value: 'all',
      label: 'Tất cả',
      icon: Layers3,
      active:
        'bg-blue-500 text-white border-blue-500',
    },
    {
      value: 'calculated',
      label: 'Đã tính',
      icon: Calculator,
      active:
        'bg-indigo-500 text-white border-indigo-500',
    },
    {
      value: 'pending',
      label: 'Chưa tính',
      icon: CreditCard,
      active:
        'bg-orange-500 text-white border-orange-500',
    },
    {
      value: 'paid',
      label: 'Đã thanh toán',
      icon: CheckCircle2,
      active:
        'bg-green-500 text-white border-green-500',
    },
    {
      value: 'unpaid',
      label: 'Chưa thanh toán',
      icon: CreditCard,
      active:
        'bg-red-500 text-white border-red-500',
    },
  ] satisfies {
    value: SalaryQuickFilter;
    label: string;
    icon: any;
    active: string;
  }[];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const Icon = item.icon;

        const active =
          value === item.value;

        return (
          <button
            key={item.value}
            onClick={() =>
              onChange(item.value)
            }
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
              'border-[#E5E5EA] bg-white hover:shadow-sm',
              'dark:border-[#2C2C2E] dark:bg-[#1C1C1E]',
              active && item.active
            )}
          >
            <Icon size={16} />

            {item.label}
          </button>
        );
      })}
    </div>
  );
}