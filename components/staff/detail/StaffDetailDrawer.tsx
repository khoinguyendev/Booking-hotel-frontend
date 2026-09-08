"use client";

import {
  X,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CalendarDays,
  UserCircle2,
} from "lucide-react";

import { HotelStaff } from "@/types/staff";
import { useEffect, useState } from "react";
import { staffService } from "@/services/staft.service";
import { getMonth, getYear } from "date-fns";
import { useRouter } from "next/navigation";
import StaffSchedule from "./StaffSchedule";
import { WorkScheduleResponse } from "@/components/work-schedule/shared/WorkCalendar";

interface Props {
  open: boolean;

  staff?: HotelStaff | null;

  onClose: () => void;

  onEdit?: () => void;
}

export default function StaffDetailDrawer({
  open,
  staff,
  onClose,
  onEdit,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<WorkScheduleResponse[]>([]);
  useEffect(() => {
    if (!open || !staff?.userId) return;

    fetchEmployeeSchedule(staff.userId);
  }, [open, staff?.userId]);

  const fetchEmployeeSchedule = async (staffId: number) => {
    try {
      setLoading(true);

      const response = await staffService.getWorkScheduleByEmployee(
        staffId.toString(),
        getYear(new Date()).toString(),
        (getMonth(new Date()) + 1).toString(),
      );

      setSchedules(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
          transition-opacity

          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-50

          flex
          h-screen
          w-full
          max-w-xl
          flex-col

          bg-white

          shadow-2xl

          transition-transform
          duration-300

          dark:bg-[#1C1C1E]

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b

            border-[#E5E5EA]

            px-6
            py-5

            dark:border-[#2C2C2E]
          "
        >
          <div>
            <h2 className="text-xl font-bold">Chi tiết nhân viên</h2>

            <p className="mt-1 text-sm text-[#8E8E93]">
              Thông tin cá nhân và lịch làm việc
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2

              hover:bg-[#F2F2F7]

              dark:hover:bg-[#2C2C2E]
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">
          {/* Avatar */}

          <div className="flex flex-col items-center">
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center

                rounded-full

                bg-[#007AFF]

                text-3xl
                font-bold
                text-white
              "
            >
              {getInitials(staff?.fullName)}
            </div>

            <h3 className="mt-4 text-xl font-bold">
              {staff?.fullName ?? "--"}
            </h3>

            <p className="text-sm text-[#8E8E93]">{staff?.employeeCode}</p>
          </div>

          {/* Info */}

          <div
            className="
              mt-8

              rounded-3xl

              border

              border-[#E5E5EA]

              bg-[#FAFAFA]

              p-5

              dark:border-[#2C2C2E]
              dark:bg-[#2C2C2E]
            "
          >
            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={staff?.email ?? "--"}
            />

            <InfoRow
              icon={<Phone size={18} />}
              label="Điện thoại"
              value={staff?.phone ?? "--"}
            />

            <InfoRow
              icon={<Briefcase size={18} />}
              label="Chức vụ"
              value={staff?.position ?? "--"}
            />

            {/* <InfoRow
              icon={<Building2 size={18} />}
              label="Khách sạn"
              value={staff?.?.name ?? '--'}
            /> */}

            <InfoRow
              icon={<CalendarDays size={18} />}
              label="Ngày vào làm"
              value={
                staff?.joinedAt
                  ? new Date(staff.joinedAt).toLocaleDateString("vi-VN")
                  : "--"
              }
            />
          </div>

          {/* Placeholder */}

          <div className="mt-8 space-y-5">
            <Section
              title="Lịch làm việc"
              action={
                <button
                  onClick={() =>
                    router.push(
                      `/quan-ly/nhan-vien/${staff?.userId}/lich-lam-viec?employeeId=${staff?.id}`,
                    )
                  }
                  className="
        rounded-lg
        bg-blue-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition-colors
        hover:bg-blue-700
      "
                >
                  Xem tất cả
                </button>
              }
            >
              <StaffSchedule schedules={schedules} />
            </Section>

            <Section title="Chấm công">Sẽ hiển thị StaffAttendance</Section>

            <Section title="Đơn từ">Sẽ hiển thị StaffRequests</Section>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            justify-end
            gap-3

            border-t

            border-[#E5E5EA]

            bg-white

            p-5

            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
          "
        >
          <button
            onClick={onClose}
            className="
              rounded-2xl

              border

              border-[#E5E5EA]

              px-5
              py-3

              font-medium

              dark:border-[#2C2C2E]
            "
          >
            Đóng
          </button>

          <button
            onClick={onEdit}
            className="
              rounded-2xl

              bg-[#007AFF]

              px-5
              py-3

              font-semibold
              text-white
            "
          >
            Chỉnh sửa
          </button>
        </div>
      </aside>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="text-[#007AFF]">{icon}</div>

      <div className="flex-1">
        <p className="text-xs text-[#8E8E93]">{label}</p>

        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-3xl

        border

        border-[#E5E5EA]

        p-5

        dark:border-[#2C2C2E]
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="mb-4 font-bold">{title}</h4>
        {action}
      </div>

      <div className="text-sm text-[#8E8E93]">{children}</div>
    </div>
  );
}

function getInitials(name?: string) {
  if (!name) return <UserCircle2 size={36} />;

  return name
    .split(" ")
    .map((x) => x[0])
    .slice(-2)
    .join("")
    .toUpperCase();
}
