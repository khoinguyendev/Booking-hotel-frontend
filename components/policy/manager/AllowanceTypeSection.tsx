"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { AllowanceTypeResponse } from "@/services/allowanceType.service";

interface Props {
  allowanceTypes: AllowanceTypeResponse[];
  onAdd: () => void;
  onEdit: (item: AllowanceTypeResponse) => void;
  onDelete?: (id: number) => void;
}

export default function AllowanceTypeSection({
  allowanceTypes,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Loại phụ cấp</h2>

          <p className="text-sm text-muted-foreground">
            Quản lý các loại phụ cấp trong khách sạn
          </p>
        </div>

        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm loại phụ cấp
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Tên loại phụ cấp</th>

              <th className="p-3">Mô tả</th>

              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {allowanceTypes.map((item) => (
              <tr
                key={item.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-3 font-medium">{item.name}</td>

                <td className="p-3">{item.description || "-"}</td>

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

            {allowanceTypes.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="p-8 text-center text-muted-foreground"
                >
                  Chưa có loại phụ cấp nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}