"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { differenceInCalendarDays, parseISO } from "date-fns";
import Loading from "@/components/common/Spinner";
import toast from "react-hot-toast";

const schema = z
  .object({
    sourceFrom: z.string().min(1, "Chọn ngày bắt đầu"),
    sourceTo: z.string().min(1, "Chọn ngày kết thúc"),
    targetFrom: z.string().min(1, "Chọn ngày bắt đầu"),
    mode: z.enum(["overwrite", "skip", "merge"]),
  })
  .superRefine((data, ctx) => {
    const sourceFrom = parseISO(data.sourceFrom);
    const sourceTo = parseISO(data.sourceTo);
    const targetFrom = parseISO(data.targetFrom);

    if (sourceTo < sourceFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sourceTo"],
        message: "Ngày kết thúc phải sau ngày bắt đầu",
      });
    }

    if (differenceInCalendarDays(sourceTo, sourceFrom) > 60) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sourceTo"],
        message: "Khoảng thời gian không được vượt quá 60 ngày",
      });
    }

    if (targetFrom <= sourceTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetFrom"],
        message: "Ngày bắt đầu đích phải sau ngày kết thúc nguồn",
      });
    }
  });

export type CopyScheduleValues = z.infer<typeof schema>;

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSubmit: (values: CopyScheduleValues) => Promise<void>;
}

export default function CopyScheduleDialog({
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const form = useForm<CopyScheduleValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      sourceFrom: "",

      sourceTo: "",

      targetFrom: "",

      mode: "skip",
    },
  });

  useEffect(() => {
    if (open) form.reset();
  }, [open]);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (values: CopyScheduleValues) => {
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Sao chép lịch làm việc</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Source */}

            <div className="space-y-4 rounded-xl border p-4">
              <h3 className="font-semibold">Nguồn</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sourceFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Từ ngày</FormLabel>

                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đến ngày</FormLabel>

                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Target */}

            <div className="space-y-4 rounded-xl border p-4">
              <h3 className="font-semibold">Đích</h3>

              <FormField
                control={form.control}
                name="targetFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bắt đầu copy từ</FormLabel>

                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mode */}

            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nếu lịch đã tồn tại</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="skip">Bỏ qua lịch đã có</SelectItem>

                      <SelectItem value="overwrite">Ghi đè lịch cũ</SelectItem>

                      {/* <SelectItem value="merge">
                        Chỉ thêm ngày chưa có
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
              • Toàn bộ ca trong khoảng thời gian nguồn sẽ được sao chép sang
              khoảng thời gian mới.
              <br />• Số ngày được giữ nguyên.
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

              <Button type="submit" disabled={loading}>Sao chép</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
       {loading&&<Loading fullScreen={true}/>} 
    </Dialog>
  );
}
