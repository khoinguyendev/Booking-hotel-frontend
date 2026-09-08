import type { Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./customer.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2563eb",
  userScalable: false,
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} ${playfair.variable} font-sans min-h-screen bg-background customer-app`}
    >

      {children}

      {process.env.NODE_ENV === "production"}
    </div>
  );
}