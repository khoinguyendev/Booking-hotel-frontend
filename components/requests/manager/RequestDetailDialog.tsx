// components/request/RequestDetailDialog.tsx

"use client";

import {
  ArrowLeftRight,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  RefreshCcw,
  UserRound,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { RequestResponse, RequestStatus, RequestType } from "@/types/requests";

import RequestStatusBadge from "./RequestStatusBadge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  record: RequestResponse | null;

  onApprove?: (record: RequestResponse) => void;
  onReject?: (record: RequestResponse) => void;
}

export default function RequestDetailDialog({
  open,
  onOpenChange,
  record,
  onApprove,
  onReject,
}: Props) {
  if (!record) return null;

  const isPending = (record.status = 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
        
          max-h-[95vh]
          max-w-2xl
          overflow-hidden
          gap-0
          rounded-3xl
          border    
          border-[#E5E5EA]
          bg-white
          p-0
          shadow-2xl

          dark:border-[#2C2C2E]
          dark:bg-[#1C1C1E]
        "
      >
        {/* Header */}

        <DialogHeader
          className="
            border-b
            border-[#E5E5EA]
            px-6
            py-5

            dark:border-[#2C2C2E]
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <RequestTypeIcon type={record.type} />

              <div>
                <DialogTitle className="text-lg font-bold">
                  {getTypeLabel(record.type)}
                </DialogTitle>

                <DialogDescription className="mt-1">
                  Chi tiết yêu cầu của nhân viên
                </DialogDescription>
              </div>
            </div>

            <RequestStatusBadge status={record.status} />
          </div>
        </DialogHeader>

        {/* Body */}

        <div className="max-h-[calc(90vh-150px)] overflow-y-auto">
          <div className="space-y-5 p-6">
            {/* Employee */}

            <section
              className="
                rounded-2xl
                border
                border-[#E5E5EA]
                bg-[#F9F9FB]
                p-4

                dark:border-[#2C2C2E]
                dark:bg-[#2C2C2E]/50
              "
            >
              <div className="mb-3 flex items-center gap-2">
                <UserRound size={16} className="text-[#8E8E93]" />

                <p className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  Nhân viên
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback
                    className="
                      bg-blue-100
                      font-bold
                      text-blue-600

                      dark:bg-blue-500/20
                      dark:text-blue-300
                    "
                  >
                    {record.staffName.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-semibold">{record.staffName}</p>

                  <p className="mt-0.5 text-sm text-[#8E8E93]">
                    {record.employeeCode}

                    {record.position && (
                      <>
                        <span className="mx-1.5">·</span>

                        {record.position}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Request information */}

            <section>
              <SectionTitle
                icon={<FileText size={16} />}
                title="Thông tin đơn"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="Loại đơn" value={getTypeLabel(record.type)} />

                <InfoItem
                  label="Trạng thái"
                  value={<RequestStatusBadge status={record.status} />}
                />

                <InfoItem
                  label="Ngày tạo"
                  value={formatDateTime(record.createdAt)}
                />

                <InfoItem label="Thời gian" value={getRequestTime(record)} />
              </div>
            </section>

            {/* Shift information */}

            {record.type === 2 && record.shiftChange && (
              <section>
                <SectionTitle
                  icon={<RefreshCcw size={18} />}
                  title="Thông tin đổi ca"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Ngày */}
                  <div className="rounded-xl border border-[#E5E5EA] p-3">
                    <p className="text-xs font-medium text-[#8E8E93]">
                      Ngày làm việc
                    </p>

                    <div className="mt-1">
                      <p className="text-sm font-semibold text-[#1C1C1E]">
                        {formatDate(record.shiftChange.currentWorkDate)}
                      </p>

                      {record.shiftChange.newWorkDate && (
                        <>
                          <div className="my-1 text-xs text-[#8E8E93]">↓</div>

                          <p className="text-sm font-semibold text-[#007AFF]">
                            {formatDate(record.shiftChange.newWorkDate)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Ca */}
                  <div className="rounded-xl border border-[#E5E5EA] p-3">
                    <p className="text-xs font-medium text-[#8E8E93]">
                      Ca làm việc
                    </p>

                    <div className="mt-1">
                      <p className="text-sm font-semibold text-[#1C1C1E]">
                        {record.shiftChange.currentShiftName}
                      </p>

                      <div className="my-1 text-xs text-[#8E8E93]">↓</div>

                      <p className="text-sm font-semibold text-[#007AFF]">
                        {record.shiftChange.newShiftName}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Leave */}

            {record.type === 1 && (
              <section>
                <SectionTitle
                  icon={<CalendarDays size={16} />}
                  title="Thời gian nghỉ"
                />

                <div
                  className="
                    rounded-2xl
                    border
                    border-blue-100
                    bg-blue-50
                    p-4

                    dark:border-blue-500/20
                    dark:bg-blue-500/10
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                        text-blue-600

                        dark:bg-blue-500/20
                        dark:text-blue-300
                      "
                    >
                      <CalendarDays size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        Thời gian nghỉ
                      </p>

                      <p className="mt-0.5 font-semibold">
                        {record.leave ? formatDate(record.leave.fromDate) : "-"}{" "}
                        → {record.leave ? formatDate(record.leave.toDate) : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Overtime */}

            {record.type === 3 && (
              <section>
                <SectionTitle
                  icon={<Clock3 size={16} />}
                  title="Thông tin tăng ca"
                />

                <div
                  className="
                    grid
                    gap-3
                    sm:grid-cols-3
                  "
                >
                  <InfoItem
                    label="Ngày"
                    value={
                      record.overtime
                        ? formatDate(record.overtime.workDate)
                        : "-"
                    }
                  />

                  <InfoItem
                    label="Bắt đầu"
                    value={record.overtime?.fromTime || "-"}
                  />

                  <InfoItem
                    label="Kết thúc"
                    value={record.overtime?.toTime || "-"}
                  />
                </div>
              </section>
            )}

            {/* Reason */}

            <section>
              <SectionTitle icon={<FileText size={16} />} title="Lý do" />

              <div
                className="
                  rounded-2xl
                  border
                  border-[#E5E5EA]
                  bg-white
                  p-4
                  text-sm
                  leading-6
                  text-[#3A3A3C]

                  dark:border-[#2C2C2E]
                  dark:bg-[#2C2C2E]/40
                  dark:text-[#D1D1D6]
                "
              >
                {record.reason || (
                  <span className="text-[#8E8E93]">Không có lý do</span>
                )}
              </div>
            </section>

            {/* Note */}

            {record.rejectReason && (
              <section>
                <SectionTitle icon={<FileText size={16} />} title="Ghi chú" />

                <div
                  className="
                    rounded-2xl
                    bg-[#F2F2F7]
                    p-4
                    text-sm
                    leading-6
                    text-[#636366]

                    dark:bg-[#2C2C2E]
                    dark:text-[#AEAEB2]
                  "
                >
                  {record.rejectReason}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}

        {isPending ? (
          <DialogFooter
            className="
              border-t
              border-[#E5E5EA]
              bg-[#FAFAFA]
              px-6
              pb-6

              dark:border-[#2C2C2E]
              dark:bg-[#1C1C1E]
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => onReject?.(record)}
              className="
                h-10
                rounded-xl
                border-red-200
                px-5
                text-red-600
                hover:bg-red-50
                hover:text-red-700

                dark:border-red-500/30
                dark:text-red-400
                dark:hover:bg-red-500/10
              "
            >
              <X size={17} />
              Từ chối
            </Button>

            <Button
              type="button"
              onClick={() => onApprove?.(record)}
              className="
                h-10
                rounded-xl
                bg-[#007AFF]
                px-5
                text-white
                shadow-sm
                hover:bg-[#0064D6]
              "
            >
              <Check size={17} />
              Duyệt đơn
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter
            className="
              border-t
              border-[#E5E5EA]
              px-6
              py-4

              dark:border-[#2C2C2E]
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Đóng
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------- */

function getTypeLabel(type: RequestType) {
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

function RequestTypeIcon({ type }: { type: RequestType }) {
  const config = {
    1: {
      icon: CalendarDays,
      className:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
    },

    2: {
      icon: ArrowLeftRight,
      className:
        "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
    },

    3: {
      icon: Clock3,
      className:
        "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
    },
  };

  const item = config[type];
  const Icon = item.icon;

  return (
    <div
      className={`
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-2xl
        ${item.className}
      `}
    >
      <Icon size={20} />
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-[#8E8E93]">{icon}</span>

      <h3 className="text-sm font-bold">{title}</h3>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#E5E5EA]
        bg-[#FAFAFA]
        px-4
        py-3

        dark:border-[#2C2C2E]
        dark:bg-[#2C2C2E]/40
      "
    >
      <p className="text-xs font-medium text-[#8E8E93]">{label}</p>

      <div className="mt-1.5 text-sm font-semibold">{value}</div>
    </div>
  );
}

function getRequestTime(record: RequestResponse) {
  if (record.leave) {
    return `${formatDate(
      record.leave.fromDate,
    )} - ${formatDate(record.leave.fromDate)}`;
  }

  if (record.overtime) {
    return formatDate(record.overtime.workDate);
  }

  return "-";
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN").format(date);
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
