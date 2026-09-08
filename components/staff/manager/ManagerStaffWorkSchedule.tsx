"use client";


import WorkCalendar from "@/components/work-schedule/shared/WorkCalendar";
import { staffService } from "@/services/staft.service";
import { WorkScheduleResponse } from "@/types/workSchedule";
import { getMonth } from "date-fns";
import { getYear } from "date-fns";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ManagerStaffWorkSchedule() {
  const [schedules, setSchedules] = React.useState<WorkScheduleResponse[]>([]);
  const params = useParams();

  const id = params.id as string; // Lấy id từ params và ép kiểu sang string
 const year = getYear(new Date()).toString();
  const month = (getMonth(new Date())+1).toString();
  console.log("Employee ID:", id, "Year:", year, "Month:", month); // Debug: In ra id, year và month để kiểm tra
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await staffService.getWorkScheduleByEmployee(
          id,
          year,
          month,
        );
        console.log("Fetched work schedules:", response.data);
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