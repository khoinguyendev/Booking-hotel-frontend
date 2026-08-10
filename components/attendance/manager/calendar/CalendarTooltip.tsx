'use client';

import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Moon,
    Users,
} from 'lucide-react';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { CalendarAttendance } from './AttendanceCalendar';

interface Props {
    date: Date;

    attendance: CalendarAttendance;
}

export default function CalendarTooltip({
    date,
    attendance,
}: Props) {

    const rate =
        attendance.working === 0
            ? 0
            : (
                attendance.present /
                attendance.working
            ) * 100;

    return (
        <div className="w-56 space-y-4">

            <div >

                <div className="flex items-center gap-2">

                    <CalendarDays
                        size={18}
                        className="text-[#007AFF]"
                    />

                    <span className="font-bold">

                        {format(
                            date,
                            "EEEE, dd/MM/yyyy",
                            {
                                locale: vi,
                            }
                        )}

                    </span>

                </div>

            </div>

            <div className="space-y-3">

                <Item
                    icon={
                        <Users size={16} />
                    }
                    color="bg-blue-500"
                    label="Có ca"
                    value={attendance.working}
                />

                <Item
                    icon={
                        <CheckCircle2 size={16} />
                    }
                    color="bg-green-500"
                    label="Có mặt"
                    value={attendance.present}
                />

                <Item
                    icon={
                        <Clock3 size={16} />
                    }
                    color="bg-orange-500"
                    label="Đi trễ"
                    value={attendance.late}
                />

                <Item
                    icon={<Moon size={16} />}
                    color="bg-gray-500"
                    label="Nghỉ"
                    value={attendance.dayOff}
                />

            </div>

            <div className="border-t pt-3">

                <div className="flex items-center justify-between">

                    <span className="text-sm text-muted-foreground">
                        Tỷ lệ có mặt
                    </span>

                    <span className="font-bold text-green-600">
                        {rate.toFixed(1)}%
                    </span>

                </div>

            </div>

        </div>
    );
}

function Item({
    icon,
    color,
    label,
    value,
}: {
    icon: React.ReactNode;

    color: string;

    label: string;

    value: number;
}) {
    return (
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

                <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${color}`}
                >
                    {icon}
                </div>

                <span>{label}</span>

            </div>

            <span className="font-semibold">
                {value}
            </span>

        </div>
    );
}