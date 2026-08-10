'use client';

import {
  Users,
  UserCheck,
  Coffee,
  CalendarX,
} from 'lucide-react';

import StaffStatCard from './StaffStatCard';
import { IStaffStats } from '@/types/staff';


interface Props {
  data: IStaffStats|null;
}

export default function StaffStats({ data }: Props) {
  
if (!data) return null;
  return (
    <div
      className="
        grid
        gap-5
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StaffStatCard
        title="Tổng nhân viên"
        value={data.totalStaff}
        icon={Users}
        color="blue"
        description="Toàn bộ nhân viên"
      />

      <StaffStatCard
        title="Đang làm hôm nay"
        value={data.workingStaff}
        icon={UserCheck}
        color="green"
        description="Đã có lịch làm"
      />

      <StaffStatCard
        title="Nghỉ hôm nay"
        value={data.dayOffStaff}
        icon={Coffee}
        color="orange"
        description="Nghỉ phép / Nghỉ ca"
      />

      <StaffStatCard
        title="Chưa phân ca"
        value={data.noShiftStaff}
        icon={CalendarX}
        color="red"
        description="Cần sắp lịch"
      />
    </div>
  );
}