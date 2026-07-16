// app/(admin)/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  DashboardStats, 
  DashboardCharts, 
  DashboardEvents, 
  DashboardRequests 
} from '@/components/dashboard';
import { getMockDashboardData, DashboardData } from '@/services/dashboard.service';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Giả lập gọi API lấy dữ liệu
    const res = getMockDashboardData();
    setData(res);
  }, []);

  if (!data) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-sm text-gray-500">Đang tải dữ liệu hệ thống...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50/50 min-h-screen">
      {/* Tiêu đề trang */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Hệ Thống Quản Lý Nhân Sự & Vận Hành Khách Sạn</h1>
          <p className="text-sm text-gray-500 mt-0.5">Thống kê dữ liệu hoạt động toàn bộ hệ thống ngày hôm nay.</p>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-gray-600">
            Cập nhật mới nhất: {new Date().toLocaleTimeString('vi-VN')}
          </span>
        </div>
      </div>

      {/* Khối Thống kê nhanh số liệu */}
      <DashboardStats stats={data.stats} />

      {/* Khối Biểu đồ Phân tích */}
      <DashboardCharts 
        attendanceData={data.attendanceData} 
        staffAllocation={data.staffAllocation} 
      />

      {/* Khối Sự kiện & Phê duyệt đơn từ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardEvents events={data.upcomingEvents} />
        <DashboardRequests requests={data.pendingRequestsList} />
      </div>
    </div>
  );
}