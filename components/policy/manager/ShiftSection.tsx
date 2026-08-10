"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ShiftResponse } from "@/services/shift.service";

interface Props {
  shifts: ShiftResponse[];
  onAdd: () => void;
  onEdit: (shift: ShiftResponse) => void;
  onDelete?: (id: number) => void;
}

export default function ShiftSection({
  shifts,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Ca làm việc</h2>

          <p className="text-sm text-muted-foreground">
            Quản lý các ca làm việc trong khách sạn
          </p>
        </div>

        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm ca
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Tên ca</th>

              <th className="p-3">Bắt đầu</th>

              <th className="p-3">Kết thúc</th>

              <th className="p-3">Nghỉ</th>

              <th className="p-3">Trạng thái</th>

              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {shifts.map((item) => (
              <tr
                key={item.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-3 font-medium">{item.name}</td>

                <td className="p-3">{item.startTime}</td>

                <td className="p-3">{item.endTime}</td>

                <td className="p-3">{item.breakMinutes} phút</td>

                <td className="p-3">
                  <Badge
                    variant={item.status ? "default" : "secondary"}
                  >
                    {item.status ? "Hoạt động" : "Tạm khóa"}
                  </Badge>
                </td>

                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {onDelete && (
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {shifts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-muted-foreground"
                >
                  Chưa có ca làm việc nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}