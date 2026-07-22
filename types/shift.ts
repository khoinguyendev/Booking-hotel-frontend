export interface Shift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}


export interface Shift {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
}

export interface ApiResponse<T> {
    success: boolean;
    code: string;
    message: string;
    data: T;
    errors: any;
}

export type ShiftResponse = ApiResponse<Shift[]>;