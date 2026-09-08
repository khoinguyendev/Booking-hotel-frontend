// app/admin/reports/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getMockReports, RevenueReport } from '@/services/report.service';
import { ReportTable } from '@/components/reports/ReportTable';
import { Search, Plus, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const FILTER_TABS = [
  { label: 'Tất cả báo cáo', value: 'All' },
  { label: 'Tài chính', value: 'Financial' },
  { label: 'Mật độ phòng', value: 'Occupancy' },
  { label: 'Vận hành', value: 'Operational' }
];

export default function ReportsPage() {
  const [reports, setReports] = useState<RevenueReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    setReports(getMockReports());
  }, []);

  // Bộ lọc dữ liệu báo cáo đa điều kiện
  const filteredReports = reports.filter((item) => {
    const matchQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = activeFilter === 'All' || item.type === activeFilter;

    return matchQuery && matchType;
  });

  // Tính tổng thực thu tích lũy từ các báo cáo hiển thị (Không làm tròn số lẻ)
  const totalAccumulatedNet = filteredReports.reduce((sum, item) => sum + item.netIncome, 0);
  const totalRefunds = filteredReports.reduce((sum, item) => sum + item.refunds, 0);

  // Helper định dạng tiền tệ không làm tròn số lẻ (Giữ nguyên .00)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">
      
      {/* Header trang */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Trung tâm phân tích dữ liệu</span>
          <h1 className="text-3xl font-black tracking-tight text-current">Hồ Sơ Báo Cáo</h1>
        </div>
        
        <button className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Xuất báo cáo mới</span>
        </button>
      </div>

      {/* Quick Stats Banner (iOS Card Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doanh thu tích lũy */}
        <div className="p-5 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm transition-all">
          <p className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#34C759]" />
            Thực thu tích lũy (NET)
          </p>
          <h3 className="text-2xl font-black text-[#007AFF] mt-1.5 font-mono">
            {formatCurrency(totalAccumulatedNet)}
          </h3>
          <p className="text-[10px] text-[#8E8E93] mt-1">Đã tổng hợp từ các kỳ kết toán được chọn.</p>
        </div>

        {/* Tổng quỹ hoàn phí */}
        <div className="p-5 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm transition-all">
          <p className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-[#FF3B30]" />
            Hoản hủy lưu trú
          </p>
          <h3 className="text-2xl font-black text-[#FF3B30] mt-1.5 font-mono">
            {formatCurrency(totalRefunds)}
          </h3>
          <p className="text-[10px] text-[#8E8E93] mt-1">Các khoản phí hoàn cho khách hủy phòng đúng kỳ hạn.</p>
        </div>

        {/* Hệ số ổn định vận hành */}
        <div className="p-5 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm transition-all">
          <p className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#5856D6]" />
            Hệ số ổn định kế toán
          </p>
          <h3 className="text-2xl font-black text-current mt-1.5">99.93%</h3>
          <p className="text-[10px] text-[#8E8E93] mt-1">Hệ số chênh lệch kiểm toán lý tưởng của quý này.</p>
        </div>
      </div>

      {/* Bộ lọc tìm kiếm và phân loại */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
        {/* Tìm kiếm Spotlight */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8E8E93]" />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc mã báo cáo..." 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
              bg-[#E5E5EA] dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6] dark:focus:bg-[#2C2C2E]"
          />
        </div>

        {/* Segmented Control Lọc loại báo cáo */}
        <div className="flex items-center space-x-1 p-0.5 bg-[#E5E5EA] dark:bg-[#1C1C1E] rounded-full w-full lg:w-auto overflow-x-auto scrollbar-none transition-colors">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm font-semibold'
                    : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bảng báo cáo */}
      <ReportTable reports={filteredReports} formatCurrency={formatCurrency} />
    </div>
  );
}