'use client';

import {
  CalendarDays,
  Clock3,
  FileText,
  User,
  BriefcaseBusiness,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Badge } from '@/components/ui/badge';

import { AttendanceRecord } from '@/types/attendance';
import AttendanceHistory from '../drawer/AttendanceHistory';

interface Props {
  open: boolean;

  attendance: AttendanceRecord | null;

  onClose: () => void;
}

export default function AttendanceDrawer({
  open,
  attendance,
  onClose,
}: Props) {
  if (!attendance) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onClose}
    >
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">

        <SheetHeader>

          <SheetTitle>
            Chi tiết chấm công
          </SheetTitle>

        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Employee */}

          <div className="rounded-3xl border p-5">

            <div className="flex items-center gap-4">

              <Avatar className="h-16 w-16">

                <AvatarImage src={attendance.avatar} />

                <AvatarFallback>
                  {attendance.fullName.charAt(0)}
                </AvatarFallback>

              </Avatar>

              <div>

                <h3 className="text-lg font-bold">
                  {attendance.fullName}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {attendance.employeeCode}
                </p>

              </div>

            </div>

          </div>

          {/* Info */}

          <Section title="Thông tin nhân viên">

            <Item
              icon={<BriefcaseBusiness size={18} />}
              label="Chức vụ"
              value={attendance.position}
            />

            <Item
              icon={<CalendarDays size={18} />}
              label="Ngày làm"
              value={attendance.workDate}
            />

            <Item
              icon={<Clock3 size={18} />}
              label="Ca làm"
              value={attendance.shift}
            />

          </Section>

          {/* Attendance */}

          <Section title="Chấm công">

            <Item
              icon={<Clock3 size={18} />}
              label="Check-in"
              value={
                attendance.checkInTime ??
                '--:--'
              }
            />

            <Item
              icon={<Clock3 size={18} />}
              label="Check-out"
              value={
                attendance.checkOutTime ??
                '--:--'
              }
            />

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <User size={18} />

                <span>Trạng thái</span>

              </div>

              <StatusBadge
                status={attendance.status}
              />

            </div>

          </Section>

          {/* Note */}

          <Section title="Ghi chú">

            <div className="flex gap-2">

              <FileText
                size={18}
                className="mt-1"
              />

              <p className="text-sm text-muted-foreground">

                {attendance.note ||
                  'Không có ghi chú.'}

              </p>

            </div>

          </Section>
                    <AttendanceHistory
  records={[
    {
      id: 1,
      workDate: '04/08/2026',
      checkInTime: '07:58',
      checkOutTime: '17:01',
      status: 'Present',
    },
    {
      id: 2,
      workDate: '03/08/2026',
      checkInTime: '08:12',
      checkOutTime: '17:00',
      status: 'Late',
    },
    {
      id: 3,
      workDate: '02/08/2026',
      status: 'DayOff',
    },
  ]}
/>
        </div>

      </SheetContent>
    </Sheet>
  );
}

function Section({
  title,
  children,
}: React.PropsWithChildren<{
  title: string;
}>) {
  return (
    <div className="rounded-3xl border p-5">

      <h4 className="mb-4 font-bold">
        {title}
      </h4>

      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}

function Item({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;

  label: string;

  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2 text-muted-foreground">

        {icon}

        <span>{label}</span>

      </div>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AttendanceRecord['status'];
}) {
  switch (status) {
    case 'Present':
      return (
        <Badge className="bg-green-500">
          Có mặt
        </Badge>
      );

    case 'Late':
      return (
        <Badge className="bg-orange-500">
          Đi trễ
        </Badge>
      );

    case 'Absent':
      return (
        <Badge variant="destructive">
          Vắng
        </Badge>
      );

    case 'DayOff':
      return (
        <Badge variant="secondary">
          Nghỉ
        </Badge>
      );

    default:
      return (
        <Badge>
          Chưa check-in
        </Badge>
      );
  }
}