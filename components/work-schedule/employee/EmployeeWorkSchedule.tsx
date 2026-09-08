"use client";

import Loading from "@/components/common/Spinner";
import WorkCalendar from "@/components/work-schedule/shared/WorkCalendar";
import { useMyWorkSchedule } from "@/hooks/useMyWorkSchedule";
import { useState } from "react";

export default function EmployeeWorkSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { schedules, loading } = useMyWorkSchedule(currentDate);
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] p-6">
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <WorkCalendar
          currentDate={currentDate}
          schedules={schedules}
          setDate={setCurrentDate}
        />
      )}
    </div>
  );
}
