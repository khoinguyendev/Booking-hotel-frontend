export type RequestType =
  | 'Leave'
  | 'ShiftChange'
  | 'Overtime';

export type RequestStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected';

export interface LeaveData {
  fromDate: string;
  toDate: string;
}

export interface ShiftChangeData {
  currentShiftName: string;
  currentShiftId: number;
  newShiftName: string;
  newShiftId: number;
  workScheduleId: number;
  targetWorkScheduleId?: number;
  newWorkDate?: string;
  currentDate?: string;
}

export interface OvertimeData {
  workDate: string;
  fromTime: string;
  toTime: string;
  hours: number;
}

export interface StaffRequest {
  id: number;

  employeeCode: string;

  staffName: string;

  createdAt: string;

  type: RequestType;

  status: RequestStatus;

  reason: string;

  rejectReason?: string;

  approvedBy?: string;

  approvedAt?: string;
  detail?: LeaveData | ShiftChangeData | OvertimeData;

}

export interface LeaveRequest{
  id: number,
  staffRequestId: number,
  hotelStaffId: number,
  staffName: string,
  fromDate: string,
  toDate: string,
  reason: string,
  status: RequestStatus,
  createdAt: string
}
 export interface ShiftChangeRequest {
  workScheduleId: number;
  targetWorkScheduleId?: number;
  newShiftId?: number;
  workDate: string;
  reason: string;
}