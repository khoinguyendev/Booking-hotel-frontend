"use client";

import {
  CheckCircle2,
  ListChecks,
  Trash2,
} from "lucide-react";

interface AdminAmenityStatsProps {
  total: number;
  active: number;
  deleted: number;
}

const stats = [
  {
    key: "total",
    label: "Tổng tiện ích",
    icon: ListChecks,
  },
  {
    key: "active",
    label: "Đang hoạt động",
    icon: CheckCircle2,
  },
  {
    key: "deleted",
    label: "Đã xóa",
    icon: Trash2,
  },
] as const;

export default function AdminAmenityStats({
  total,
  active,
  deleted,
}: AdminAmenityStatsProps) {
  const values = {
    total,
    active,
    deleted,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-sm border border-border bg-card p-5"
        >
          <div className="flex size-11 items-center justify-center rounded-sm bg-muted">
            <Icon className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            {label}
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight">
            {values[key].toLocaleString("vi-VN")}
          </p>
        </div>
      ))}
    </div>
  );
}