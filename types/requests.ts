export enum RequestType {
  Leave = 1,
  ShiftChange = 2,
  Overtime = 3,
}

export enum RequestStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
  Cancelled = 4,
}

/**
 * Leave request detail
 */
export interface LeaveRequestDetail {
  id: number;
  staffRequestId: number;
  fromDate: string;
  toDate: string;
}

/**
 * Shift change request detail
 */
export interface ShiftChangeRequestDetail {
  id: number;
  staffRequestId: number;
  workScheduleId: number;
  targetWorkScheduleId: number | null;
  newShiftId: number;
  newShiftName: string;
  currentShiftId: number;
  currentShiftName: string;
  currentWorkDate: string;
  newWorkDate: string | null;
}

/**
 * Overtime request detail
 */
export interface OvertimeRequestDetail {
  id: number;
  staffRequestId: number;

  workScheduleId: number;

  workDate: string;

  fromTime: string;
  toTime: string;

  hours: number;
}

/**
 * Request chung
 */
export interface RequestResponse {
  id: number;

  hotelStaffId: number;

  employeeCode: string;

  staffName: string;

  position: string;

  type: RequestType;

  status: RequestStatus;

  reason?: string | null;

  approvedBy?: number | null;

  approvedAt?: string | null;

  rejectReason?: string | null;

  createdAt: string;

  updatedAt: string;

  leave?: LeaveRequestDetail | null;

  shiftChange?: ShiftChangeRequestDetail | null;

  overtime?: OvertimeRequestDetail | null;
}

/**
 * Pagination
 */




/**
 * Filter
 */
export interface RequestFilter {
  keyword?: string;

  type?: RequestType;

  status?: RequestStatus;

  fromDate?: string;

  toDate?: string;

  page?: number;

  pageSize?: number;
}

/**
 * Thống kê request
 */
export interface RequestStatsResponse {
  total: number;

  pending: number;

  approved: number;

  rejected: number;
}
export interface ShiftChangeRequest{
  workScheduleId:number;
  targetWorkScheduleId?:number;
  newShiftId :number
   newWorkDate :string;
    reason :string;
}

export interface OvertimeRequest {
  workScheduleId: number;
  workDate: string;
  fromTime: string;
  toTime: string;
  reason: string;
}