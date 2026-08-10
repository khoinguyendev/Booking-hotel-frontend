"use client";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  X,
} from "lucide-react";

import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export type RequestNotificationType = "leave" | "shift" | "overtime";

export interface RequestNotification {
  requestId: number;

  name: string;
  employeeCode: string;
  position?: string | null;
  avatar?: string | null;

  title: string;
  description?: string | null;

  type: RequestNotificationType;

  // Leave
  fromDate?: string | null;
  toDate?: string | null;

  // Shift change
  currentWorkDate?: string | null;
  newWorkDate?: string | null;
  currentShiftName?: string | null;
  newShiftName?: string | null;

  // Overtime - để mở rộng sau
  overtimeDate?: string | null;
  overtimeHours?: number | null;
}

interface RequestNotificationToastProps {
  notification: RequestNotification;

  onClose: () => void;

  onView?: (requestId: number) => void;
}

const TYPE_CONFIG: Record<
  RequestNotificationType,
  {
    label: string;
    icon: typeof CalendarDays;
    accent: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  leave: {
    label: "Nghỉ phép",
    icon: CalendarDays,
    accent: "bg-orange-500",
    iconBg: "bg-orange-50 dark:bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
  },

  shift: {
    label: "Đổi ca",
    icon: Clock3,
    accent: "bg-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },

  overtime: {
    label: "Tăng ca",
    icon: Clock3,
    accent: "bg-purple-500",
    iconBg: "bg-purple-50 dark:bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
};

function formatDate(date?: string | null) {
  if (!date) return null;

  try {
    return format(parseISO(date), "dd/MM/yyyy", {
      locale: vi,
    });
  } catch {
    return date;
  }
}

export default function RequestNotificationToast({
  notification,
  onClose,
  onView,
}: RequestNotificationToastProps) {
  const config = TYPE_CONFIG[notification.type];

  const Icon = config.icon;

  const {
    requestId,
    name,
    employeeCode,
    position,
    avatar,
    title,
    description,
    type,
  } = notification;

  return (
    <div
      className="
        relative
        w-[390px]
        overflow-hidden
        rounded-2xl
        border
        border-black/[0.06]
        bg-white
        shadow-[0_12px_40px_rgba(0,0,0,0.12)]
        dark:border-white/[0.08]
        dark:bg-[#1C1C1E]
        dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
      "
    >
      {/* Accent */}
      <div
        className={`
          absolute
          left-0
          top-0
          h-full
          w-1
          ${config.accent}
        `}
      />

      <div className="p-4">
        {/* ================= HEADER ================= */}

        <div className="flex items-start gap-3">
          {/* Avatar */}

          <div className="relative shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="
                  h-11
                  w-11
                  rounded-full
                  object-cover
                  ring-2
                  ring-white
                  dark:ring-[#1C1C1E]
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#007AFF]/10
                  text-sm
                  font-bold
                  text-[#007AFF]
                "
              >
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Employee */}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-[#1C1C1E]
                    dark:text-white
                  "
                >
                  {name}
                </p>

                <p className="mt-0.5 text-xs text-[#8E8E93]">
                  {employeeCode}

                  {position && (
                    <>
                      <span className="mx-1">•</span>
                      {position}
                    </>
                  )}
                </p>
              </div>

              {/* Close */}

              <button
                type="button"
                aria-label="Đóng thông báo"
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                }}
                className="
                  shrink-0
                  rounded-lg
                  p-1
                  text-[#8E8E93]
                  opacity-60
                  transition
                  hover:bg-black/5
                  hover:text-[#1C1C1E]
                  hover:opacity-100
                  dark:hover:bg-white/10
                  dark:hover:text-white
                "
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= REQUEST TYPE ================= */}

        <div className="mt-4 flex items-center gap-3">
          <div
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${config.iconBg}
            `}
          >
            <Icon size={17} strokeWidth={2} className={config.iconColor} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-[#8E8E93]">{config.label}</p>

            <p
              className="
                truncate
                text-sm
                font-semibold
                text-[#1C1C1E]
                dark:text-white
              "
            >
              {title}
            </p>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}

        {description && (
          <div
            className="
              mt-3
              rounded-xl
              bg-[#F5F5F7]
              px-3
              py-2.5
              dark:bg-white/[0.05]
            "
          >
            <p
              className="
                line-clamp-2
                text-xs
                leading-5
                text-[#636366]
                dark:text-[#AEAEB2]
              "
            >
              {description}
            </p>
          </div>
        )}

        {/* ================= SHIFT CHANGE ================= */}

        {type === "shift" && (
          <div
            className="
              mt-3
              rounded-xl
              border
              border-[#E5E5EA]
              p-3
              dark:border-white/[0.08]
            "
          >
            <div className="flex items-center gap-3">
              {/* Current */}

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-[#8E8E93]">
                  Ca hiện tại
                </p>

                <p className="mt-1 truncate text-xs font-semibold text-[#1C1C1E] dark:text-white">
                  {notification.currentShiftName ?? "—"}
                </p>

                {notification.currentWorkDate && (
                  <p className="mt-0.5 text-[11px] text-[#8E8E93]">
                    {formatDate(notification.currentWorkDate)}
                  </p>
                )}
              </div>

              <ArrowRight size={15} className="shrink-0 text-[#AEAEB2]" />

              {/* New */}

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-[#8E8E93]">Ca mới</p>

                <p className="mt-1 truncate text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {notification.newShiftName ?? "—"}
                </p>

                {notification.newWorkDate ? (
                  <p className="mt-0.5 text-[11px] text-[#8E8E93]">
                    {formatDate(notification.newWorkDate)}
                  </p>
                ) : (
                  <p className="mt-0.5 text-[11px] text-[#8E8E93]">Cùng ngày</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= LEAVE ================= */}

        {type === "leave" && (notification.fromDate || notification.toDate) && (
          <div
            className="
                mt-3
                rounded-xl
                border
                border-[#E5E5EA]
                p-3
                dark:border-white/[0.08]
              "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-orange-50
                    text-orange-500
                    dark:bg-orange-500/10
                  "
              >
                <CalendarDays size={15} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-[#8E8E93]">Thời gian nghỉ</p>

                <p className="mt-0.5 text-xs font-semibold text-[#1C1C1E] dark:text-white">
                  {formatDate(notification.fromDate)}

                  {notification.toDate && (
                    <> → {formatDate(notification.toDate)}</>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= OVERTIME ================= */}

        {type === "overtime" && notification.overtimeDate && (
          <div
            className="
                mt-3
                rounded-xl
                border
                border-[#E5E5EA]
                p-3
                dark:border-white/[0.08]
              "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-purple-50
                    text-purple-500
                    dark:bg-purple-500/10
                  "
              >
                <Clock3 size={15} />
              </div>

              <div>
                <p className="text-[11px] text-[#8E8E93]">Thời gian tăng ca</p>

                <p className="mt-0.5 text-xs font-semibold text-[#1C1C1E] dark:text-white">
                  {formatDate(notification.overtimeDate)}

                  {notification.overtimeHours != null && (
                    <> • {notification.overtimeHours} giờ</>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= FOOTER ================= */}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[#8E8E93]">
            <CheckCircle2 size={13} />

            <span>Yêu cầu mới</span>
          </div>

          {onView && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();

                onClose();

                onView(requestId);
              }}
              className="
                flex
                items-center
                gap-1
                rounded-lg
                px-2.5
                py-1.5
                text-xs
                font-semibold
                text-[#007AFF]
                transition
                hover:bg-[#007AFF]/10
              "
            >
              Xem chi tiết
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom accent */}

      <div className="h-[2px] w-full bg-black/[0.04] dark:bg-white/[0.05]">
        <div
          className={`
            h-full
            w-1/3
            rounded-full
            ${config.accent}
          `}
        />
      </div>
    </div>
  );
}
