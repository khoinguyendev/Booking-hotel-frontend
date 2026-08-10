'use client';

import { Position } from '@/types/position';
import {
  Users,
  UserCheck,
  Coffee,
  Clock3,
  CalendarX,
} from 'lucide-react';

export type StaffStatusFilter =
  | 'all'
  | 'working'
  | 'dayoff'
  | 'late'
  | 'unassigned';

interface Props {
  value: string;
  positions:Position[];
  onChange: (value: string) => void;
}



export default function QuickStatusFilter({
  value,
  positions,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {positions.map((item) => {

        const active = value === item.name;

        return (
          <button
            key={item.name}
            onClick={() => onChange(item.name)}
            className={`
              flex
              items-center
              gap-2

              rounded-full

              px-5
              py-2.5

              text-sm
              font-semibold

              transition-all
              duration-200

              ${
                active
                  ? `
                    bg-[#007AFF]
                    text-white
                    shadow-md
                  `
                  : `
                    bg-white
                    text-[#1C1C1E]
                    border
                    border-[#E5E5EA]

                    hover:border-[#007AFF]
                    hover:text-[#007AFF]

                    dark:bg-[#1C1C1E]
                    dark:border-[#2C2C2E]
                    dark:text-white
                  `
              }
            `}
          >

            {item.name}
          </button>
        );
      })}
    </div>
  );
}