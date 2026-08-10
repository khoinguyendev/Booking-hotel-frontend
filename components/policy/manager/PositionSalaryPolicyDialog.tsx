"use client";

import { useEffect } from "react";
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
import { PositionSalaryPolicyResponse } from "@/types/positionSalaryPolicy";


const schema = z.object({
  positionId: z.number().min(1, "Chọn chức vụ"),

  shiftId: z.number().min(1, "Chọn ca làm"),

  hourlyRate: z.number().min(0, "Lương phải lớn hơn 0"),

  shiftMultiplier: z.number().min(0.1, "Hệ số phải lớn hơn 0"),

  effectiveFrom: z.string().min(1, "Chọn ngày hiệu lực"),

  effectiveTo: z.string().optional(),
});

export type PositionSalaryPolicyFormValues = z.infer<typeof schema>;

interface Option {
  id: number;
  name: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  editing?: PositionSalaryPolicyResponse | null;

  positions: Option[];

  shifts: Option[];

  onSubmit: (
    values: PositionSalaryPolicyFormValues
  ) => Promise<void>;
}

export default function PositionSalaryPolicyDialog({
  open,
  onOpenChange,
  editing,
  positions,
  shifts,
  onSubmit,
}: Props) {
  const form = useForm<PositionSalaryPolicyFormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      positionId: 0,
      shiftId: 0,
      hourlyRate: 0,
      shiftMultiplier: 1,
      effectiveFrom: "",
      effectiveTo: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (editing) {
      form.reset({
        positionId: editing.positionId,
        shiftId: editing.shiftId,
        hourlyRate: editing.hourlyRate,
        shiftMultiplier: editing.shiftMultiplier,
        effectiveFrom: editing.effectiveFrom,
        effectiveTo: editing.effectiveTo ?? "",
      });
    } else {
      form.reset({
        positionId: 0,
        shiftId: 0,
        hourlyRate: 0,
        shiftMultiplier: 1,
        effectiveFrom: "",
        effectiveTo: "",
      });
    }
  }, [editing, open, form]);

  const handleSubmit = async (
    values: PositionSalaryPolicyFormValues
  ) => {
    await onSubmit(values);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editing
              ? "Cập nhật chính sách lương"
              : "Thêm chính sách lương"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* Position + Shift */}

            <div className="grid grid-cols-2 gap-4">
              {editing ? (
                <>
                  <FormItem>
                    <FormLabel>Chức vụ</FormLabel>

                    <Input
                      disabled
                      value={editing.positionName}
                    />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Ca làm</FormLabel>

                    <Input
                      disabled
                      value={editing.shiftName}
                    />
                  </FormItem>
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="positionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chức vụ</FormLabel>

                        <Select
                          value={String(field.value)}
                          onValueChange={(v) =>
                            field.onChange(Number(v))
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn chức vụ" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {positions.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={String(item.id)}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shiftId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ca làm</FormLabel>

                        <Select
                          value={String(field.value)}
                          onValueChange={(v) =>
                            field.onChange(Number(v))
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn ca" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {shifts.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={String(item.id)}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            {/* Salary */}

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lương / giờ</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
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
                name="shiftMultiplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hệ số ca</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        value={field.value}
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

            {/* Date */}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="effectiveFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hiệu lực từ</FormLabel>

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

              <FormField
                control={form.control}
                name="effectiveTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đến ngày</FormLabel>

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
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>

              <Button type="submit">
                {editing ? "Cập nhật" : "Thêm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}