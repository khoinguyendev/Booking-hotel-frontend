"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoomType } from "@/types/roomtype";

const schema = z.object({
  name: z
    .string()
    .min(1, "Tên loại phòng là bắt buộc.")
    .max(100, "Tên loại phòng tối đa 100 ký tự."),

  maxGuest: z
    .number()
    .min(1, "Số khách tối đa phải ít nhất là 1.")
    .max(20, "Số khách tối đa là 20."),

  bedType: z
    .string()
    .min(1, "Loại giường là bắt buộc.")
    .max(100, "Loại giường tối đa 100 ký tự."),

  roomSize: z
    .number()
    .min(1, "Diện tích phải lớn hơn 0.")
    .max(1000, "Diện tích tối đa là 1000 m²."),
});

export type EditRoomTypeFormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  loading?: boolean;
  roomType: RoomType;
  onClose: () => void;
  onSubmit: (data: EditRoomTypeFormValues) => void;
}

export default function EditRoomTypeDialog({
  open,
  loading,
  roomType,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<EditRoomTypeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      maxGuest: 2,
      bedType: "",
      roomSize: 20,
    },
  });

  // Khi mở modal hoặc roomType thay đổi
  useEffect(() => {
    if (!open || !roomType) return;

    form.reset({
      name: roomType.name ?? "",
      maxGuest: roomType.maxGuest ?? 2,
      bedType: roomType.bedType ?? "",
      roomSize: roomType.roomSize ?? 20,
    });
  }, [open, roomType, form]);

  function handleClose() {
    if (loading) return;

    form.reset();
    onClose();
  }

  function handleSubmit(data: EditRoomTypeFormValues) {
    onSubmit(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chỉnh sửa loại phòng
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Cập nhật thông tin loại phòng.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Tên */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên loại phòng{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="VD: Deluxe Double"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Số khách + diện tích */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="maxGuest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Số khách tối đa{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber)
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Diện tích (m²){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={1000}
                        step="0.1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber)
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Loại giường */}
            <FormField
              control={form.control}
              name="bedType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Loại giường{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="VD: 1 giường đôi"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Hủy
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}