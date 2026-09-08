import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  AttendanceHistoryResponse,
  AttendanceRecord,
  AttendanceStatsResponse,
  CalendarAttendanceResponse,
} from "@/types/attendance";
import { PaginatedResponse } from "@/types/pagination";

export const attendanceService = {
  getAttendanceStats() {
    return api.get<ApiResponse<AttendanceStatsResponse>>(`/attendances/stats`);
  },
  getAttendanceByDate(params: AttendanceParams) {
    return api.get<ApiResponse<PaginatedResponse<AttendanceRecord>>>(
      `/attendances`,
      { params },
    );
  },
  getCalendarAttendance() {
    return api.get<ApiResponse<CalendarAttendanceResponse[]>>(
      `/attendances/calendar`,
    );
  },
  summary(data: SummaryRequest) {
    console.log(data);
    return api.post<ApiResponse<void>>("/attendances/finalize-shift", data);
  },
  getHistory(params: AttendanceHistoryRequest) {
    return api.get<ApiResponse<AttendanceHistoryResponse[]>>(
      "/attendances/history",
      {
        params,
      },
    );
  },
};

export interface AttendanceParams {
  workDate?: string;

  page?: number;

  pageSize?: number;

  search?: string;

  positionId?: number;

  shiftId?: number;
}
export interface SummaryRequest {
  workDate: string;
  type:number;
  shiftId: number;
}

export interface AttendanceHistoryRequest {
  month: number;
  year: number;
}
