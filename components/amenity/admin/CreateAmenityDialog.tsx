"use client";

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

const schema = z.object({
  name: z
    .string()
    .min(1, "Tên tiện ích là bắt buộc.")
    .max(255, "Tên tiện ích tối đa 255 ký tự."),

  icon: z
    .string()
    .max(255, "Tên icon tối đa 255 ký tự.")
    .optional()
    .or(z.literal("")),
});

export type CreateAmenityFormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAmenityFormValues) => void;
}



export default function CreateAmenityDialog({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<CreateAmenityFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  function handleClose() {
    if (loading) return;

    form.reset();
    onClose();
  }

  function handleSubmit(data: CreateAmenityFormValues) {
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
          <DialogTitle className="text-xl">Thêm tiện ích</DialogTitle>

          <p className="text-sm text-muted-foreground">
            Tạo tiện ích dùng chung cho các khách sạn.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Tên tiện ích */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên tiện ích <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="VD: Máy điều hòa" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Icon */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="VD: Wifi, Waves, AirVent..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <p className="text-xs text-muted-foreground">
                    Không bắt buộc. Nhập tên icon từ Lucide React.
                  </p>

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

              <Button type="submit" disabled={loading}>
                {loading ? "Đang tạo..." : "Thêm tiện ích"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
