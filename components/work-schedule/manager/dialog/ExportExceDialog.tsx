"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
  differenceInCalendarDays,
} from "date-fns";

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
import toast from "react-hot-toast";
import Loading from "@/components/common/Spinner";

const schema = z
  .object({
    sourceFrom: z.string().min(1, "Chọn ngày bắt đầu"),
    sourceTo: z.string().min(1, "Chọn ngày kết thúc"),
  })
  .superRefine((data, ctx) => {
    const sourceFrom = parseISO(data.sourceFrom);
    const sourceTo = parseISO(data.sourceTo);

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
  });

export type ExportExcelValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ExportExcelValues) => Promise<void>;
}

export default function ExportExcelDialog({
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const form = useForm<ExportExcelValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      sourceFrom: "",
      sourceTo: "",
    },
  });
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) form.reset();
  }, [open]);

  const setThisWeek = () => {
    form.setValue(
      "sourceFrom",
      format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
    );
    form.setValue(
      "sourceTo",
      format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")
    );
  };

  const setThisMonth = () => {
    form.setValue(
      "sourceFrom",
      format(startOfMonth(new Date()), "yyyy-MM-dd")
    );
    form.setValue(
      "sourceTo",
      format(endOfMonth(new Date()), "yyyy-MM-dd")
    );
  };
  
 const handleSubmit = async (values: ExportExcelValues) => {
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
          <DialogTitle>Xuất Excel lịch làm việc</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4 rounded-xl border p-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={setThisWeek}
                >
                  Tuần này
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={setThisMonth}
                >
                  Tháng này
                </Button>
              </div>

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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                 disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>

              <Button type="submit"  disabled={loading}>Xuất Excel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
             {loading&&<Loading fullScreen={true}/>} 
      
    </Dialog>
  );
}