'use client';

import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';

import { SalaryItem } from '@/types/salary';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  salary?: SalaryItem;

  onSave?: (data: {
    allowance: number;
    bonus: number;
    deduction: number;
    note: string;
  }) => void;
}

export default function EditSalaryDialog({
  open,
  onOpenChange,
  salary,
  onSave,
}: Props) {
  const [allowance, setAllowance] = useState(0);

  const [bonus, setBonus] = useState(0);

  const [deduction, setDeduction] = useState(0);

  const [note, setNote] = useState('');

  useEffect(() => {
    if (!salary) return;

    setAllowance(salary.allowance);

    setBonus(salary.bonus);

    setDeduction(salary.deduction);

    setNote((salary as any).note ?? '');
  }, [salary]);

  const handleSave = () => {
    onSave?.({
      allowance,
      bonus,
      deduction,
      note,
    });

    onOpenChange(false);
  };

  if (!salary) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            Chỉnh sửa bảng lương
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          {/* Employee */}

          <div className="rounded-xl border bg-muted/40 p-4">

            <div className="font-semibold">
              {salary.employeeName}
            </div>

            <div className="text-sm text-muted-foreground">
              {salary.employeeCode}
            </div>

          </div>

          {/* Read only */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <Label>Ngày công</Label>

              <Input
                value={salary.workingDays}
                disabled
              />

            </div>

            <div>

              <Label>OT</Label>

              <Input
                value={`${salary.overtimeHours} giờ`}
                disabled
              />

            </div>

          </div>

          {/* Allowance */}

          <div>

            <Label>Phụ cấp</Label>

            <Input
              type="number"
              value={allowance}
              onChange={(e) =>
                setAllowance(
                  Number(e.target.value)
                )
              }
            />

          </div>

          {/* Bonus */}

          <div>

            <Label>Thưởng</Label>

            <Input
              type="number"
              value={bonus}
              onChange={(e) =>
                setBonus(
                  Number(e.target.value)
                )
              }
            />

          </div>

          {/* Deduction */}

          <div>

            <Label>Khấu trừ</Label>

            <Input
              type="number"
              value={deduction}
              onChange={(e) =>
                setDeduction(
                  Number(e.target.value)
                )
              }
            />

          </div>

          {/* Note */}

          <div>

            <Label>Ghi chú</Label>

            <Textarea
              rows={4}
              placeholder="Nhập ghi chú..."
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Hủy
          </Button>

          <Button onClick={handleSave}>
            Lưu thay đổi
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}