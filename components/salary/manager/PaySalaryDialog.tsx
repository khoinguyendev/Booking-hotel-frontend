'use client';

import { useState } from 'react';

import {
  CheckCircle2,
  CreditCard,
  Landmark,
  Loader2,
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

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  employeeCount: number;

  totalAmount: number;

  onSubmit?: (data: {
    paymentDate: string;
    paymentMethod: string;
    note: string;
  }) => Promise<void> | void;
}

const formatCurrency = (value: number) =>
  value.toLocaleString('vi-VN') + ' ₫';

export default function PaySalaryDialog({
  open,
  onOpenChange,
  employeeCount,
  totalAmount,
  onSubmit,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [paymentDate, setPaymentDate] =
    useState(
      new Date()
        .toISOString()
        .split('T')[0]
    );

  const [paymentMethod, setPaymentMethod] =
    useState('bank');

  const [note, setNote] =
    useState('');

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await onSubmit?.({
          paymentDate,
          paymentMethod,
          note,
        });

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
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">

            <CheckCircle2 size={30} />

          </div>

          <DialogTitle className="text-center">
            Thanh toán lương
          </DialogTitle>

          <DialogDescription className="text-center">
            Xác nhận thanh toán bảng
            lương cho nhân viên.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          {/* Summary */}

          <div className="rounded-2xl border bg-muted/40 p-4">

            <div className="flex items-center justify-between">

              <span>Số nhân viên</span>

              <strong>
                {employeeCount}
              </strong>

            </div>

            <div className="mt-3 flex items-center justify-between">

              <span>Tổng tiền</span>

              <strong className="text-lg text-green-600">
                {formatCurrency(
                  totalAmount
                )}
              </strong>

            </div>

          </div>

          {/* Payment date */}

          <div>

            <Label>
              Ngày thanh toán
            </Label>

            <Input
              type="date"
              value={paymentDate}
              onChange={(e) =>
                setPaymentDate(
                  e.target.value
                )
              }
            />

          </div>

          {/* Payment method */}

          <div>

            <Label>
              Phương thức
            </Label>

            <Select
              value={paymentMethod}
              onValueChange={()=>
                setPaymentMethod
              }
            >
              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="bank">

                  <div className="flex items-center gap-2">

                    <Landmark className="h-4 w-4" />

                    Chuyển khoản

                  </div>

                </SelectItem>

                <SelectItem value="cash">

                  <div className="flex items-center gap-2">

                    <CreditCard className="h-4 w-4" />

                    Tiền mặt

                  </div>

                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          {/* Note */}

          <div>

            <Label>
              Ghi chú
            </Label>

            <Textarea
              rows={4}
              placeholder="Nhập ghi chú..."
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            disabled={loading}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Hủy
          </Button>

          <Button
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Xác nhận thanh toán
              </>
            )}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}