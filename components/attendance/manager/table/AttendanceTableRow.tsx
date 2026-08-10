"use client";

import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Eye,
  MoreHorizontal,
  Pencil,
  XCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AttendanceRecord } from "@/types/attendance";

interface Props {
  record: AttendanceRecord;

  onView?: (record: AttendanceRecord) => void;

  onEdit?: (record: AttendanceRecord) => void;
}

export default function AttendanceTableRow({ record, onView, onEdit }: Props) {
  console.log(record);
  return (
    <tr className="border-b border-[#F2F2F7] transition-colors hover:bg-[#FAFAFA] dark:border-[#2C2C2E] dark:hover:bg-[#232325]">
      {/* Nhân viên */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={record.avatar} />

            <AvatarFallback>{record.fullName.slice(0, 1)}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">{record.fullName}</p>

            <p className="text-xs text-[#8E8E93]">{record.employeeCode}</p>
          </div>
        </div>
      </td>

      {/* Chức vụ */}
      <td className="px-4 py-4">{record.position}</td>

      {/* Ca */}
      <td className="px-4 py-4 text-center">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
          {record.shift}
         
        </span>
         {record.overtime && (
            <Badge
              icon={null}
              className="ms-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
            >
              OT
            </Badge>
          )}
      </td>

      {/* Checkin */}
      <td className="px-4 py-4 text-center font-medium">
        {record.checkInTime ?? "--:--"}
      </td>

      {/* Checkout */}
      <td className="px-4 py-4 text-center font-medium">
        {record.checkOutTime ?? "--:--"}
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <StatusBadge status={record.status} />
      </td>

      {/* Note */}
      <td className="max-w-[220px] truncate px-4 py-4 text-sm text-[#636366] dark:text-[#AEAEB2]">
        {record.note || "-"}
      </td>

      {/* Action */}
      <td className="px-4 py-4 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors">
            <MoreHorizontal size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(record)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit?.(record)}>
              <Pencil className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: AttendanceRecord["status"] }) {
  switch (status) {
    case 1:
      return (
        <Badge
          icon={<CheckCircle2 size={15} />}
          className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        >
          Có mặt
        </Badge>
      );

    case 2:
      return (
        <Badge
          icon={<CircleAlert size={15} />}
          className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
        >
          Đi trễ
        </Badge>
      );

    case 0:
      return (
        <Badge
          icon={<XCircle size={15} />}
          className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
        >
          Vắng
        </Badge>
      );

    case 4:
      return (
        <Badge
          icon={<Clock3 size={15} />}
          className="bg-gray-100 text-gray-700 dark:bg-[#2C2C2E] dark:text-gray-300"
        >
          Nghỉ
        </Badge>
      );

    default:
      return (
        <Badge
          icon={<Clock3 size={15} />}
          className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        >
          Chưa check-in
        </Badge>
      );
  }
}

function Badge({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {icon}
      {children}
    </div>
  );
}
