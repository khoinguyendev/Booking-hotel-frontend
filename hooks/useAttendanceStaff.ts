"use client";

import { useCallback, useEffect, useState } from "react";

import { attendanceService } from "@/services/attendance.service";
import { AttendanceHistoryResponse } from "@/types/attendance";

interface Props {
  month: number;
  year: number;
}

export function useAttendanceHistory({
  month,
  year,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState<
    AttendanceHistoryResponse[]
  >([]);

  const fetchData = useCallback(async () => {
    if ( !month || !year) {
      setRecords([]);
      return;
    }

    try {
      setLoading(true);

      const response = await attendanceService.getHistory({
        month,
        year,
      });

      setRecords(response.data.data);
    } catch (error) {
      console.error(
        "Failed to fetch attendance history:",
        error,
      );

      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [ month, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    records,
    loading,
    refetch: fetchData,
  };
}