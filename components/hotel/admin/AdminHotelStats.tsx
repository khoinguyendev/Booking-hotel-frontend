"use client";

import {
  Building2,
  CheckCircle2,
  Hotel,
  Wrench,
} from "lucide-react";

interface AdminHotelStatsProps {
  totalHotels: number;
  activeHotels: number;
  maintenanceHotels: number;
  totalRooms: number;
}

const stats = [
  {
    key: "totalHotels",
    label: "Tổng khách sạn",
    icon: Building2,
  },
  {
    key: "activeHotels",
    label: "Đang hoạt động",
    icon: CheckCircle2,
  },
  {
    key: "maintenanceHotels",
    label: "Đang bảo trì",
    icon: Wrench,
  },
  {
    key: "totalRooms",
    label: "Tổng số phòng",
    icon: Hotel,
  },
] as const;

export default function AdminHotelStats({
  totalHotels,
  activeHotels,
  maintenanceHotels,
  totalRooms,
}: AdminHotelStatsProps) {
  const values = {
    totalHotels,
    activeHotels,
    maintenanceHotels,
    totalRooms,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-sm border border-border bg-card p-5"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-11 items-center justify-center rounded-sm bg-muted">
              <Icon className="size-5 text-muted-foreground" />
            </div>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">{label}</p>

          <p className="mt-1 text-2xl font-bold tracking-tight">
            {values[key].toLocaleString("vi-VN")}
          </p>
        </div>
      ))}
    </div>
  );
}