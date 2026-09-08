"use client";

import { Mail, Phone, UserRound } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface BookingGuestData {
  fullName: string;
  email: string;
  phone: string;
}

interface BookingGuestFormProps {
  value?: BookingGuestData;
  onChange?: (data: BookingGuestData) => void;
}
export interface BookingGuestFormRef {
  validate: () => boolean;
}
const BookingGuestForm = forwardRef<BookingGuestFormRef, BookingGuestFormProps>(
  ({ value, onChange }, ref) => {
    useImperativeHandle(ref, () => ({
      validate,
    }));
    const [form, setForm] = useState<BookingGuestData>(
      value ?? {
        fullName: "",
        email: "",
        phone: "",
      },
    );

    const [errors, setErrors] = useState<
      Partial<Record<keyof BookingGuestData, string>>
    >({});

    const handleChange = (field: keyof BookingGuestData, value: string) => {
      const next = {
        ...form,
        [field]: value,
      };

      setForm(next);

      onChange?.(next);

      // Khi người dùng nhập lại thì xóa lỗi của field đó
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

    const validate = () => {
      const newErrors: Partial<Record<keyof BookingGuestData, string>> = {};

      if (!form.fullName.trim()) {
        newErrors.fullName = "Vui lòng nhập họ và tên";
      }

      if (!form.email.trim()) {
        newErrors.email = "Vui lòng nhập email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Email không hợp lệ";
      }

      if (!form.phone.trim()) {
        newErrors.phone = "Vui lòng nhập số điện thoại";
      } else if (!/^(0|\+84)\d{9,10}$/.test(form.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    return (
      <section className="rounded-sm border border-border bg-card">
        {/* Header */}
        <div className="border-b border-border px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Thông tin khách
          </p>

          <h2 className="mt-1 font-serif text-2xl font-semibold text-primary">
            Ai sẽ lưu trú?
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Nhập thông tin người đại diện cho đặt phòng này.
          </p>
        </div>

        <div className="p-5">
          <div className="grid gap-5">
            {/* Họ tên */}
            <div>
              <label
                htmlFor="booking-full-name"
                className="mb-2 block text-sm font-medium"
              >
                Họ và tên
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <input
                  id="booking-full-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={`input !pl-11 ${
                    errors.fullName
                      ? "border-destructive focus:border-destructive"
                      : ""
                  }`}
                />
              </div>

              {errors.fullName && (
                <p className="mt-1.5 text-xs text-destructive">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email + phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Email */}
              <div>
                <label
                  htmlFor="booking-email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="booking-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className={`input !pl-11 ${
                      errors.email
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Số điện thoại
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="booking-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="0912 345 678"
                    className={`input !pl-11 ${
                      errors.phone
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                  />
                </div>

                {errors.phone && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="rounded-sm bg-muted/60 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Thông tin liên hệ</p>

              <p className="mt-1 leading-6">
                Email và số điện thoại sẽ được sử dụng để gửi xác nhận đặt phòng
                và các thông tin liên quan đến kỳ nghỉ của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);
BookingGuestForm.displayName = "BookingGuestForm";

export default BookingGuestForm;
