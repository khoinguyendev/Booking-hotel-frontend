import React from 'react';

interface EventsProps {
  events: { id: string; title: string; time: string; location: string }[];
}

export const DashboardEvents = ({ events }: EventsProps) => (
  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-base font-bold text-gray-800">Sự kiện & Lịch họp hôm nay</h3>
      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Xem tất cả</button>
    </div>
    <div className="space-y-4">
      {events.map((ev) => (
        <div key={ev.id} className="p-3 bg-slate-50 rounded-lg border-l-4 border-indigo-500">
          <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{ev.title}</h4>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center">🕒 {ev.time}</span>
            <span className="flex items-center">📍 {ev.location}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);