"use client";

import WorkCalendar, {
  WorkScheduleResponse,
} from "@/components/work-schedule/WorkCalendar";
import { staffService } from "@/services/staft.service";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function WorkSchedulePage() {
  const [schedules, setSchedules] = React.useState<WorkScheduleResponse[]>([]);
  const params = useParams();

  const id = params.id as string; // Lấy id từ params và ép kiểu sang string
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await staffService.getWorkScheduleByEmployee(
          id,
          "2026",
          "07",
        );
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
