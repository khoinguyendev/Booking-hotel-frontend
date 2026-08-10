"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OVERTIME_TYPE_LABEL, OvertimePolicyResponse, OvertimeType } from "@/services/overtimePolicy.service";





interface Props {
  policies: OvertimePolicyResponse[];

  onAdd: () => void;

  onEdit: (policy: OvertimePolicyResponse) => void;

  onDelete?: (id: number) => void;
}

export default function OvertimePolicySection({
  policies,
  onAdd,
  onEdit,
  onDelete,
}: Props) {

  return (
    <Card className="rounded-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Chính sách tăng ca</h2>

          <p className="text-sm text-muted-foreground">
            Cấu hình hệ số và phụ cấp làm thêm
          </p>
        </div>

        <Button onClick={onAdd}>
          <Plus size={18} />
          Thêm chính sách
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Loại ngày</th>

              <th className="p-3">Hệ số</th>

              <th className="p-3">Phụ cấp</th>

              <th className="p-3">Áp dụng từ</th>

              <th className="p-3">Đến ngày</th>

              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {policies.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50">
                <td className="p-3 font-medium">{OVERTIME_TYPE_LABEL[item.type]}</td>

                <td className="p-3">x{item.multiplier}</td>

                <td className="p-3">
                  {item.allowance.toLocaleString("vi-VN")} đ
                </td>

                <td className="p-3">{item.effectiveFrom}</td>

                <td className="p-3">{item.effectiveTo ?? "-"}</td>

                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onEdit(item)}
                    >
                      <Pencil size={16} />
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
