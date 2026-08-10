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

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/common/Spinner";
import { EmployeeSchedule, ScheduleItem } from "@/types/workSchedule";

const schema = z.object({
  shiftId: z.string().min(1, "Chọn ca làm"),

  isDayOff: z.boolean(),

  note: z.string().optional(),
});

export type AssignShiftValues = z.infer<typeof schema>;

interface ShiftOption {
  id: number;
  name: string;
}

interface Props {
  open: boolean;
  mode: "create" | "edit";
  onOpenChange: (open: boolean) => void;
  schedule?: ScheduleItem|null;
  employeeName: string;
  employee?:EmployeeSchedule;
  employeeCode: string;

  workDate: string;

  shifts: ShiftOption[];

  onCreate: (values: AssignShiftValues) => Promise<void>;
  onUpdate: (values: AssignShiftValues) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export default function AssignShiftDialog({
  open,
  onOpenChange,
  employeeName,
  employeeCode,
  workDate,
  shifts,
  mode,
  onCreate,
  onUpdate,
  onDelete,
  schedule,
}: Props) {
  const form = useForm<AssignShiftValues>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (mode === "edit" && schedule) {
      form.reset({
        shiftId: schedule.shiftId?.toString() ?? "",
        isDayOff: schedule.isDayOff,
        note: schedule.note ?? "",
      });
    } else {
      form.reset({
        shiftId: "",
        isDayOff: false,
        note: "",
      });
    }
  }, [mode, schedule, open]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: AssignShiftValues) => {
    try {
      setLoading(true);

      if (mode === "create") {
        await onCreate(values);
      } else {
        await onUpdate(values);
      }

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };
  const dayOff = form.watch("isDayOff");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>
          {mode === "create" ? "Phân ca làm việc" : "Chỉnh sửa ca làm"}
        </DialogTitle>

        <div className="space-y-4 rounded-xl border p-4">
          <Info label="Nhân viên" value={employeeName} />

          <Info label="Mã" value={employeeCode} />

          <Info label="Ngày" value={workDate} />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="isDayOff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>

                  <Select
                    value={field.value ? "dayoff" : "working"}
                    onValueChange={(v) => field.onChange(v === "dayoff")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="working">Làm việc</SelectItem>

                      <SelectItem value="dayoff">Nghỉ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {!dayOff && (
              <FormField
                control={form.control}
                name="shiftId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ca làm</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ca làm" />
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
            )}

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
                </FormItem>
              )}
            />

            <DialogFooter>
              {/* {mode === "edit" && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Xóa ca
                </Button>
              )} */}

              <Button
                variant="outline"
                type="button"
                disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>

              <Button disabled={loading} type="submit">
                {loading
                  ? "Đang lưu..."
                  : mode === "create"
                    ? "Phân ca"
                    : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      {loading && <Loading fullScreen={true} />}
    </Dialog>
  );
}

interface InfoProps {
  label: string;

  value: string;
}

function Info({ label, value }: InfoProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
