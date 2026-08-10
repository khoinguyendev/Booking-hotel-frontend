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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/common/Spinner";
import { overtimeTypeOptions } from "@/services/overtimePolicy.service";

const schema = z.object({
  type: z.number().min(1),
  multiplier: z.number().min(1),
  allowance: z.number().min(0),
  effectiveFrom: z.string().min(1),
  effectiveTo: z.string().optional(),
});
export type OvertimePolicyFormValues = z.input<typeof schema>;
export type OvertimePolicySubmitValues = z.output<typeof schema>;
interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  defaultValues?: Partial<OvertimePolicyFormValues>;

  onSubmit: (values: OvertimePolicyFormValues) => Promise<void>;
}

export default function OvertimePolicyDialog({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
}: Props) {
  const form = useForm<OvertimePolicyFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 1,
      multiplier: 1.5,
      allowance: 0,
      effectiveFrom: "",
      effectiveTo: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        type: defaultValues?.type ?? 1,

        multiplier: defaultValues?.multiplier ?? 1.5,

        allowance: defaultValues?.allowance ?? 0,

        effectiveFrom: defaultValues?.effectiveFrom ?? "",

        effectiveTo: defaultValues?.effectiveTo ?? "",
      });
    }
  }, [open, defaultValues]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: OvertimePolicyFormValues) => {
    try {
      setLoading(true);

      await onSubmit(values);

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {defaultValues
              ? "Cập nhật chính sách tăng ca"
              : "Thêm chính sách tăng ca"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Type */}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại tăng ca</FormLabel>

                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại tăng ca" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {overtimeTypeOptions.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value.toString()}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multiplier */}

            <FormField
              control={form.control}
              name="multiplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hệ số tăng ca</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      value={(field.value as number) ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Allowance */}

            <FormField
              control={form.control}
              name="allowance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phụ cấp</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="effectiveFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Áp dụng từ</FormLabel>

                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effectiveTo"
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
                disabled={loading}
                variant="outline"
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
      {loading && <Loading fullScreen={true} />}
    </Dialog>
  );
}
