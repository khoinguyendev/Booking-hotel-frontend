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

import { Textarea } from "@/components/ui/textarea";

export interface PositionFormValues {
  name: string;
  description?: string;
  status: boolean;
}

interface Props {
  open: boolean;
  initialValues?: PositionFormValues;
  onClose: () => void;
  onSubmit: (values: PositionFormValues) => void;
}

const defaultValues: PositionFormValues = {
  name: "",
  description: "",
  status: true,
};

export default function PositionDialog({
  open,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<PositionFormValues>({
    defaultValues,
  });

  useEffect(() => {
    form.reset(initialValues ?? defaultValues);
  }, [initialValues, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Cập nhật chức vụ" : "Thêm chức vụ"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Vui lòng nhập tên chức vụ",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên chức vụ</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>

                  <FormControl>
                    <Textarea rows={4} {...field} />
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