"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

const schema = z.object({
  shiftId: z.number().min(0 , "Chọn ca làm"),

  workDate: z.string().min(1, "Chọn ngày làm việc"),
});

export type SummaryValues = z.infer<typeof schema>;

interface ShiftOption {
  id: number;
  name: string;
  startTime?: string;
  endTime?: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  shifts: ShiftOption[];

  defaultValues?: SummaryValues;

  onSubmit: (values: SummaryValues) => Promise<void>;
}

export default function SummaryDialog({
  open,
  onOpenChange,
  shifts,
  defaultValues,
  onSubmit,
}: Props) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      shiftId: 0,
      workDate: "",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        shiftId: 0,
        workDate: "",
      });
    }
  }, [open, defaultValues, form]);

  const handleSubmit = async (
    values: SummaryValues
  ) => {
    try {
      setLoading(true);

      await onSubmit(values);

      onOpenChange(false);
    } catch (e: any) {
      toast.error(
        e.response?.data?.message ??
          "Có lỗi xảy ra"
      );
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
          <DialogTitle>
            Chọn ca làm việc
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              handleSubmit
            )}
            className="space-y-6"
          >
            {/* Ca làm */}
            <FormField
              control={form.control}
              name="shiftId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ca làm việc
                  </FormLabel>

                  <Select
                    value={
                      field.value
                        ? String(field.value)
                        : ""
                    }
                    onValueChange={(value) =>
                      field.onChange(
                        Number(value)
                      )
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                       <span>
              {field.value === 0
                ? "Tất cả"
                : (shifts.find((item) => item.id === field.value)?.name ??
                  "Tất cả")}
            </span>
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                       <SelectItem
                          key={0}
                          value={String(
                            0
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>
                              Tất cả
                            </span>

                           
                          </div>
                        </SelectItem>
                      {shifts.map((shift) => (
                        <SelectItem
                          key={shift.id}
                          value={String(
                            shift.id
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>
                              {shift.name}
                            </span>

                            {shift.startTime &&
                              shift.endTime && (
                                <span className="text-muted-foreground">
                                  ({shift.startTime} -{" "}
                                  {shift.endTime})
                                </span>
                              )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ngày */}
            <FormField
              control={form.control}
              name="workDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ngày làm việc
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
              Chọn ca và ngày làm việc để xem
              thông tin tổng hợp của lịch làm
              việc.
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Hủy
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                Xem tổng hợp
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

      {loading && (
        <Loading fullScreen />
      )}
    </Dialog>
  );
}