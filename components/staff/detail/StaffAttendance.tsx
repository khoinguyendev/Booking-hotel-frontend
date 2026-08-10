'use client';

import {
  CheckCircle2,
  Clock3,
  XCircle,
  LogOut,
} from 'lucide-react';

export interface AttendanceHistory {
  id: number;

  workDate: string;

  checkIn?: string;

  checkOut?: string;

  status: 'ontime' | 'late' | 'absent' | 'leaveEarly';
}

interface Props {
  records: AttendanceHistory[];
}

export default function StaffAttendance({
  records,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-5

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="mb-5">

        <h3 className="text-lg font-bold">
          Lịch sử chấm công
        </h3>

        <p className="mt-1 text-sm text-[#8E8E93]">
          10 lần chấm công gần nhất
        </p>

      </div>

      <div className="space-y-5">

        {records.map((item, index) => (
          <div
            key={item.id}
            className="relative flex gap-4"
          >
            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-full

                  ${getStatusColor(item.status)}
                `}
              >
                {getStatusIcon(item.status)}
              </div>

              {index !== records.length - 1 && (
                <div
                  className="
                    mt-2
                    h-full
                    w-px
                    bg-[#E5E5EA]

                    dark:bg-[#2C2C2E]
                  "
                />
              )}

            </div>

            {/* Content */}

            <div
              className="
                flex-1

                rounded-2xl

                border

                border-[#F2F2F7]

                p-4

                dark:border-[#2C2C2E]
              "
            >
              <div className="flex items-center justify-between">

                <h4 className="font-semibold">
                  {item.workDate}
                </h4>

                <StatusBadge status={item.status} />

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>

                  <p className="text-xs text-[#8E8E93]">
                    Check-in
                  </p>

                  <p className="mt-1 font-semibold">
                    {item.checkIn ?? '--:--'}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-[#8E8E93]">
                    Check-out
                  </p>

                  <p className="mt-1 font-semibold">
                    {item.checkOut ?? '--:--'}
                  </p>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AttendanceHistory['status'];
}) {
  const styles = {
    ontime: 'bg-green-100 text-green-700',

    late: 'bg-orange-100 text-orange-700',

    absent: 'bg-red-100 text-red-600',

    leaveEarly: 'bg-blue-100 text-blue-700',
  };

  const labels = {
    ontime: 'Đúng giờ',

    late: 'Đi trễ',

    absent: 'Vắng',

    leaveEarly: 'Về sớm',
  };

  return (
    <span
      className={`
        rounded-full

        px-3
        py-1

        text-xs
        font-semibold

        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}

function getStatusColor(
  status: AttendanceHistory['status']
) {
  switch (status) {
    case 'ontime':
      return 'bg-green-100 text-green-600';

    case 'late':
      return 'bg-orange-100 text-orange-600';

    case 'absent':
      return 'bg-red-100 text-red-600';

    case 'leaveEarly':
      return 'bg-blue-100 text-blue-600';
  }
}

function getStatusIcon(
  status: AttendanceHistory['status']
) {
  switch (status) {
    case 'ontime':
      return <CheckCircle2 size={20} />;

    case 'late':
      return <Clock3 size={20} />;

    case 'absent':
      return <XCircle size={20} />;

    case 'leaveEarly':
      return <LogOut size={20} />;
  }
}