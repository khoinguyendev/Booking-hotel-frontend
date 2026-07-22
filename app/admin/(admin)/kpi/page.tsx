// KPI & Hiệu suất// app/admin/kpi/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getMockKpis, KpiRecord } from '@/services/kpi.service';
import { KpiCard } from '@/components/kpi/KpiCard';
import { Search, Plus, BarChart3 } from 'lucide-react';
import AddBrandModal from '@/components/kpi/AddBrandModal';

const KPI_FILTERS = [
  { label: 'Tất cả mục tiêu', value: 'All' },
  { label: 'Vượt chỉ tiêu', value: 'Exceeded' },
  { label: 'Đúng tiến độ', value: 'OnTrack' },
  { label: 'Cần chú ý', value: 'Behind' }
];

export default function KpiPage() {
  const [kpis, setKpis] = useState<KpiRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [openAddBrand, setOpenAddBrand] = useState(false);

  useEffect(() => {
    setKpis(getMockKpis());
  }, []);

  // Lọc đa điều kiện
  const filteredKpis = kpis.filter((item) => {
    const matchQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kpiName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = activeFilter === 'All' || item.status === activeFilter;

    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">

      {/* Header trang */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Hiệu suất khách sạn</span>
          <h1 className="text-3xl font-black tracking-tight text-current">KPI & Hiệu Suất</h1>
        </div>
        <button
          onClick={() => setOpenAddBrand(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Thêm Brand</span>
        </button>
        <button className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Giao chỉ tiêu mới</span>
        </button>
      </div>
      <AddBrandModal
        open={openAddBrand}
        onClose={() => setOpenAddBrand(false)}
        onSuccess={() => {
          // fetchBrand()
        }}
      />
      {/* Thanh công cụ lọc */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
        {/* Tìm kiếm Spotlight */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8E8E93]" />
          <input
            type="text"
            placeholder="Tìm theo nhân viên, phòng ban, KPI..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
              bg-[#E5E5EA] dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6] dark:focus:bg-[#2C2C2E]"
          />
        </div>

        {/* Segmented Control Lọc trạng thái KPI */}
        <div className="flex items-center space-x-1 p-0.5 bg-[#E5E5EA] dark:bg-[#1C1C1E] rounded-full w-full lg:w-auto overflow-x-auto scrollbar-none transition-colors">
          {KPI_FILTERS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 ${isActive
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

      {/* Danh sách KPI Grid */}
      {filteredKpis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredKpis.map((item) => (
            <KpiCard key={item.id} kpi={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] text-center">
          <BarChart3 className="w-10 h-10 text-[#8E8E93] mb-3 stroke-[1.5]" />
          <h3 className="text-sm font-semibold text-[#1C1C1E] dark:text-white">Chưa có chỉ số phù hợp</h3>
          <p className="text-xs text-[#8E8E93] mt-1">Không tìm thấy bản ghi chỉ tiêu hiệu suất nào phù hợp với bộ lọc hiện tại.</p>
        </div>
      )}
    </div>
  );
}