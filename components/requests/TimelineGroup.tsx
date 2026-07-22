'use client';

import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

import RequestCard from './RequestCard';
import { StaffRequest } from '@/types/requests';

interface Props {
  requests: StaffRequest[];
  onSelect: (request: StaffRequest) => void;
}

export default function TimelineGroup({
  requests,
  onSelect,
}: Props) {
  const groups = groupByDate(requests);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.label}>
          {/* Header */}

          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E5E5EA] dark:bg-[#2C2C2E]" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8E8E93]">
              {group.label}
            </span>

            <div className="h-px flex-1 bg-[#E5E5EA] dark:bg-[#2C2C2E]" />
          </div>

          {/* Cards */}

          <div className="grid gap-5 xl:grid-cols-2">
            {group.items.map((item) => (
              <RequestCard
                key={item.id}
                request={item}
                onClick={() => onSelect(item)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function groupByDate(data: StaffRequest[]) {
  const map = new Map<string, StaffRequest[]>();

  data
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .forEach((item) => {
      const key = item.createdAt.split("T")[0];

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(item);
    });

  return [...map.entries()].map(([date, items]) => ({
    label: formatLabel(date),
    items,
  }));
}

function formatLabel(date: string) {
  const d = parseISO(date);

  if (isToday(d)) return 'Hôm nay';

  if (isYesterday(d)) return 'Hôm qua';

  return format(d, 'dd MMMM yyyy', {
    locale: vi,
  });
}