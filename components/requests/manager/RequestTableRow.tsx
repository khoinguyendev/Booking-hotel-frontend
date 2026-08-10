// components/request/RequestTableRow.tsx

"use client";

import { Eye, MoreHorizontal, Check, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import RequestStatusBadge from "./RequestStatusBadge";
import { RequestResponse } from "@/types/requests";
import { format, isSameDay, parseISO } from "date-fns";

interface Props {
  record: RequestResponse;
  approvingId: number | null;
  onView?: (record: RequestResponse) => void;
  onApprove?: (id: RequestResponse) => void;
  onReject?: (record: RequestResponse) => void;
}

function getTypeLabel(type: RequestResponse["type"]) {
  switch (type) {
    case 1:
      return "Nghỉ phép";

    case 2:
      return "Đổi ca";

    case 3:
      return "Tăng ca";

    default:
      return type;
  }
}
function formatDate(date: string) {
  return format(parseISO(date), "dd/MM/yyyy");
}
function getTimeLabel(record: RequestResponse) {
  // Nghỉ phép
  if (record.leave) {
    const from = formatDate(record.leave.fromDate);
    const to = formatDate(record.leave.toDate);

    return from === to ? from : `${from} → ${to}`;
  }

  // Đổi ca
  if (record.shiftChange) {
    const { currentWorkDate, newWorkDate, currentShiftName, newShiftName } =
      record.shiftChange;

    const currentDate = formatDate(currentWorkDate);

    // Cùng ngày
    if (
      !newWorkDate ||
      isSameDay(parseISO(currentWorkDate), parseISO(newWorkDate))
    ) {
      return `${currentDate} • ${currentShiftName} → ${newShiftName}`;
    }

    // Khác ngày
    const targetDate = formatDate(newWorkDate);

    return `${currentDate} • ${currentShiftName} → ${targetDate} • ${newShiftName}`;
  }

  // Tăng ca
  if (record.overtime) {
    return formatDate(record.overtime.workDate);
  }

  return "-";
}

export default function RequestTableRow({
  record,
  approvingId,
  onView,
  onApprove,
  onReject,
}: Props) {
  console.log({ record });
  const isPending = record.status === 1;

  return (
    <tr
      className="
        border-b
        transition-colors
        hover:bg-[#F9F9FB]
        dark:border-[#2C2C2E]
        dark:hover:bg-[#2C2C2E]/40
      "
    >
      {/* Employee */}

      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-50 font-semibold text-[#007AFF] dark:bg-blue-900/30 dark:text-blue-300">
              {record.staffName?.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold">{record.staffName}</p>

            <p className="text-xs text-[#8E8E93]">
              {record.employeeCode}
              {record.position ? ` · ${record.position}` : ""}
            </p>
          </div>
        </div>
      </td>

      {/* Type */}

      <td className="px-4 py-4">
        <span className="font-medium">{getTypeLabel(record.type)}</span>
      </td>

      {/* Time */}

      <td className="px-4 py-4">
        <p className="text-sm font-medium">{getTimeLabel(record)}</p>

        {record.overtime && (
          <p className="mt-1 text-xs text-[#8E8E93]">
            {record.overtime.fromTime} - {record.overtime.toTime}
          </p>
        )}
      </td>

      {/* Status */}

      <td className="px-4 py-4 text-center">
        <RequestStatusBadge status={record.status} />
      </td>

      {/* Reason */}

      <td className="max-w-[240px] px-4 py-4">
        <p className="truncate text-sm text-[#636366] dark:text-[#AEAEB2]">
          {record.reason || "-"}
        </p>
      </td>

      {/* Action */}

      <td className="px-4 py-4 text-center">
        <div className="flex items-center justify-center gap-1">
          {isPending && (
            <>
              {/* Approve */}
              <button
                type="button"
                disabled={approvingId === record.id}
                onClick={() => onApprove?.(record)}
                title="Duyệt đơn"
                className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-green-600
            transition-colors
            hover:bg-green-50
            hover:text-green-700

            dark:text-green-400
            dark:hover:bg-green-500/10
          "
              >
                {approvingId === record.id ? (
                  "..."
                ) : (
                  <Check size={18} strokeWidth={2.5} />
                )}
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={() => onReject?.(record)}
                title="Từ chối"
                className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-red-500
            transition-colors
            hover:bg-red-50
            hover:text-red-600

            dark:text-red-400
            dark:hover:bg-red-500/10
          "
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </>
          )}

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-[#636366]
          transition-colors
          hover:bg-[#F2F2F7]
          hover:text-[#1C1C1E]

          dark:text-[#AEAEB2]
          dark:hover:bg-[#2C2C2E]
          dark:hover:text-white
        "
            >
              <MoreHorizontal size={18} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(record)}>
                <Eye className="mr-2 h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>

              {isPending && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => onApprove?.(record)}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Duyệt đơn
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => onReject?.(record)}>
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Từ chối
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
