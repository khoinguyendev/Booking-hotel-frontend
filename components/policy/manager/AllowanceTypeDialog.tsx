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
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface AllowanceTypeFormValues {
  name: string;
  description?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialValues?: AllowanceTypeFormValues;
  onSubmit: (
    values: AllowanceTypeFormValues
  ) => void | Promise<void>;
}

const defaultValues: AllowanceTypeFormValues = {
  name: "",
  description: "",
};

export default function AllowanceTypeDialog({
  open,
  onClose,
  initialValues,
  onSubmit,
}: Props) {
  const form = useForm<AllowanceTypeFormValues>({
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
            {initialValues
              ? "Cập nhật loại phụ cấp"
              : "Thêm loại phụ cấp"}
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
                required: "Vui lòng nhập tên loại phụ cấp",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên loại phụ cấp</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Ví dụ: Phụ cấp ăn trưa"
                      {...field}
                    />
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
                    <Textarea
                      rows={4}
                      placeholder="Nhập mô tả..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
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