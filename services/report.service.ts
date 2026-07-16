// services/report.service.ts

export interface RevenueReport {
  id: string;              // Mã số báo cáo (RP-XXXX)
  title: string;           // Tiêu đề báo cáo
  type: 'Financial' | 'Occupancy' | 'Operational';
  createdDate: string;     // Ngày tạo báo cáo
  totalRevenue: number;    // Doanh thu đặt phòng thực tế (decimal)
  surcharge: number;       // Tổng phụ thu dịch vụ (decimal)
  refunds: number;         // Hoàn tiền hủy phòng (decimal)
  netIncome: number;       // Thu nhập ròng thực tế (decimal)
  accuracyScore: number;   // Điểm khớp dữ liệu (%)
}

export const getMockReports = (): RevenueReport[] => [
  {
    id: 'RP-2026-001',
    title: 'Báo cáo Tài chính Tháng 06/2026',
    type: 'Financial',
    createdDate: '2026-07-01T08:00:00',
    totalRevenue: 345800000.00,
    surcharge: 42350000.00,
    refunds: 15400000.00,
    netIncome: 372750000.00, // Doanh thu thực tế = Doanh thu phòng + Phụ thu - Hoàn tiền
    accuracyScore: 100.00
  },
  {
    id: 'RP-2026-002',
    title: 'Báo cáo Công suất Phòng Tuần 27',
    type: 'Occupancy',
    createdDate: '2026-07-05T17:30:00',
    totalRevenue: 82400000.00,
    surcharge: 11250000.00,
    refunds: 2350000.00,
    netIncome: 91300000.00,
    accuracyScore: 99.85 // Hệ số chênh lệch do sai số lẻ tính giờ lẻ
  },
  {
    id: 'RP-2026-003',
    title: 'Báo cáo Kiểm toán Vận hành Quý II/2026',
    type: 'Operational',
    createdDate: '2026-07-10T10:15:00',
    totalRevenue: 1052300000.00,
    surcharge: 125800000.00,
    refunds: 48900000.00,
    netIncome: 1129200000.00,
    accuracyScore: 100.00
  },
  {
    id: 'RP-2026-004',
    title: 'Báo cáo Doanh thu Ngày lễ 30/04 - 01/05',
    type: 'Financial',
    createdDate: '2026-05-02T09:00:00',
    totalRevenue: 145200000.00,
    surcharge: 18450000.00,
    refunds: 5000000.00,
    netIncome: 158650000.00,
    accuracyScore: 99.90
  }
];