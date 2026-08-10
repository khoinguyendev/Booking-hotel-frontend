'use client';

import { WorkScheduleResponse } from '@/components/work-schedule/WorkCalendar';
import {
  Coffee,
  Sunrise,
  Sunset,
  MoonStar,
} from 'lucide-react';



interface Props {
  schedules: WorkScheduleResponse[];
}

export default function StaffSchedule({
  schedules,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-5
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="mb-5">

        {/* <h3 className="text-lg font-bold">
          Lịch làm trong tuần này
        </h3> */}

        <p className="mt-1 text-sm text-[#8E8E93]">
          Lịch làm trong tuần này
        </p>

      </div>

      <div className="space-y-3">

        {schedules.map((item) => (
          <div
            key={item.workDate}
            className="
              flex
              items-center
              justify-between

              rounded-2xl

              border

              border-[#F2F2F7]

              px-4
              py-4

              dark:border-[#2C2C2E]
            "
          >
            {/* Left */}

            <div>

              {/* <p className="font-semibold">
                {item.day}
              </p> */}

              <p className="text-sm text-[#8E8E93]">
                {item.workDate}
              </p>

            </div>

            {/* Right */}

            {item.isDayOff ? (
              <div
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  bg-gray-100

                  px-4
                  py-2

                  text-gray-600
                "
              >
                <Coffee size={18} />
                Nghỉ
              </div>
            ) : (
              <div className="flex items-center gap-3">

                {getIcon(item.shift?.name)}

                <div className="text-right">

                  <p className="font-semibold">
                    {item.shift?.name}
                  </p>

                  <p className="text-sm text-[#8E8E93]">
                    {item.shift?.startTime.slice(0,5)}
                    {' - '}
                    {item.shift?.endTime.slice(0,5)}
                  </p>

                </div>

              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

function getIcon(name?: string) {

  const lower = name?.toLowerCase() ?? '';

  if (lower.includes('sáng')) {
    return <Sunrise className="text-blue-500" size={20} />;
  }

  if (lower.includes('chiều')) {
    return <Sunset className="text-orange-500" size={20} />;
  }

  if (lower.includes('tối')) {
    return <MoonStar className="text-violet-500" size={20} />;
  }

  return <Coffee size={20} />;
}