import axios from "@/lib/axios";
import {
    CreateWorkScheduleRequest,
    WorkScheduleResponse,
} from "@/types/workSchedule";

interface ApiResponse<T> {
    success: boolean;
    code: string;
    message: string;
    data: T;
    errors: any;
}

export const createWorkSchedule = async (
    body: CreateWorkScheduleRequest
) => {
    const response = await axios.post<ApiResponse<WorkScheduleResponse>>(
        "/work-schedules",
        body
    );

    return response.data;
};