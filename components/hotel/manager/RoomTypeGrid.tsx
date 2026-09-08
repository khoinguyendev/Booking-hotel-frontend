// components/hotel-console/RoomTypeGrid.tsx
'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { RoomStatus, RoomType } from '@/services/hotel-console.service';

export const RoomTypeGrid = ({ roomTypes }: { roomTypes: RoomType[] }) => {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-6 shadow-sm">
      <div className="flex justify-between items-center border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#007AFF]" />
          Sơ đồ phân loại phòng ({roomTypes.length})
        </h2>
      </div>

      <div className="space-y-6">
        {roomTypes.map((type) => (
          <div key={type.id} className="border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl p-4 space-y-4 bg-[#F2F2F7]/40 dark:bg-[#000000]/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-current">{type.name}</h3>
                <p className="text-xs text-[#8E8E93] mt-0.5">{type.bedType} • Diện tích: <span className="font-mono">{type.roomSize.toFixed(2)} m²</span></p>
              </div>
              <span className="text-xs bg-[#007AFF]/10 text-[#007AFF] px-2.5 py-1 rounded-full font-bold">
                Tối đa {type.maxGuest} khách
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {type.rooms.map((room) => (
                <div 
                  key={room.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                    room.status === RoomStatus.Available 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                      : room.status === RoomStatus.Occupied
                      ? 'bg-[#007AFF]/10 border-[#007AFF]/20 text-[#007AFF]'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                  }`}
                >
                  <span className="font-mono font-bold text-xs">Tầng {room.floor}</span>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-sm text-current">{room.roomNumber}</span>
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};