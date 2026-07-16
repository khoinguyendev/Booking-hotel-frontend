// components/dashboard/DashboardCharts.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface ChartProps {
  attendanceData: { date: string; checkedIn: number; late: number; absent: number }[];
  staffAllocation: { department: string; count: number }[];
}

export const DashboardCharts = ({ attendanceData, staffAllocation }: ChartProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Kích hoạt animation ngay sau khi component được mount vào DOM
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Khối biểu đồ chấm công tuần */}
      <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm 
                      animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out delay-100">
        <h3 className="text-base font-bold text-gray-800 mb-4">Tình hình đi làm 5 ngày gần nhất</h3>
        <div className="flex items-end h-48 space-x-4 pt-4 border-b border-gray-100">
          {attendanceData.map((d, idx) => {
            const total = d.checkedIn + d.late + d.absent;
            // Chiều cao thực tế khi đã load xong
            const targetHeight = (d.checkedIn / total) * 100;
            
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                <div 
                  className="w-full bg-indigo-505 bg-indigo-600 rounded-t-sm transition-all duration-1000 ease-out" 
                  style={{ height: isLoaded ? `${targetHeight}%` : '0%' }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{d.date}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-xs">
          <span className="flex items-center">
            <span className="w-3 h-3 bg-indigo-600 mr-1 rounded-sm"></span> Đúng giờ & Trễ
          </span>
        </div>
      </div>

      {/* Khối phân bổ nhân sự theo phòng ban */}
      <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm
                      animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out delay-200">
        <h3 className="text-base font-bold text-gray-800 mb-4">Phân bổ nhân sự các bộ phận</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
          {staffAllocation.map((dept, idx) => {
            // Độ rộng thực tế khi load xong (dựa trên tổng số 120 nhân sự)
            const targetWidth = (dept.count / 120) * 100;

            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{dept.department}</span>
                  <span className="font-semibold">{dept.count} nhân sự</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: isLoaded ? `${targetWidth}%` : '0%' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};