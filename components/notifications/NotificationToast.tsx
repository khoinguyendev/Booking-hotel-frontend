"use client";

import { X, ArrowRight, CalendarDays, Clock3 } from "lucide-react";

interface NotificationToastProps {
  onClose: () => void;
  avatar?: string | null;
  name: string;
  employeeCode: string;
  position?: string | null;
  title: string;
  description?: string | null;
  time?: string;
  type?: "leave" | "shift" | "overtime" | "other";
  onView?: () => void;
}

const typeConfig = {
  leave: {
    label: "Nghỉ phép",
    icon: CalendarDays,
    className: "bg-orange-50 text-orange-600 dark:bg-orange-500/10",
  },
  shift: {
    label: "Đổi ca",
    icon: Clock3,
    className: "bg-blue-50 text-blue-600 dark:bg-blue-500/10",
  },
  overtime: {
    label: "Tăng ca",
    icon: Clock3,
    className: "bg-purple-50 text-purple-600 dark:bg-purple-500/10",
  },
  other: {
    label: "Yêu cầu mới",
    icon: CalendarDays,
    className: "bg-gray-100 text-gray-600 dark:bg-white/10",
  },
};

export default function NotificationToast({
  avatar,
  onClose,
  name,
  employeeCode,
  position,
  title,
  description,
  time = "Vừa xong",
  type = "other",
  onView,
}: NotificationToastProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="
    notification-toast-enter
    group
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
      <div className="absolute left-0 top-0 h-full w-1 bg-[#007AFF]" />

      <div className="p-4">
        {/* Header */}
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

            {/* Online dot */}
            <span
              className="
                absolute
                bottom-0
                right-0
                h-3
                w-3
                rounded-full
                border-2
                border-white
                bg-emerald-500
                dark:border-[#1C1C1E]
              "
            />
          </div>

          {/* Employee info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#1C1C1E] dark:text-white">
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
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("CLICK X");
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

        {/* Content */}
        <div className="mt-4">
          {/* Type */}
          <div className="flex items-center gap-2">
            <div
              className={`
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                ${config.className}
              `}
            >
              <Icon size={15} />
            </div>

            <div>
              <p className="text-xs font-medium text-[#8E8E93]">
                {config.label}
              </p>

              <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white">
                {title}
              </p>
            </div>
          </div>

          {/* Description */}
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
                "{description}"
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#8E8E93]">
              {time}
            </span>

            {onView && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onView();
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
      </div>

      {/* Bottom progress */}
      <div className="h-[2px] w-full bg-[#007AFF]/10">
        <div className="h-full w-1/3 rounded-full bg-[#007AFF]" />
      </div>
    </div>
  );
}
