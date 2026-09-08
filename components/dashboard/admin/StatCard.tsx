// components/dashboard/StatCard.tsx
import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';

interface StatCardProps {
  title: string;
  value: number; // Chuyển thành kiểu số để xử lý animation
  icon: React.ReactNode;
  description: string;
  isPercent?: boolean;
}

export const StatCard = ({ title, value, icon, description, isPercent = false }: StatCardProps) => (
  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-between 
                  animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-2 flex items-center">
        <AnimatedNumber value={value} isDecimal={isPercent} />
        {isPercent && <span className="text-2xl font-semibold text-gray-700 ml-0.5">%</span>}
      </h3>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">{icon}</div>
  </div>
);