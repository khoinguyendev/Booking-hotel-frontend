import { useCallback, useEffect, useState } from "react";

import { attendanceService } from "@/services/attendance.service";
import { usePagination } from "./usePayroll";

import {
  AttendanceRecord,
  AttendanceStatsResponse,
  CalendarAttendanceResponse,
} from "@/types/attendance";

interface Props {
  date: string;
  positionId?: number;
  shiftId?: number;
  search?: string;
}

export function useAttendance({ date, positionId, shiftId, search }: Props) {
  const [loading, setLoading] = useState(false);

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const [attendanceStats, setAttendanceStats] =
    useState<AttendanceStatsResponse | null>(null);

  const [calendarAttendance, setCalendarAttendance] = useState<
    CalendarAttendanceResponse[]
  >([]);

  const pagination = usePagination();

  const { page, pageSize, setTotalItems, setTotalPages } = pagination;

  // =========================
  // Attendance records
  // =========================

  const fetchAttendanceRecords = useCallback(async () => {
    try {
      setLoading(true);

      const res = await attendanceService.getAttendanceByDate({
        workDate: date,
        page,
        pageSize,
        positionId: positionId && positionId > 0 ? positionId : undefined,
        shiftId: shiftId && shiftId > 0 ? shiftId : undefined,
        search: search?.trim() || undefined,
      });

      const data = res.data.data;

      setAttendanceRecords(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    date,
    page,
    pageSize,
    positionId,
    shiftId,
    search,
    setTotalItems,
    setTotalPages,
  ]);

  // =========================
  // Stats
  // =========================

  const fetchAttendanceStats = useCallback(async () => {
    try {
      const res = await attendanceService.getAttendanceStats();

      setAttendanceStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // =========================
  // Calendar
  // =========================

  const fetchCalendarAttendance = useCallback(async () => {
    try {
      const res = await attendanceService.getCalendarAttendance();

      setCalendarAttendance(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // =========================
  // Fetch records when filter changes
  // =========================

  useEffect(() => {
    fetchAttendanceRecords();
  }, [fetchAttendanceRecords]);

  // =========================
  // Fetch stats + calendar
  // =========================

  useEffect(() => {
    fetchAttendanceStats();
    fetchCalendarAttendance();
  }, [fetchAttendanceStats, fetchCalendarAttendance]);

  return {
    attendanceRecords,
    attendanceStats,
    calendarAttendance,

    loading,

    pagination,

    refetch: fetchAttendanceRecords,

    refetchStats: fetchAttendanceStats,

    refetchCalendar: fetchCalendarAttendance,
  };
}
