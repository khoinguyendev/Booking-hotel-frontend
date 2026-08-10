// app/layout.tsx
'use client'; // 1. Chuyển sang Client Component để đọc Zustand

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster as  Toaster1} from "react-hot-toast";
import { useDashboardStore } from "@/store/dashboard.store"; // 2. Import store
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useDashboardStore(); // 3. Lấy trạng thái theme từ Zustand

  return (
    // 4. Ép class theme động vào html ngay tại đây để Tailwind nhận diện
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${theme}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-[#1C1C1E] dark:text-white transition-colors duration-300">
        <QueryProvider>
<ThemeProvider>
          {children}
          <Toaster1 position="top-right" toastOptions={{ duration: 3000 }} />
          <Toaster position="bottom-right" />
        </ThemeProvider>
        </QueryProvider>
        
      </body>
    </html>
  );
}