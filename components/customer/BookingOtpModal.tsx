"use client";

import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BookingOtpModalProps {
  open: boolean;
  email: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

export default function BookingOtpModal({
  open,
  email,
  loading = false,
  onClose,
  onSubmit,
}: BookingOtpModalProps) {
  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setOtp("");

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);

    if (value.length === 6) {
      onSubmit(value);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-sm bg-card p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Xác nhận đặt phòng
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-primary">
            Nhập mã OTP
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Mã xác nhận 6 số đã được gửi đến
          </p>

          <p className="mt-1 font-medium text-foreground">
            {email}
          </p>
        </div>

        <div className="mt-7">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            disabled={loading}
            placeholder="000000"
            className="
              h-14
              w-full
              rounded-sm
              border
              border-border
              bg-background
              text-center
              text-2xl
              font-semibold
              tracking-[0.5em]
              text-primary
              outline-none
              transition
              focus:border-primary
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Mã OTP có hiệu lực trong 5 phút.
        </p>

        <button
          type="button"
          disabled={otp.length !== 6 || loading}
          onClick={() => onSubmit(otp)}
          className="
            mt-6
            flex
            min-h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-sm
            bg-primary
            px-4
            py-3
            text-sm
            font-semibold
            text-primary-foreground
            transition
            hover:bg-primary/90
            disabled:cursor-not-allowed
            disabled:bg-muted
            disabled:text-muted-foreground
          "
        >
          {loading && <Loader2 size={17} className="animate-spin" />}

          {loading ? "Đang xác nhận..." : "Xác nhận OTP"}
        </button>

        <button
          type="button"
          disabled={loading}
          className="mt-4 block w-full text-center text-sm font-medium text-primary hover:underline disabled:opacity-50"
        >
          Gửi lại mã OTP
        </button>
      </div>
    </div>
  );
}