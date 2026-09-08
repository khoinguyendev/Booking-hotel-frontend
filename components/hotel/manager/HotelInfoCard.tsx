"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

import { Clock3, Mail, MapPin, Pencil, Phone, ScrollText } from "lucide-react";

import { Hotel, hotelService } from "@/services/hotel.service";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdateHotel } from "@/hooks/manager/useUpdateHotel";

// =========================
// Schema
// =========================

const schema = z.object({
  address: z
    .string()
    .min(1, "Địa chỉ là bắt buộc.")
    .max(255, "Địa chỉ tối đa 255 ký tự."),

  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc.")
    .max(20, "Số điện thoại tối đa 20 ký tự."),

  email: z
    .string()
    .min(1, "Email là bắt buộc.")
    .email("Email không hợp lệ.")
    .max(255, "Email tối đa 255 ký tự."),

  checkinTime: z.string().min(1, "Giờ check-in là bắt buộc."),

  checkoutTime: z.string().min(1, "Giờ check-out là bắt buộc."),

  description: z.string().max(2000, "Mô tả tối đa 2000 ký tự.").optional(),
});

type HotelInfoFormValues = z.infer<typeof schema>;

// =========================
// Props
// =========================

interface Props {
  hotel: Hotel;
}

// =========================
// Component
// =========================

export default function HotelInfoCard({ hotel }: Props) {
  const [open, setOpen] = useState(false);
  const { updateHotel, loading } = useUpdateHotel();
  const form = useForm<HotelInfoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: hotel.address ?? "",
      phone: hotel.phone ?? "",
      email: hotel.email ?? "",
      checkinTime: hotel.checkinTime ?? "",
      checkoutTime: hotel.checkoutTime ?? "",
      description: hotel.description ?? "",
    },
  });

  // =========================
  // Đồng bộ dữ liệu hotel
  // =========================

  useEffect(() => {
    if (!open) return;

    form.reset({
      address: hotel.address ?? "",
      phone: hotel.phone ?? "",
      email: hotel.email ?? "",
      checkinTime: hotel.checkinTime ?? "",
      checkoutTime: hotel.checkoutTime ?? "",
      description: hotel.description ?? "",
    });
  }, [hotel, open, form]);

  // =========================
  // Close
  // =========================

  function handleClose() {
    if (loading) return;

    form.reset({
      address: hotel.address ?? "",
      phone: hotel.phone ?? "",
      email: hotel.email ?? "",
      checkinTime: hotel.checkinTime ?? "",
      checkoutTime: hotel.checkoutTime ?? "",
      description: hotel.description ?? "",
    });

    setOpen(false);
  }

  // =========================
  // Submit
  // =========================

  async function handleSubmit(data: HotelInfoFormValues) {
    try {
      await updateHotel({
        address: data.address,
        phone: data.phone,
        email: data.email,
        checkinTime: data.checkinTime,
        checkoutTime: data.checkoutTime,
        description: data.description,
      });

      toast.success("Đã cập nhật thông tin khách sạn");

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Không thể cập nhật thông tin khách sạn");
    }
  }

  return (
    <>
      <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Thông tin khách sạn
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Các thông tin cơ bản của khách sạn
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl"
          >
            <Pencil className="h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>

        {/* Body */}

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <InfoItem
            icon={<MapPin className="h-5 w-5" />}
            label="Địa chỉ"
            value={hotel.address}
          />

          <InfoItem
            icon={<Phone className="h-5 w-5" />}
            label="Hotline"
            value={hotel.phone}
          />

          <InfoItem
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={hotel.email}
          />

          <InfoItem
            icon={<Clock3 className="h-5 w-5" />}
            label="Check-in"
            value={hotel.checkinTime}
          />

          <InfoItem
            icon={<Clock3 className="h-5 w-5" />}
            label="Check-out"
            value={hotel.checkoutTime}
          />
        </div>

        {/* Description */}

        <div className="px-6 pb-6">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="mb-3 flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-blue-600" />

              <span className="font-semibold text-zinc-900 dark:text-white">
                Mô tả khách sạn
              </span>
            </div>

            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {hotel.description || "Chưa có mô tả."}
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          Edit Dialog
      ========================= */}

      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            handleClose();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Cập nhật thông tin khách sạn
            </DialogTitle>

            <DialogDescription>
              Chỉnh sửa các thông tin cơ bản của khách sạn.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {/* Địa chỉ */}

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Địa chỉ <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="VD: 123 Nguyễn Huệ, Quận 1, TP.HCM"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone + Email */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Số điện thoại <span className="text-red-500">*</span>
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="VD: 02838220001"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="email"
                          placeholder="VD: hotel@gmail.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Checkin + Checkout */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="checkinTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Giờ check-in <span className="text-red-500">*</span>
                      </FormLabel>

                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkoutTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Giờ check-out <span className="text-red-500">*</span>
                      </FormLabel>

                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>

                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Mô tả về khách sạn..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer */}

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
                  {loading ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// =========================
// Info Item
// =========================

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex gap-4">
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          text-blue-600
          dark:bg-blue-500/10
        "
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-zinc-900 dark:text-white">
          {value || "Chưa cập nhật"}
        </p>
      </div>
    </div>
  );
}
