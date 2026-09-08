"use client";

import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const nav = [
  ["Khách sạn", "/khach-san"],
  ["Điểm đến", "/#diem-den"],
  ["Ưu đãi", "/#uu-dai"],
  ["Về Stayora", "/#ve-stayora"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-3xl font-semibold tracking-tight text-primary"
        >
          stayora<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/dang-nhap"
            aria-label="Tài khoản"
            className="hidden size-10 items-center justify-center rounded-full border border-border text-primary transition hover:bg-muted sm:flex"
          >
            <UserRound size={18} />
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
            className="flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            <Menu size={18} />
          </button>
          <Link
            href="/khach-san"
            className="hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 md:block"
          >
            Khám phá ngay
          </Link>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-primary/30 md:hidden">
          <div className="ml-auto flex h-full w-[min(86vw,360px)] flex-col gap-8 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-semibold">
                stayora<span className="text-accent">.</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Đóng menu">
                <X />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg">
              {nav.map(([label, href]) => (
                <Link onClick={() => setOpen(false)} key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              href="/khach-san"
              className="rounded-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
            >
              Khám phá ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}