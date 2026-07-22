'use client';

import { RequestStatus } from '@/types/requests';
import {
  CheckCircle2,
  Clock3,
  XCircle,
} from 'lucide-react';


interface Props {
  status: RequestStatus;
  className?: string;
}

export default function RequestStatusBadge({
  status,
  className = '',
}: Props) {
  const config = getConfig(status);

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        ${config.className}
        ${className}
      `}
    >
      <Icon size={14} />

      {config.label}
    </span>
  );
}

function getConfig(status: RequestStatus) {
  switch (status) {
    case 'Pending':
      return {
        label: 'Chờ duyệt',
        icon: Clock3,
        className: `
          border-amber-200
          bg-amber-50
          text-amber-700

          dark:border-amber-900
          dark:bg-amber-950/30
          dark:text-amber-300
        `,
      };

    case 'Approved':
      return {
        label: 'Đã duyệt',
        icon: CheckCircle2,
        className: `
          border-green-200
          bg-green-50
          text-green-700

          dark:border-green-900
          dark:bg-green-950/30
          dark:text-green-300
        `,
      };

    case 'Rejected':
      return {
        label: 'Từ chối',
        icon: XCircle,
        className: `
          border-red-200
          bg-red-50
          text-red-700

          dark:border-red-900
          dark:bg-red-950/30
          dark:text-red-300
        `,
      };

    default:
      return {
        label: status,
        icon: Clock3,
        className: `
          border-gray-200
          bg-gray-50
          text-gray-700
        `,
      };
  }
}