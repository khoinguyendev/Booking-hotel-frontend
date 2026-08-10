'use client';

import {
  CalendarX2,
  RefreshCcw,
  Clock3,
  CheckCircle2,
  XCircle,
  Hourglass,
} from 'lucide-react';

export interface StaffRequestItem {
  id: number;

  type: 'leave' | 'shift' | 'overtime';

  title: string;

  createdAt: string;

  status: 'pending' | 'approved' | 'rejected';

  description: string;
}

interface Props {
  requests: StaffRequestItem[];

  onView?: (request: StaffRequestItem) => void;
}

export default function StaffRequests({
  requests,
  onView,
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
      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold">
            Lịch sử đơn từ
          </h3>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Các đơn đã gửi gần đây
          </p>

        </div>

        <span
          className="
            rounded-full
            bg-[#F2F2F7]
            px-3
            py-1
            text-xs
            font-semibold

            dark:bg-[#2C2C2E]
          "
        >
          {requests.length} đơn
        </span>

      </div>

      <div className="space-y-4">

        {requests.map((item) => (
          <button
            key={item.id}
            onClick={() => onView?.(item)}
            className="
              w-full
              rounded-2xl
              border
              border-[#F2F2F7]
              p-4
              text-left
              transition-all

              hover:border-[#007AFF]
              hover:bg-[#FAFAFA]

              dark:border-[#2C2C2E]
              dark:hover:bg-[#2C2C2E]
            "
          >
            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div
                  className="
                    mt-1
                    rounded-xl
                    bg-[#F2F2F7]
                    p-2

                    dark:bg-[#2C2C2E]
                  "
                >
                  {getTypeIcon(item.type)}
                </div>

                <div>

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-sm text-[#8E8E93]">
                    {item.description}
                  </p>

                  <p className="mt-2 text-xs text-[#8E8E93]">
                    {item.createdAt}
                  </p>

                </div>

              </div>

              <StatusBadge status={item.status} />

            </div>

          </button>
        ))}

        {requests.length === 0 && (
          <div className="py-12 text-center">

            <Clock3
              size={36}
              className="mx-auto text-[#8E8E93]"
            />

            <p className="mt-4 text-sm text-[#8E8E93]">
              Chưa có đơn nào
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: StaffRequestItem['status'];
}) {
  const map = {
    pending: {
      text: 'Chờ duyệt',
      className: 'bg-orange-100 text-orange-700',
      icon: <Hourglass size={14} />,
    },

    approved: {
      text: 'Đã duyệt',
      className: 'bg-green-100 text-green-700',
      icon: <CheckCircle2 size={14} />,
    },

    rejected: {
      text: 'Từ chối',
      className: 'bg-red-100 text-red-700',
      icon: <XCircle size={14} />,
    },
  };

  const item = map[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1

        rounded-full

        px-3
        py-1

        text-xs
        font-semibold

        ${item.className}
      `}
    >
      {item.icon}
      {item.text}
    </span>
  );
}

function getTypeIcon(type: StaffRequestItem['type']) {
  switch (type) {
    case 'leave':
      return (
        <CalendarX2
          size={20}
          className="text-red-500"
        />
      );

    case 'shift':
      return (
        <RefreshCcw
          size={20}
          className="text-blue-500"
        />
      );

    case 'overtime':
      return (
        <Clock3
          size={20}
          className="text-orange-500"
        />
      );
  }
}