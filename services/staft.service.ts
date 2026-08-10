import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { HotelStaff, IStaffStats } from "@/types/staff";
import { WorkScheduleResponse } from "@/types/workSchedule";

export const staffService = {
  getEmployee({
    page,
    pageSize,
    search,
    positionId,
  }: {
    page: number;
    pageSize: number;
    search?: string;
    positionId?: number;
  }) {
    let url = `/hotel-staffs?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (positionId) {
      url += `&positionId=${positionId}`;
    }
    console.log("Fetching employees with URL:", url);
    return api.get<ApiResponse<PaginatedResponse<HotelStaff>>>(url);
  },
  createStaff(data: any) {
    return api.post<ApiResponse<HotelStaff>>(`/hotel-staffs`, data);
  },
  updateStaff(staffId: number, data: any) {
    return api.put<ApiResponse<HotelStaff>>(`/hotel-staffs/${staffId}`, data);
  },
  getWorkScheduleByMe(year: string, month: string) {
    return api.get<ApiResponse<WorkScheduleResponse[]>>(
      `/hotel-staffs/me/work-schedules?year=${year}&month=${month}`,
    );
  },
  getWorkScheduleOfDateByMe(date:string) {
    return api.get<ApiResponse<any>>(
      `/hotel-staffs/me/work-schedule/date?date=${date}`,
    );
  },
  getWorkScheduleByEmployee(employeeId: string, year: string, month: string) {
    return api.get<ApiResponse<any>>(
      `/hotel-staffs/${employeeId}/work-schedules?year=${year}&month=${month}`,
    );
  },
  getStaffStats() {
    return api.get<ApiResponse<IStaffStats>>(`/hotel-staffs/attendance/stats`);
  },
  importStaff(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/hotel-staffs/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
