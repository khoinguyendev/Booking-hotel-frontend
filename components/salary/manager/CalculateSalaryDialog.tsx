'use client';

import { useState } from 'react';

import {
  Calculator,
  Loader2,
  TriangleAlert,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  month: number;

  year: number;

  totalEmployees: number;

  onCalculate?: () => Promise<void> | void;
}

export default function CalculateSalaryDialog({
  open,
  onOpenChange,
  month,
  year,
  totalEmployees,
  onCalculate,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const handleCalculate =
    async () => {
      try {
        setLoading(true);

        await onCalculate?.();

        onOpenChange(false);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">

            <Calculator size={28} />

          </div>

          <DialogTitle className="text-center">
            Tính lương nhân viên
          </DialogTitle>

          <DialogDescription className="text-center">
            Hệ thống sẽ tính lương dựa trên
            ngày công, ca làm, OT và các khoản
            phụ cấp.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-4">

          <div className="rounded-xl border bg-muted/40 p-4">

            <div className="flex justify-between">

              <span>Kỳ lương</span>

              <strong>
                {month}/{year}
              </strong>

            </div>

            <div className="mt-3 flex justify-between">

              <span>Nhân viên</span>

              <strong>
                {totalEmployees}
              </strong>

            </div>

          </div>

          <div className="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">

            <TriangleAlert
              size={18}
              className="mt-0.5 text-yellow-600"
            />

            <p className="text-sm text-muted-foreground">
              Sau khi tính lương, bạn vẫn có
              thể chỉnh sửa phụ cấp, thưởng và
              khấu trừ trước khi thanh toán.
            </p>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            Hủy
          </Button>

          <Button
            onClick={handleCalculate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tính...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Tính lương
              </>
            )}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}