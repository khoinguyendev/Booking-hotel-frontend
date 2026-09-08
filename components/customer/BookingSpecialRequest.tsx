"use client";

import { MessageSquareText } from "lucide-react";

interface BookingSpecialRequestProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function BookingSpecialRequest({
  value = "",
  onChange,
}: BookingSpecialRequestProps) {
  return (
    <section className="rounded-sm border border-border bg-card">
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Yêu cầu đặc biệt
        </p>

        <h2 className="mt-1 font-serif text-2xl font-semibold text-primary">
          Bạn có yêu cầu nào không?
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Không bắt buộc · Khách sạn sẽ cố gắng đáp ứng yêu cầu của bạn.
        </p>
      </div>

      <div className="p-5">
        <div className="relative">
          <MessageSquareText
            size={18}
            className="absolute left-3 top-3.5 text-muted-foreground"
          />

          <textarea
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            placeholder="Ví dụ: Phòng tầng cao, giường đôi, nhận phòng sớm..."
            rows={5}
            maxLength={500}
            className="input min-h-[130px] resize-none !pl-11 pt-3"
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Yêu cầu phụ thuộc vào tình trạng thực tế của khách sạn.
          </p>

          <span className="text-xs text-muted-foreground">
            {value.length}/500
          </span>
        </div>
      </div>
    </section>
  );
}




