"use client";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHotelTableItem {
  id: number;
  name: string;
  brand: string;
  star: number;
  address: string;
  image?: string | null;
  roomCount: number;
  staffCount: number;
  status: "active" | "maintenance" | "inactive";
}

interface AdminHotelTableProps {
  hotels: AdminHotelTableItem[];

  onView?: (hotel: AdminHotelTableItem) => void;
  onEdit?: (hotel: AdminHotelTableItem) => void;
  onDelete?: (hotel: AdminHotelTableItem) => void;
}

const statusConfig = {
  active: {
    label: "Đang hoạt động",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  maintenance: {
    label: "Đang bảo trì",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  inactive: {
    label: "Tạm ngưng",
    className:
      "bg-muted text-muted-foreground",
  },
};

function renderStars(star: number) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={
            index < star
              ? "text-amber-500"
              : "text-muted-foreground/30"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AdminHotelTable({
  hotels,
  onView,
  onEdit,
  onDelete,
}: AdminHotelTableProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold">Danh sách khách sạn</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {hotels.length} khách sạn
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Khách sạn
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Thương hiệu
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Hạng
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Phòng
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Nhân viên
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Trạng thái
              </th>

              <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {hotels.map((hotel) => {
              const status = statusConfig[hotel.status];

              return (
                <tr
                  key={hotel.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20"
                >
                  {/* Hotel */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-12 shrink-0 overflow-hidden rounded-sm bg-muted">
                        {hotel.image ? (
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium">{hotel.name}</p>

                        <p className="mt-1 max-w-[260px] truncate text-xs text-muted-foreground">
                          {hotel.address}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Brand */}
                  <td className="px-5 py-4">
                    <span className="text-sm">{hotel.brand}</span>
                  </td>

                  {/* Star */}
                  <td className="px-5 py-4">
                    {renderStars(hotel.star)}
                  </td>

                  {/* Rooms */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium">
                      {hotel.roomCount.toLocaleString("vi-VN")}
                    </span>
                  </td>

                  {/* Staff */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium">
                      {hotel.staffCount.toLocaleString("vi-VN")}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                      {status.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <DropdownMenu>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onView?.(hotel)}
                        >
                          <Eye className="mr-2 size-4" />
                          Xem chi tiết
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => onEdit?.(hotel)}
                        >
                          <Pencil className="mr-2 size-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => onDelete?.(hotel)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          Xóa khách sạn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}

            {/* Empty */}
            {hotels.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center"
                >
                  <p className="font-medium">
                    Không tìm thấy khách sạn
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Thử thay đổi từ khóa hoặc bộ lọc.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}