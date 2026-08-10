'use client';

import { format } from 'date-fns';
import {
  Calendar,
  Clock3,
  User,
  Briefcase,
  Coffee,
  CheckCircle2,
  XCircle,
  Pencil,
} from 'lucide-react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  schedule?: {
    employeeName: string;

    avatar?: string;

    employeeCode: string;

    position: string;

    workDate: Date;

    shiftName: string;

    startTime: string;

    endTime: string;

    isDayOff: boolean;

    attendance?: {
      checkedIn: boolean;

      checkInTime?: string;

      checkOutTime?: string;

      status: string;
    };

    note?: string;
  };

  onEdit?: () => void;

  onAttendance?: () => void;

  onDayOff?: () => void;
}

export default function ScheduleDrawer({
  open,
  onOpenChange,
  schedule,
  onEdit,
  onAttendance,
  onDayOff,
}: Props) {
  if (!schedule) return null;

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="max-h-[90vh]">

        <DrawerHeader>

          <DrawerTitle>
            Chi tiết lịch làm việc
          </DrawerTitle>

        </DrawerHeader>

        <div className="space-y-6 overflow-y-auto px-6 pb-6">

          {/* Employee */}

          <div className="flex items-center gap-4">

            <Avatar className="h-16 w-16">

              <AvatarImage src={schedule.avatar} />

              <AvatarFallback>

                {schedule.employeeName[0]}

              </AvatarFallback>

            </Avatar>

            <div>

              <h3 className="text-lg font-bold">
                {schedule.employeeName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {schedule.employeeCode}
              </p>

              <Badge className="mt-2">
                {schedule.position}
              </Badge>

            </div>

          </div>

          {/* Info */}

          <div className="grid gap-4 rounded-2xl border p-5">

            <InfoRow
              icon={<Calendar size={18} />}
              label="Ngày"
              value={format(
                schedule.workDate,
                'dd/MM/yyyy'
              )}
            />

            <InfoRow
              icon={<Clock3 size={18} />}
              label="Ca làm"
              value={schedule.shiftName}
            />

            <InfoRow
              icon={<Clock3 size={18} />}
              label="Giờ"
              value={`${schedule.startTime} - ${schedule.endTime}`}
            />

            <InfoRow
              icon={<Briefcase size={18} />}
              label="Trạng thái"
              value={
                schedule.isDayOff
                  ? 'Nghỉ'
                  : 'Làm việc'
              }
            />

          </div>

          {/* Attendance */}

          <div className="rounded-2xl border p-5">

            <h3 className="mb-4 font-semibold">
              Chấm công
            </h3>

            {schedule.attendance ? (
              <div className="space-y-3">

                <InfoRow
                  icon={<CheckCircle2 size={18} />}
                  label="Check in"
                  value={
                    schedule.attendance
                      .checkInTime ??
                    '--'
                  }
                />

                <InfoRow
                  icon={<CheckCircle2 size={18} />}
                  label="Check out"
                  value={
                    schedule.attendance
                      .checkOutTime ??
                    '--'
                  }
                />

                <InfoRow
                  icon={<User size={18} />}
                  label="Trạng thái"
                  value={
                    schedule.attendance
                      .status
                  }
                />

              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">

                <XCircle size={18} />

                Chưa có dữ liệu chấm công

              </div>
            )}

          </div>

          {/* Note */}

          <div className="rounded-2xl border p-5">

            <h3 className="mb-3 font-semibold">
              Ghi chú
            </h3>

            <p className="text-sm text-muted-foreground">
              {schedule.note || 'Không có'}
            </p>

          </div>

          {/* Actions */}

          <div className="grid gap-3">

            <Button
              onClick={onEdit}
              className="w-full"
            >
              <Pencil className="mr-2 h-4 w-4" />

              Chỉnh sửa ca
            </Button>

            <Button
              variant="outline"
              onClick={onAttendance}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />

              Xem chấm công
            </Button>

            <Button
              variant="outline"
              onClick={onDayOff}
            >
              <Coffee className="mr-2 h-4 w-4" />

              Đánh dấu nghỉ
            </Button>

          </div>

        </div>

      </DrawerContent>

    </Drawer>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;

  label: string;

  value: React.ReactNode;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2 text-muted-foreground">

        {icon}

        <span>{label}</span>

      </div>

      <div className="font-medium">
        {value}
      </div>

    </div>
  );
}