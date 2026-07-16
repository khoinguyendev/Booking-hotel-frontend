// services/attendance.service.ts

export interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  checkIn: string;
  checkOut: string;
  status: 'Ontime' | 'Late' | 'Absent';
}

export interface ShiftAllocation {
  id: string;
  department: string;
  shiftName: string;
  time: string;
  staffCount: number;
  color: string;
}

export const getMockAttendanceData = (): AttendanceRecord[] => [
  { id: 'NV-001', name: 'Nguyễn Kiều Trang', department: 'Lễ tân (Front Office)', checkIn: '07:55', checkOut: '17:02', status: 'Ontime' },
  { id: 'NV-002', name: 'Phạm Minh Quân', department: 'Buồng phòng (Housekeeping)', checkIn: '08:15', checkOut: '17:00', status: 'Late' },
  { id: 'NV-003', name: 'Lê Hoàng Long', department: 'Ẩm thực (F&B)', checkIn: '—:—', checkOut: '—:—', status: 'Absent' },
  { id: 'NV-004', name: 'Trần Thế Vinh', department: 'Kỹ thuật (Engineering)', checkIn: '07:48', checkOut: '17:10', status: 'Ontime' },
];

export const getMockShiftsData = (): ShiftAllocation[] => [
  { id: 'S-1', department: 'Lễ tân (Front Office)', shiftName: 'Ca Sáng (Shift A)', time: '06:00 - 14:00', staffCount: 8, color: '#7C3AED' },
  { id: 'S-2', department: 'Buồng phòng (Housekeeping)', shiftName: 'Ca Chiều (Shift B)', time: '14:00 - 22:00', staffCount: 15, color: '#10B981' },
  { id: 'S-3', department: 'Bảo vệ (Security)', shiftName: 'Ca Đêm (Shift C)', time: '22:00 - 06:00', staffCount: 4, color: '#3B82F6' },
];