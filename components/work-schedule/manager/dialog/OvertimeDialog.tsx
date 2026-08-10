"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Loading from "@/components/common/Spinner";

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
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OVERTIME_TYPE_LABEL,
  OvertimePolicyResponse,
} from "@/services/overtimePolicy.service";
import { ScheduleItem } from "@/types/workSchedule";
import { parse } from "date-fns";

const createSchema = (scheduleEndTime: string) =>
  z
    .object({
      policyId: z.number().min(1, "Chọn chính sách"),

      startTime: z.string().min(1, "Chọn giờ bắt đầu"),

      endTime: z.string().min(1, "Chọn giờ kết thúc"),

      note: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const toMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };

      const scheduleEnd = toMinutes(scheduleEndTime);
      const start = toMinutes(data.startTime);
      const end = toMinutes(data.endTime);

      if (start < scheduleEnd) {
        ctx.addIssue({
          code: "custom",
          path: ["startTime"],
          message: "Giờ bắt đầu phải sau giờ kết thúc ca làm",
        });
      }

      if (end - start < 60) {
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "Thời gian tăng ca tối thiểu là 1 giờ",
        });
      }
      console.log({
        scheduleEndTime,
        startTime: start,
        endTime: end,
      });
    });

type OvertimeSchema = ReturnType<typeof createSchema>;

export type OvertimeFormValues = z.infer<OvertimeSchema>;
interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
  schedule?: ScheduleItem | null;
  policies: OvertimePolicyResponse[];

  defaultValues?: OvertimeFormValues;

  onSubmit: (values: OvertimeFormValues) => Promise<void>;
}

export default function OvertimeDialog({
  open,
  onOpenChange,
  policies,
  defaultValues,
  schedule,
  onSubmit,
}: Props) {
  const schema = useMemo(
    () => createSchema(schedule?.endTime ?? "00:00"),
    [schedule?.endTime],
  );
  const form = useForm<OvertimeFormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      policyId: 0,
      startTime: "",
      endTime: "",
      note: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (schedule?.overtime) {
      form.reset({
        endTime:schedule.overtime.endTime,
        note:schedule.overtime.note||"",
        policyId:schedule.overtime.policyId,
        startTime:schedule.overtime.startTime
        
      });
    } else {
      form.reset({
        policyId: 0,
        startTime: "",
        endTime: "",
        note: "",
      });
    }
  }, [open, defaultValues, form]);
  const selectedPolicyId = form.watch("policyId");

  const selectedPolicy = policies.find((x) => x.id === selectedPolicyId);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: OvertimeFormValues) => {
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
  console.log(schedule);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{schedule?.overtime?"Chỉnh sửa tăng ca":"Đăng ký tăng ca"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="policyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chính sách tăng ca</FormLabel>

                  <Select
                    value={field.value === 0 ? "" : String(field.value)}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chính sách" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {policies.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {OVERTIME_TYPE_LABEL[item.type]}(x
                          {item.multiplier})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedPolicy && (
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">📋</span>

                  <p className="font-semibold">Thông tin chính sách</p>
                </div>

                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-muted-foreground">Loại tăng ca</div>

                  <div className="font-medium">
                    {OVERTIME_TYPE_LABEL[selectedPolicy.type]}
                  </div>

                  <div className="text-muted-foreground">Hệ số</div>

                  <div className="font-medium text-green-600">
                    x{selectedPolicy.multiplier}
                  </div>

                  <div className="text-muted-foreground">Phụ cấp</div>

                  <div className="font-medium">
                    {selectedPolicy.allowance.toLocaleString("vi-VN")} đ
                  </div>

                  <div className="text-muted-foreground">Hiệu lực</div>

                  <div className="font-medium">
                    {selectedPolicy.effectiveFrom}
                    {" → "}
                    {selectedPolicy.effectiveTo ?? "Không giới hạn"}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giờ bắt đầu</FormLabel>

                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giờ kết thúc</FormLabel>

                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Nhập ghi chú..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>

              <Button type="submit" disabled={loading}>
                Lưu
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

      {loading && <Loading fullScreen />}
    </Dialog>
  );
}
