"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PositionSalaryPolicyResponse } from "@/types/positionSalaryPolicy";


interface Props {
  policies: PositionSalaryPolicyResponse[];

  onAdd: () => void;

  onEdit: (policy: PositionSalaryPolicyResponse) => void;

  onDelete: (id: number) => void;
}

export default function PositionSalaryPolicySection({
  policies,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="rounded-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Chính sách lương theo chức vụ
          </h2>

          <p className="text-sm text-muted-foreground">
            Cấu hình mức lương theo từng chức vụ và ca làm việc
          </p>
        </div>

        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm chính sách
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left">Chức vụ</th>

              <th className="px-4 py-3 text-left">Ca làm</th>

              <th className="px-4 py-3 text-right">
                Lương / giờ
              </th>

              <th className="px-4 py-3 text-center">
                Hệ số ca
              </th>

            

              <th className="px-4 py-3 text-center">
                Hiệu lực
              </th>

              <th className="px-4 py-3 text-right">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {policies.length === 0 && (
              <tr>
                <td
                  className="py-10 text-center text-muted-foreground"
                  colSpan={7}
                >
                  Chưa có chính sách lương
                </td>
              </tr>
            )}

            {policies.map((item) => (
              <tr
                key={item.id}
                className="border-b transition hover:bg-muted/40"
              >
                <td className="px-4 py-4 font-medium">
                  {item.positionName}
                </td>

                <td className="px-4 py-4">
                  <Badge variant="secondary">
                    {item.shiftName}
                  </Badge>
                </td>

                <td className="px-4 py-4 text-right font-medium">
                  {item.hourlyRate.toLocaleString("vi-VN")} đ
                </td>

                <td className="px-4 py-4 text-center">
                  x{item.shiftMultiplier}
                </td>


                <td className="px-4 py-4 text-center">
                  <div className="space-y-1 text-xs">
                    <div>
                      {item.effectiveFrom}
                    </div>

                    <div className="text-muted-foreground">
                      {item.effectiveTo ?? "Không giới hạn"}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}