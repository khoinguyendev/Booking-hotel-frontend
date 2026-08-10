'use client';

import {
  Building2,
  Briefcase,
  CalendarDays,
  Mail,
  Phone,
  UserCircle2,
  BadgeCheck,
} from 'lucide-react';

import { HotelStaff } from '@/types/staff';

interface Props {
  staff?: HotelStaff | null;
}

export default function StaffProfile({ staff }: Props) {
  return (
    <div className="space-y-6">
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

        <h2 className="mt-4 text-xl font-bold">
          {staff?.fullName ?? '--'}
        </h2>

        <p className="mt-1 text-sm text-[#8E8E93]">
          {staff?.employeeCode}
        </p>

      </div>

      {/* Information */}

      <div
        className="
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
          value={staff?.email ?? '--'}
        />

        <InfoRow
          icon={<Phone size={18} />}
          label="Điện thoại"
          value={staff?.phone ?? '--'}
        />

        <InfoRow
          icon={<Briefcase size={18} />}
          label="Chức vụ"
          value={staff?.position ?? '--'}
        />


        <InfoRow
          icon={<BadgeCheck size={18} />}
          label="Mã nhân viên"
          value={staff?.employeeCode ?? '--'}
        />

        <InfoRow
          icon={<CalendarDays size={18} />}
          label="Ngày vào làm"
          value={
            staff?.joinedAt
              ? new Date(staff.joinedAt).toLocaleDateString('vi-VN')
              : '--'
              
          }
        />
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 py-3">

      <div className="text-[#007AFF]">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-xs text-[#8E8E93]">
          {label}
        </p>

        <p className="mt-1 font-medium break-all">
          {value}
        </p>

      </div>

    </div>
  );
}

function getInitials(name?: string) {
  if (!name) {
    return <UserCircle2 size={36} />;
  }

  return name
    .split(' ')
    .map((item) => item[0])
    .slice(-2)
    .join('')
    .toUpperCase();
}