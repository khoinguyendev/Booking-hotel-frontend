"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/common/Spinner";
import toast from "react-hot-toast";
import { error } from "console";

const schema = z.object({
  shiftId: z.string().min(1),

  fromDate: z.string().min(1),

  toDate: z.string().min(1),
});

export type BatchShiftValues = z.infer<typeof schema>;

interface Shift {
  id: number;
  name: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  employeeCount: number;

  shifts: Shift[];

  onSubmit: (values: BatchShiftValues) => void;
}

export default function BatchAssignDialog({
  open,
  onOpenChange,
  employeeCount,
  shifts,
  onSubmit,
}: Props) {
  const form = useForm<BatchShiftValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      shiftId: "",

      fromDate: "",

      toDate: "",
    },
  });

  useEffect(() => {
    if (open) form.reset();
  }, [open]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: BatchShiftValues) => {
    try {
      setLoading(true);
      await onSubmit(values);

      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Phân ca hàng loạt</DialogTitle>
        </DialogHeader>

        <div className="rounded-xl border p-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Số nhân viên</span>

            <span className="font-semibold">{employeeCount}</span>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="shiftId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ca làm</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ca" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {shifts.map((shift) => (
                        <SelectItem key={shift.id} value={String(shift.id)}>
                          {shift.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Từ ngày</FormLabel>

                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đến ngày</FormLabel>

                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>

              <Button disabled={loading} type="submit">
                Phân ca
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      {loading && <Loading fullScreen={true} />}
    </Dialog>
  );
}
