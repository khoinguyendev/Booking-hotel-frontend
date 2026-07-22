export interface CreateWorkScheduleRequest {
    hotelStaffId: number;
    shiftId: number;
    workDate: string;
    isDayOff: boolean;
}

export interface WorkScheduleResponse {
    id: number;
    workDate: string;
    isDayOff: boolean;
    shift: any;
    attendance: any;
}