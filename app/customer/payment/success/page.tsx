"use client";

import { CheckCircle2, Home, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-12">
        <div className="w-full rounded-sm border border-border bg-card p-8 text-center shadow-sm sm:p-12">
          {/* Success icon */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-secondary/10">
            <CheckCircle2
              size={46}
              strokeWidth={1.8}
              className="text-secondary"
            />
          </div>

          {/* Heading */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Thanh toán thành công
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Đặt phòng thành công!
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Cảm ơn bạn đã đặt phòng. Thanh toán của bạn đã được ghi nhận
            thành công và quá trình đặt phòng đã hoàn tất.
          </p>

          {/* Payment info */}
          <div className="mt-8 rounded-sm border border-border bg-muted/40 p-5 text-left">
            <div className="flex items-start gap-3">
              <ReceiptText
                size={20}
                className="mt-0.5 shrink-0 text-primary"
              />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary">
                  Thông tin thanh toán
                </p>

                {sessionId ? (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Mã phiên thanh toán
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-foreground">
                      {sessionId}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanh toán đã được xác nhận thành công.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="mt-5 rounded-sm bg-secondary/5 p-4 text-left">
            <p className="text-sm font-medium text-secondary">
              Kiểm tra email của bạn
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Thông tin xác nhận đặt phòng sẽ được gửi đến email bạn đã
              cung cấp khi đặt phòng.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Home size={17} />
              Về trang chủ
            </Link>

            <Link
              href="/khach-san"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border px-5 py-3 text-sm font-semibold text-primary transition hover:bg-muted"
            >
              Tìm khách sạn khác
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
