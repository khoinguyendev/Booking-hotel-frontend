"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Camera, MapPin, Pencil, Star } from "lucide-react";
import toast from "react-hot-toast";

import { Hotel } from "@/services/hotel.service";
import { useUpdateHotel } from "@/hooks/manager/useUpdateHotel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

const schema = z.object({
  name: z
    .string()
    .min(1, "Tên khách sạn là bắt buộc.")
    .max(200, "Tên khách sạn tối đa 200 ký tự."),

  banner: z
    .string()
    .min(1, "Banner là bắt buộc."),

  address: z
    .string()
    .min(1, "Địa chỉ là bắt buộc.")
    .max(500, "Địa chỉ tối đa 500 ký tự."),

  star: z
    .number()
    .min(1, "Số sao tối thiểu là 1.")
    .max(5, "Số sao tối đa là 5."),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  hotel: Hotel;
}

export default function HotelHeader({ hotel }: Props) {
  const [open, setOpen] = useState(false);

  const { updateHotel, loading } = useUpdateHotel();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: hotel.name ?? "",
      banner: hotel.banner ?? "",
      address: hotel.address ?? "",
      star: hotel.star ?? 1,
    },
  });

  // Khi hotel thay đổi thì cập nhật lại dữ liệu form
  useEffect(() => {
    form.reset({
      name: hotel.name ?? "",
      banner: hotel.banner ?? "",
      address: hotel.address ?? "",
      star: hotel.star ?? 1,
    });
  }, [hotel, form]);

  function handleOpen() {
    form.reset({
      name: hotel.name ?? "",
      banner: hotel.banner ?? "",
      address: hotel.address ?? "",
      star: hotel.star ?? 1,
    });

    setOpen(true);
  }

  function handleClose() {
    if (loading) return;

    form.reset({
      name: hotel.name ?? "",
      banner: hotel.banner ?? "",
      address: hotel.address ?? "",
      star: hotel.star ?? 1,
    });

    setOpen(false);
  }

  async function handleSubmit(data: FormValues) {
    try {
      await updateHotel(data);

      toast.success("Đã cập nhật thông tin khách sạn");

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Lỗi khi cập nhật thông tin khách sạn");
    }
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 shadow-lg dark:border-zinc-800">
        <div className="relative h-[320px]">
          <img
            src={hotel.banner}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <button
            type="button"
            className="
              absolute right-5 top-5
              flex items-center gap-2
              rounded-2xl
              border border-white/20
              bg-white/15
              px-4 py-2
              text-xs font-semibold
              text-white
              backdrop-blur-xl
              transition
              hover:bg-white/25
            "
          >
            <Camera className="h-4 w-4" />
            Đổi ảnh bìa
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span
                  className="
                    inline-flex rounded-full
                    border border-blue-400/30
                    bg-blue-500/20
                    px-3 py-1
                    text-xs font-semibold
                    text-blue-100
                  "
                >
                  {hotel.brandName}
                </span>

                <h1 className="mt-3 text-4xl font-black text-white">
                  {hotel.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {hotel.address}
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: hotel.star ?? 0,
                    }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpen}
                className="
                  flex items-center gap-2
                  rounded-2xl
                  bg-blue-600
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <Pencil className="h-4 w-4" />
                Chỉnh sửa thông tin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            handleClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Chỉnh sửa khách sạn
            </DialogTitle>

            <DialogDescription>
              Cập nhật thông tin cơ bản của khách sạn.
            </DialogDescription>
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
                      Tên khách sạn{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="VD: Stayora Resort"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Banner */}
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Banner{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="https://..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Địa chỉ */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Địa chỉ{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="VD: 123 Nguyễn Huệ, Quận 1"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Số sao */}
              <FormField
                control={form.control}
                name="star"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Số sao{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber)
                        }
                      />
                    </FormControl>

                    <p className="text-xs text-muted-foreground">
                      Số sao từ 1 đến 5.
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

                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Đang cập nhật..."
                    : "Cập nhật"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}