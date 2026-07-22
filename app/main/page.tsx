import type { Metadata } from "next";
import MainClient from "./MainClient";

export const metadata: Metadata = {
  title: "Trang chủ",
};

export default function Page() {
  return <MainClient />;
}