"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PositionResponse } from "@/services/position.service";

interface Props {
  positions: PositionResponse[];
  onAdd: () => void;
  onEdit: (position: PositionResponse) => void;
  onDelete?: (id: number) => void;
}

export default function PositionSection({
  positions,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Chức vụ</h2>

          <p className="text-sm text-muted-foreground">
            Quản lý các chức vụ trong khách sạn
          </p>
        </div>

        <Button onClick={onAdd}>
          <Plus size={18} />
          Thêm chức vụ
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Tên chức vụ</th>

              <th className="p-3">Mô tả</th>

              <th className="p-3">Trạng thái</th>

              <th className="p-3">Ngày tạo</th>

              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50">
                <td className="p-3 font-medium">{item.name}</td>

                <td className="p-3">{item.description || "-"}</td>

                <td className="p-3">
                  <Badge
                    variant={item.status ? "default" : "secondary"}
                  >
                    {item.status ? "Hoạt động" : "Tạm khóa"}
                  </Badge>
                </td>

                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </td>

                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onEdit(item)}
                    >
                      <Pencil size={16} />
                    </Button>

                    {onDelete && (
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {positions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-muted-foreground"
                >
                  Chưa có chức vụ nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}