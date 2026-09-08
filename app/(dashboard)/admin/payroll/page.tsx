// Lương thưởng// app/admin/payroll/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getMockPayrolls, PayrollRecord } from '@/services/payroll.service';
import { PayrollTable } from '@/components/payroll/PayrollTable';
import { Search, Plus, DollarSign, Users, Award, ShieldAlert } from 'lucide-react';

const PAY_FILTERS = [
  { label: 'Tất cả trạng thái', value: 'All' },
  { label: 'Đã chi trả', value: 'Paid' },
  { label: 'Đang xử lý', value: 'Processing' },
  { label: 'Đang tạm giữ', value: 'OnHold' }
];

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    setPayrolls(getMockPayrolls());
  }, []);

  // Bộ lọc dữ liệu đa điều kiện
  const filteredPayrolls = payrolls.filter((item) => {
    const matchQuery = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = activeFilter === 'All' || item.paymentStatus === activeFilter;

    return matchQuery && matchStatus;
  });

  // Tính tổng chi phí quỹ lương tháng thực tế
  const totalNetOutflow = filteredPayrolls.reduce((sum, item) => sum + item.netSalary, 0);
  const totalBonusOutflow = filteredPayrolls.reduce((sum, item) => sum + item.bonus, 0);

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
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Phân hệ tài chính</span>
          <h1 className="text-3xl font-black tracking-tight text-current">Lương & Thưởng</h1>
        </div>
        
        <button className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Tạo bảng lương tháng</span>
        </button>
      </div>

      {/* Thẻ Thống Kê Nhanh (iOS Card Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tổng quỹ lương */}
        <div className="p-5 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm">
          <p className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Tổng thực lĩnh (NET)</p>
          <h3 className="text-2xl font-black text-[#007AFF] mt-1.5 font-mono">{formatCurrency(totalNetOutflow)}</h3>
          <p className="text-[10px] text-[#8E8E93] mt-1">Đã tính khấu trừ bảo hiểm bắt buộc và thuế.</p>
        </div>

        {/* Tổng quỹ thưởng */}
        <div className="p-5 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm">
          <p className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Ngân sách Thưởng KPI</p>
          <h3 className="text-2xl font-black text-[#34C759] mt-1.5 font-mono">{formatCurrency(totalBonusOutflow)}</h3>
          <p className="text-[10px] text-[#8E8E93] mt-1">Dựa trên kết quả đánh giá năng lực cuối tháng.</p>
        </div>

        {/* Tổng số nhân sự nhận lương */}
        <div className="p-5 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm">
          <p className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Nhân sự nhận lương</p>
          <h3 className="text-2xl font-black text-current mt-1.5">{filteredPayrolls.length} Nhân viên</h3>
          <p className="text-[10px] text-[#8E8E93] mt-1">Không tính nhân sự đang tạm hoãn/đình chỉ công tác.</p>
        </div>
      </div>

      {/* Thanh công cụ tìm kiếm và lọc phân loại */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
        {/* Tìm kiếm Spotlight */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8E8E93]" />
          <input 
            type="text" 
            placeholder="Tìm theo tên, bộ phận hoặc mã NV..." 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
              bg-[#E5E5EA] dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6] dark:focus:bg-[#2C2C2E]"
          />
        </div>

        {/* Segmented Control Lọc trạng thái chi trả */}
        <div className="flex items-center space-x-1 p-0.5 bg-[#E5E5EA] dark:bg-[#1C1C1E] rounded-full w-full lg:w-auto overflow-x-auto scrollbar-none transition-colors">
          {PAY_FILTERS.map((tab) => {
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

      {/* Bảng lương */}
      <PayrollTable payrolls={filteredPayrolls} formatCurrency={formatCurrency} />
    </div>
  );
}