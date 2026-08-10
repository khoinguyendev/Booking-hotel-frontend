"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { AttendancePolicyResponse } from "@/services/attendancePolicy.service";

interface Props {
  attendancePolicies: AttendancePolicyResponse[];
  onAdd: () => void;
  onEdit: (item: AttendancePolicyResponse) => void;
  onDelete?: (id: number) => void;
}

export default function AttendancePolicySection({
  attendancePolicies,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Chính sách chấm công</h2>

          <p className="text-sm text-muted-foreground">
            Quản lý quy định đi trễ, về sớm và mức xử phạt
          </p>
        </div>

        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm chính sách
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Đi trễ</th>

              <th className="p-3">Về sớm</th>

              <th className="p-3">Phạt đi trễ</th>

              <th className="p-3">Phạt về sớm</th>

              <th className="p-3">Phạt vắng</th>

              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {attendancePolicies.map((item) => (
              <tr
                key={item.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-3">
                  {item.lateToleranceMinutes} phút
                </td>

                <td className="p-3">
                  {item.earlyLeaveToleranceMinutes} phút
                </td>

                <td className="p-3">
                  {item.latePenaltyPerMinute.toLocaleString("vi-VN")} đ/phút
                </td>

                <td className="p-3">
                  {item.earlyLeavePenaltyPerMinute.toLocaleString("vi-VN")} đ/phút
                </td>

                <td className="p-3">
                  {item.absencePenaltyPercent}%
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

            {attendancePolicies.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-muted-foreground"
                >
                  Chưa có chính sách chấm công nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}