import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/90 py-14 text-primary-foreground">
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-3xl">
            stayora<span className="text-accent">.</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/65">
            Những nơi chốn đáng nhớ cho những hành trình có ý nghĩa.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Khám phá</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/65">
            <Link href="/khach-san">Tất cả chỗ nghỉ</Link>
            <Link href="/#diem-den">Điểm đến</Link>
            <Link href="/#uu-dai">Ưu đãi</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Hỗ trợ</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/65">
            <span>Trung tâm trợ giúp</span>
            <span>Chính sách đặt phòng</span>
            <span>Liên hệ với chúng tôi</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Đăng ký nhận tin</h3>
          <p className="mt-4 text-sm text-primary-foreground/65">
            Cảm hứng du lịch gửi thẳng vào hộp thư.
          </p>
          <div className="mt-4 flex border-b border-primary-foreground/35 pb-2">
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-primary-foreground/50"
              placeholder="Email của bạn"
            />
            <button aria-label="Đăng ký">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="shell mt-12 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/45">
        © 2026 Stayora. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}