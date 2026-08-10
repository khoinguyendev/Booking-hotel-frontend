export interface CreatePositionSalaryPolicyRequest {
  positionId: number;

  shiftId: number;

  hourlyRate: number;

  shiftMultiplier: number;


  effectiveFrom: string;

  effectiveTo?: string;
}

export interface UpdatePositionSalaryPolicyRequest {
  hourlyRate: number;

  shiftMultiplier: number;


  effectiveFrom: string;

  effectiveTo?: string;
}

export interface PositionSalaryPolicyResponse {
  id: number;

  positionId: number;

  positionName: string;

  shiftId: number;

  shiftName: string;

  hourlyRate: number;

  shiftMultiplier: number;


  effectiveFrom: string;

  effectiveTo?: string | null;
}