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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface AttendancePolicyFormValues {
  lateToleranceMinutes: number;
  earlyLeaveToleranceMinutes: number;
  latePenaltyPerMinute: number;
  earlyLeavePenaltyPerMinute: number;
  absencePenaltyPercent: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialValues?: AttendancePolicyFormValues;
  onSubmit: (
    values: AttendancePolicyFormValues
  ) => void | Promise<void>;
}

const defaultValues: AttendancePolicyFormValues = {
  lateToleranceMinutes: 0,
  earlyLeaveToleranceMinutes: 0,
  latePenaltyPerMinute: 0,
  earlyLeavePenaltyPerMinute: 0,
  absencePenaltyPercent: 100,
};

export default function AttendancePolicyDialog({
  open,
  onClose,
  initialValues,
  onSubmit,
}: Props) {
  const form = useForm<AttendancePolicyFormValues>({
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues
              ? "Cập nhật chính sách chấm công"
              : "Thêm chính sách chấm công"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values);
            })}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lateToleranceMinutes"
                rules={{
                  min: {
                    value: 0,
                    message: "Không được nhỏ hơn 0",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cho phép đi trễ (phút)</FormLabel>

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
                name="earlyLeaveToleranceMinutes"
                rules={{
                  min: {
                    value: 0,
                    message: "Không được nhỏ hơn 0",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cho phép về sớm (phút)</FormLabel>

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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latePenaltyPerMinute"
                rules={{
                  min: {
                    value: 0,
                    message: "Không được nhỏ hơn 0",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phạt đi trễ (đ/phút)</FormLabel>

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
                name="earlyLeavePenaltyPerMinute"
                rules={{
                  min: {
                    value: 0,
                    message: "Không được nhỏ hơn 0",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phạt về sớm (đ/phút)</FormLabel>

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
            </div>

            <FormField
              control={form.control}
              name="absencePenaltyPercent"
              rules={{
                min: {
                  value: 0,
                  message: "Không được nhỏ hơn 0",
                },
                max: {
                  value: 100,
                  message: "Không được lớn hơn 100%",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phạt vắng (%)</FormLabel>

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