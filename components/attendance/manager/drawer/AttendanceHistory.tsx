'use client';

import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  XCircle,
} from 'lucide-react';

export interface AttendanceHistoryItem {
  id: number;

  workDate: string;

  checkInTime?: string;

  checkOutTime?: string;

  status:
    | 'Present'
    | 'Late'
    | 'Absent'
    | 'DayOff'
    | 'NotCheckIn';
}

interface Props {
  records: AttendanceHistoryItem[];
}

export default function AttendanceHistory({
  records,
}: Props) {
  return (
    <div className="rounded-3xl border p-5">

      <div className="mb-5 flex items-center gap-2">

        <CalendarDays
          size={20}
          className="text-[#007AFF]"
        />

        <h3 className="font-bold">
          Lịch sử chấm công
        </h3>

      </div>

      <div className="space-y-4">

        {records.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
          />
        ))}

      </div>

    </div>
  );
}

function HistoryItem({
  item,
}: {
  item: AttendanceHistoryItem;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>

        <p className="font-semibold">
          {item.workDate}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">

          {item.checkInTime ?? '--:--'}

          {'  -  '}

          {item.checkOutTime ?? '--:--'}

        </p>

      </div>

      <StatusBadge status={item.status} />

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AttendanceHistoryItem['status'];
}) {
  switch (status) {
    case 'Present':
      return (
        <Badge
          color="bg-green-500"
          icon={<CheckCircle2 size={15} />}
        >
          Có mặt
        </Badge>
      );

    case 'Late':
      return (
        <Badge
          color="bg-orange-500"
          icon={<CircleAlert size={15} />}
        >
          Đi trễ
        </Badge>
      );

    case 'Absent':
      return (
        <Badge
          color="bg-red-500"
          icon={<XCircle size={15} />}
        >
          Vắng
        </Badge>
      );

    case 'DayOff':
      return (
        <Badge
          color="bg-gray-500"
          icon={<Clock3 size={15} />}
        >
          Nghỉ
        </Badge>
      );

    default:
      return (
        <Badge
          color="bg-blue-500"
          icon={<Clock3 size={15} />}
        >
          Chưa check-in
        </Badge>
      );
  }
}

function Badge({
  children,
  color,
  icon,
}: React.PropsWithChildren<{
  color: string;
  icon: React.ReactNode;
}>) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${color}`}
    >
      {icon}
      {children}
    </div>
  );
}