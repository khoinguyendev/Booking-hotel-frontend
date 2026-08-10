'use client';

import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Clock3,
} from 'lucide-react';

import { HotelStaff } from '@/types/staff';

interface Props {
  staff: HotelStaff;

  checked: boolean;

  onCheck: () => void;

  onView?: () => void;

  onEdit?: () => void;

  onDelete?: () => void;
}

export default function StaffTableRow({
  staff,
  checked,
  onCheck,
  onView,
  onEdit,
  onDelete,
}: Props) {
  // Demo dữ liệu, sau này lấy từ API Attendance
  const todayShift = 'Ca sáng';
  const checkIn = '07:58';
  const checkOut = '--:--';

  const status = getStatus();

  return (
    <tr
      className="
        border-b
        border-[#F2F2F7]
        transition-colors

        hover:bg-[#FAFAFA]

        dark:border-[#2C2C2E]
        dark:hover:bg-[#1C1C1E]
      "
    >
      {/* Checkbox */}

      <td className="px-4 py-5">

        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="
            h-4
            w-4
            rounded
            text-[#007AFF]
          "
        />

      </td>

      {/* Avatar */}

      <td className="px-4">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full

            bg-[#007AFF]

            text-sm
            font-bold
            text-white
          "
        >
          {getInitials(staff.fullName)}
        </div>

      </td>

      {/* Name */}

      <td className="px-4">

        <div>

          <p className="font-semibold">
            {staff.fullName}
          </p>

          <p className="mt-1 text-xs text-[#8E8E93]">
            {staff.email}
          </p>

        </div>

      </td>

      {/* Employee Code */}

      <td className="px-4">

        <span className="font-medium">
          {staff.employeeCode}
        </span>

      </td>

      {/* Position */}

      <td className="px-4">

        <span>
          {staff.position ?? '--'}
        </span>

      </td>

      {/* Shift */}

      {/* <td className="px-4">

        <span
          className="
            rounded-full

            bg-blue-50

            px-3
            py-1

            text-xs
            font-semibold

            text-blue-600

            dark:bg-blue-950/30
          "
        >
          {todayShift}
        </span>

      </td> */}

      {/* Checkin */}

      {/* <td className="px-4 text-center">

        <span className="font-medium">
          {checkIn}
        </span>

      </td> */}

      {/* Checkout */}

      {/* <td className="px-4 text-center">

        <span className="text-[#8E8E93]">
          {checkOut}
        </span>

      </td> */}
 <td className="px-4 text-center">

        <span className="text-[#8E8E93]">
          {staff.phone}
        </span>

      </td>

      {/* Status */}

      {/* <td className="px-4">

        <StatusBadge status={status} />

      </td> */}

      {/* Actions */}

      <td className="px-4">

        <div className="flex justify-center gap-2">

          <IconButton
            icon={<Eye size={16} />}
            onClick={onView}
          />

          <IconButton
            icon={<Pencil size={16} />}
            onClick={onEdit}
          />

          <IconButton
            icon={<Trash2 size={16} />}
            danger
            onClick={onDelete}
          />

        </div>

      </td>

    </tr>
  );
}

function IconButton({
  icon,
  danger,
  onClick,
}: {
  icon: React.ReactNode;

  danger?: boolean;

  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl

        p-2

        transition

        ${
          danger
            ? 'text-red-500 hover:bg-red-50'
            : 'hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]'
        }
      `}
    >
      {icon}
    </button>
  );
}

function StatusBadge({
  status,
}: {
  status: 'working' | 'late' | 'dayoff' | 'unassigned';
}) {
  const styles = {
    working:
      'bg-green-100 text-green-700',

    late:
      'bg-red-100 text-red-600',

    dayoff:
      'bg-gray-200 text-gray-700',

    unassigned:
      'bg-orange-100 text-orange-700',
  };

  const labels = {
    working: 'Đang làm',

    late: 'Trễ',

    dayoff: 'Nghỉ',

    unassigned: 'Chưa phân ca',
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

function getInitials(name?: string) {
  if (!name) return '?';

  return name
    .split(' ')
    .map((x) => x[0])
    .slice(-2)
    .join('')
    .toUpperCase();
}

// Demo
function getStatus():
  | 'working'
  | 'late'
  | 'dayoff'
  | 'unassigned' {

  const list = [
    'working',
    'late',
    'dayoff',
    'unassigned',
  ];

  return list[
    Math.floor(Math.random() * list.length)
  ] as any;
}