"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Clock3, Mail, MapPin, Pencil, Phone, ScrollText } from "lucide-react";
import { hotelService } from "@/services/hotel.service";
import toast from "react-hot-toast";
import { Hotel } from "@/types/hotel";

interface Props {
  hotel:Hotel,
}

export default function HotelInfoCard({ hotel }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    address: hotel.address,
    phone: hotel.phone,
    email: hotel.email,
    checkin: hotel.checkinTime,
    checkout: hotel.checkoutTime,
    description: hotel.description,
  });

  useEffect(() => {
    setForm({
      address: hotel.address,
      phone: hotel.phone,
      email: hotel.email,
      checkin: hotel.checkinTime,
      checkout: hotel.checkoutTime,
      description: hotel.description,
    });
  }, [hotel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await hotelService.updateHotelByManager({
        address: form.address,
        phone: form.phone,
        email: form.email,
        checkinTime: form.checkin,
        checkoutTime: form.checkout,
        description: form.description,
      });

      setOpen(false);
      toast.success("Đã cập nhật")
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Thông tin khách sạn
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Các thông tin cơ bản của khách sạn
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="
    flex items-center gap-2
    rounded-xl bg-blue-600
    px-4 py-2
    text-sm font-semibold
    text-white
    transition hover:bg-blue-700
  "
          >
            <Pencil className="w-4 h-4" />
            Chỉnh sửa
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            icon={<MapPin className="w-5 h-5" />}
            label="Địa chỉ"
            value={hotel.address}
          />

          <InfoItem
            icon={<Phone className="w-5 h-5" />}
            label="Hotline"
            value={hotel.phone}
          />

          <InfoItem
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value={hotel.email}
          />

          <InfoItem
            icon={<Clock3 className="w-5 h-5" />}
            label="Check-in"
            value={hotel.checkinTime}
          />

          <InfoItem
            icon={<Clock3 className="w-5 h-5" />}
            label="Check-out"
            value={hotel.checkoutTime}
          />
        </div>

        {/* Description */}
        <div className="px-6 pb-6">
          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-5 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText className="w-5 h-5 text-blue-600" />

              <span className="font-semibold text-zinc-900 dark:text-white">
                Mô tả khách sạn
              </span>
            </div>

            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {hotel.description}
            </p>
          </div>
        </div>
      </section>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold dark:text-white">
                Cập nhật thông tin khách sạn
              </h2>

              <button onClick={() => setOpen(false)} disabled={loading}>
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm">Địa chỉ</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border px-4 py-2 dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="text-sm">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border px-4 py-2 dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border px-4 py-2 dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Check-in</label>
                  <input
                    type="time"
                    name="checkin"
                    value={form.checkin}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border px-4 py-2 dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-sm">Check-out</label>
                  <input
                    type="time"
                    name="checkout"
                    value={form.checkout}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border px-4 py-2 dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm">Mô tả</label>

                <textarea
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border px-4 py-2 dark:bg-zinc-800"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-xl border px-5 py-2"
              >
                Hủy
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="rounded-xl bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
              >
                {loading ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex gap-4">
      <div
        className="
          w-11
          h-11
          rounded-2xl
          bg-blue-50
          dark:bg-blue-500/10
          flex
          items-center
          justify-center
          text-blue-600
        "
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>

        <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
