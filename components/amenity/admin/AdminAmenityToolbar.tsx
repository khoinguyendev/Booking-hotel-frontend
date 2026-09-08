"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminAmenityToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  onReset?: () => void;
}

export default function AdminAmenityToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
}: AdminAmenityToolbarProps) {
  const hasFilter = search || status !== "all";

  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm theo tên tiện ích..."
            className="pl-9"
          />
        </div>

        <Select
          value={status}
          onValueChange={(value)=>onStatusChange(value??"")}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Tất cả trạng thái
            </SelectItem>

            <SelectItem value="active">
              Đang hoạt động
            </SelectItem>

            <SelectItem value="deleted">
              Đã xóa
            </SelectItem>
          </SelectContent>
        </Select>

        {hasFilter && (
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="shrink-0"
          >
            <X className="mr-2 size-4" />
            Xóa lọc
          </Button>
        )}
      </div>
    </div>
  );
}