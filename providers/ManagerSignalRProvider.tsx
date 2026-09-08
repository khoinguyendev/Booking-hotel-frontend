"use client";

import { useAuthStore } from "@/store/auth.store";
import { useManagerSignalR } from "@/hooks/useManagerSignalR";

export default function ManagerSignalRProvider() {
  const { user } = useAuthStore();

  useManagerSignalR(Number(user?.role) === 3);

  return null;
}