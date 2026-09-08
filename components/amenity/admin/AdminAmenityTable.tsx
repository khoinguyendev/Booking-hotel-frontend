"use client";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Amenitie } from "@/types/amenitie";



interface AdminAmenityTableProps {
  amenities: Amenitie[];

  onView?: (amenity: Amenitie) => void;
  onEdit?: (amenity: Amenitie) => void;
  onDelete?: (amenity: Amenitie) => void;
  onRestore?: (amenity: Amenitie) => void;
}

export default function AdminAmenityTable({
  amenities,
  onView,
  onEdit,
  onDelete,
  onRestore,
}: AdminAmenityTableProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold">
            Danh sách tiện ích
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {amenities.length} tiện ích
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">
                Tiện ích
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
            {amenities.map((amenity) => (
              <tr
                key={amenity.id}
                className="border-b border-border last:border-0 hover:bg-muted/20"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    

                    <span className="font-medium">
                      {amenity.name}
                    </span>
                  </div>
                </td>

                {/* <td className="px-5 py-4">
                  <span className="text-sm font-medium">
                    {amenity.hotelCount.toLocaleString("vi-VN")}
                  </span>

                  <span className="ml-1 text-sm text-muted-foreground">
                    khách sạn
                  </span>
                </td> */}

                <td className="px-5 py-4">
                  {amenity.isDeleted ? (
                    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                      Đã xóa
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                      Đang hoạt động
                    </span>
                  )}
                </td>

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
                        onClick={() => onView?.(amenity)}
                      >
                        <Eye className="mr-2 size-4" />
                        Xem chi tiết
                      </DropdownMenuItem>

                      {!amenity.isDeleted && (
                        <>
                          <DropdownMenuItem
                            onClick={() => onEdit?.(amenity)}
                          >
                            <Pencil className="mr-2 size-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onDelete?.(amenity)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 size-4" />
                            Xóa tiện ích
                          </DropdownMenuItem>
                        </>
                      )}

                      {amenity.isDeleted && (
                        <DropdownMenuItem
                          onClick={() => onRestore?.(amenity)}
                        >
                          <RotateCcw className="mr-2 size-4" />
                          Khôi phục
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}

            {amenities.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-12 text-center"
                >
                  <p className="font-medium">
                    Không tìm thấy tiện ích
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