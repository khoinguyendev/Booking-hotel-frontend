"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface ShiftFormValues {
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  status: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialValues?: ShiftFormValues;
  onSubmit: (values: ShiftFormValues) => void | Promise<void>;
}

const defaultValues: ShiftFormValues = {
  name: "",
  startTime: "",
  endTime: "",
  breakMinutes: 0,
  status: true,
};

export default function ShiftDialog({
  open,
  onClose,
  initialValues,
  onSubmit,
}: Props) {
  const form = useForm<ShiftFormValues>({
    defaultValues,
  });

  useEffect(() => {
    form.reset(initialValues ?? defaultValues);
  }, [initialValues, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Cập nhật ca làm việc" : "Thêm ca làm việc"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values);
            })}
          >
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Vui lòng nhập tên ca",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên ca</FormLabel>

                  <FormControl>
                    <Input placeholder="Ví dụ: Ca sáng" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                rules={{
                  required: "Chọn giờ bắt đầu",
                }}
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
                rules={{
                  required: "Chọn giờ kết thúc",
                }}
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
              name="breakMinutes"
              rules={{
                min: {
                  value: 0,
                  message: "Không được nhỏ hơn 0",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời gian nghỉ (phút)</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <FormLabel>Đang hoạt động</FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Hủy
              </Button>

              <Button type="submit">
                {initialValues ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}