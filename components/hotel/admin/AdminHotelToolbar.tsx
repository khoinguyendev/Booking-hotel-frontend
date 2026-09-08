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

interface AdminHotelToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  brand: string;
  onBrandChange: (value: string) => void;

  brands: {
    id: number;
    name: string;
  }[];

  onReset?: () => void;
}

export default function AdminHotelToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  brand,
  onBrandChange,
  brands,
  onReset,
}: AdminHotelToolbarProps) {
  const hasFilter = search || status !== "all" || brand !== "all";

  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm theo tên khách sạn, địa chỉ..."
            className="pl-9"
          />
        </div>

        {/* Status */}
        <Select value={status} onValueChange={(value)=>onStatusChange(value??"")}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="maintenance">Đang bảo trì</SelectItem>
            <SelectItem value="inactive">Tạm ngưng</SelectItem>
          </SelectContent>
        </Select>

        {/* Brand */}
        <Select value={brand} onValueChange={(value)=>onBrandChange(value??"")}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Thương hiệu" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Tất cả thương hiệu</SelectItem>

            {brands.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset */}
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