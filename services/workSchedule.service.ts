import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { PaginatedResponse } from "@/types/pagination";
import { EmployeeSchedule } from "@/types/workSchedule";

export const workScheduleService = {
  getWeeklySchedule(params: WeeklyScheduleParams) {
    console.log(params);

    return api.get<ApiResponse<PaginatedResponse<EmployeeSchedule>>>(
      "/work-schedules/week",
      {
        params,
      },
    );
  },
  createWorkSchedule(data: any) {
    return api.post<ApiResponse<void>>("/work-schedules", data);
  },
 
  createManySchedule(data:BatchShiftRequest){
    return api.post<ApiResponse<void>>("/work-schedules/bulk", data);
  },
  updateSchedule(workScheduleId: number,data:WorkScheduleRequest){
    console.log({data})
    return api.put<ApiResponse<void>>(`/work-schedules/${workScheduleId}`, data);
  },
   deleteSchedule(workScheduleId: number){
    return api.delete<ApiResponse<void>>(`/work-schedules/${workScheduleId}`);
  },
  copySchedule(data:CopyShiftRequest){
        return api.post<ApiResponse<void>>("/work-schedules/copy", data);

  },
   importWorkSchedule(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/work-schedules/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
exportExcel(data: ExportExcelScheduleRequest) {
  return api.post("/work-schedules/export", data, {
    responseType: "blob",
  });
}
};

export interface WeeklyScheduleParams {
  weekStart: string;

  page?: number;

  pageSize?: number;

  keyword?: string;

  positionId?: number;

  shiftId?: number;
}
export interface BatchShiftRequest {
  hotelStaffIds: number[];
  shiftId: number;
  toDate: string;
  fromDate:string;
  isDayOff: boolean;
}

export interface CopyShiftRequest{
  
    sourceFrom: string,
    sourceTo: string,
    targetFrom: string,
    mode: string

}

export interface WorkScheduleRequest{
  shiftId:number,
  workDate:string,
}

export interface ExportExcelScheduleRequest{
  toDate:string,
  fromDate:string,
}