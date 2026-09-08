"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminAmenityHeaderProps {
  onCreate?: () => void;
}

export default function AdminAmenityHeader({
  onCreate,
}: AdminAmenityHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Quản lý tiện ích
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Quản lý danh mục tiện ích dùng chung cho các khách sạn trong hệ
          thống.
        </p>
      </div>

      <Button onClick={onCreate} className="shrink-0">
        <Plus className="mr-2 size-4" />
        Thêm tiện ích
      </Button>
    </div>
  );
}