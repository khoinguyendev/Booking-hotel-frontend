import type { Metadata, Viewport } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster as HotToast } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Stayora — Những nơi chốn đáng nhớ",
  description:
    "Khám phá những chỗ nghỉ đáng nhớ cho những hành trình có ý nghĩa."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <QueryProvider>
      <body>
        {children}
        <HotToast position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
      

      </QueryProvider>
    </html>
  );
}