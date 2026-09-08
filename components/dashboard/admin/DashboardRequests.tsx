import React from 'react';

interface RequestsProps {
  requests: { id: string; staffName: string; type: string; duration: string; reason: string }[];
}

export const DashboardRequests = ({ requests }: RequestsProps) => (
  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-base font-bold text-gray-800">Đơn từ chờ phê duyệt</h3>
      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Xử lý hàng loạt</button>
    </div>
    <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
      {requests.map((req) => (
        <div key={req.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800">{req.staffName}</p>
            <p className="text-xs text-gray-600">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium mr-1">{req.type}</span>
              {req.duration}
            </p>
            <p className="text-xs text-gray-400 italic">Lý do: {req.reason}</p>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 px-2 text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded font-medium">Duyệt</button>
            <button className="p-1 px-2 text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 rounded font-medium">Từ chối</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);