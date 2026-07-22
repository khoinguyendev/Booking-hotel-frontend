'use client';

import WorkCalendar, {
  WorkScheduleResponse,
} from '@/components/work-schedule/WorkCalendar';
import { staffService } from '@/services/staft.service';
import React, { useEffect } from 'react';

const mockSchedules: WorkScheduleResponse[] = [
  {
    id: 1,
    workDate: '2026-07-01',
    isDayOff: false,
    shift: {
      id: 1,
      name: 'Ca sáng',
      startTime: '07:00:00',
      endTime: '15:00:00',
    },
    attendance: null,
  },
  {
    id: 2,
    workDate: '2026-07-02',
    isDayOff: false,
    shift: {
      id: 2,
      name: 'Ca chiều',
      startTime: '15:00:00',
      endTime: '23:00:00',
    },
    attendance: null,
  },
  {
    id: 3,
    workDate: '2026-07-03',
    isDayOff: true,
    shift: null,
    attendance: null,
  },
  {
    id: 4,
    workDate: '2026-07-05',
    isDayOff: false,
    shift: {
      id: 3,
      name: 'Ca tối',
      startTime: '23:00:00',
      endTime: '07:00:00',
    },
    attendance: null,
  },
  {
    id: 5,
    workDate: '2026-07-07',
    isDayOff: false,
    shift: {
      id: 1,
      name: 'Ca sáng',
      startTime: '07:00:00',
      endTime: '15:00:00',
    },
    attendance: null,
  },
  {
    id: 6,
    workDate: '2026-07-08',
    isDayOff: false,
    shift: {
      id: 2,
      name: 'Ca chiều',
      startTime: '15:00:00',
      endTime: '23:00:00',
    },
    attendance: null,
  },
  {
    id: 7,
    workDate: '2026-07-10',
    isDayOff: false,
    shift: {
      id: 3,
      name: 'Ca tối',
      startTime: '23:00:00',
      endTime: '07:00:00',
    },
    attendance: null,
  },
  {
    id: 8,
    workDate: '2026-07-12',
    isDayOff: true,
    shift: null,
    attendance: null,
  },
  {
    id: 9,
    workDate: '2026-07-14',
    isDayOff: false,
    shift: {
      id: 1,
      name: 'Ca sáng',
      startTime: '07:00:00',
      endTime: '15:00:00',
    },
    attendance: null,
  },
  {
    id: 10,
    workDate: '2026-07-16',
    isDayOff: false,
    shift: {
      id: 2,
      name: 'Ca chiều',
      startTime: '15:00:00',
      endTime: '23:00:00',
    },
    attendance: null,
  },
  {
    id: 11,
    workDate: '2026-07-18',
    isDayOff: false,
    shift: {
      id: 1,
      name: 'Ca sáng',
      startTime: '07:00:00',
      endTime: '15:00:00',
    },
    attendance: null,
  },
  {
    id: 12,
    workDate: '2026-07-20',
    isDayOff: false,
    shift: {
      id: 3,
      name: 'Ca tối',
      startTime: '23:00:00',
      endTime: '07:00:00',
    },
    attendance: null,
  },
  {
    id: 13,
    workDate: '2026-07-22',
    isDayOff: true,
    shift: null,
    attendance: null,
  },
  {
    id: 14,
    workDate: '2026-07-24',
    isDayOff: false,
    shift: {
      id: 1,
      name: 'Ca sáng',
      startTime: '07:00:00',
      endTime: '15:00:00',
    },
    attendance: null,
  },
  {
    id: 15,
    workDate: '2026-07-26',
    isDayOff: false,
    shift: {
      id: 2,
      name: 'Ca chiều',
      startTime: '15:00:00',
      endTime: '23:00:00',
    },
    attendance: null,
  },
  {
    id: 16,
    workDate: '2026-07-28',
    isDayOff: false,
    shift: {
      id: 3,
      name: 'Ca tối',
      startTime: '23:00:00',
      endTime: '07:00:00',
    },
    attendance: null,
  },
  {
    id: 17,
    workDate: '2026-07-30',
    isDayOff: true,
    shift: null,
    attendance: null,
  },
];

export default function WorkSchedulePage() {
  const [schedules, setSchedules] = React.useState<WorkScheduleResponse[]>([]);

 useEffect(() => {
  const fetchSchedules = async () => {
    try {
      const response = await staffService.getWorkScheduleByMe("2026", "07");
      console.log("Fetched work schedules:", response.data.data);
      setSchedules(response.data.data);
    } catch (error) {
      console.error("Error fetching work schedules:", error);
    }
  };

  fetchSchedules();
}, []);
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] p-6">
      <WorkCalendar schedules={schedules} />
    </div>
  );
}