"use client";

import { useEffect } from "react";
import { HubConnection } from "@microsoft/signalr";
import { toast } from "sonner";

import RequestNotificationToast from "@/components/notifications/RequestNotificationToast";
import PaymentNotificationToast from "@/components/notifications/PaymentNotificationToast";
import { getSignalRConnection } from "@/lib/signalr";

import {
  PaymentNotification,
  RequestNotification,
} from "@/types/RequestNotification";

export function useManagerSignalR(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let connection: HubConnection | null = null;
    let cancelled = false;

    const handleNewStaffRequest = (
      data: RequestNotification,
    ) => {
      toast.custom((id) => (
        <RequestNotificationToast
          notification={data}
          onClose={() => toast.dismiss(id)}
          onView={(requestId) => {
            console.log("Open request:", requestId);
          }}
        />
      ));
    };

    const handlePaymentCompleted = (
      data: PaymentNotification,
    ) => {
      console.log("🔥 PaymentCompleted received", data);
      toast.custom((id) => (
        <PaymentNotificationToast
          notification={data}
          onClose={() => toast.dismiss(id)}
          onView={(bookingId) => {
            console.log("Open booking:", bookingId);
          }}
        />
      ));
    };

    const start = async () => {
      try {
        const conn = await getSignalRConnection();

        if (!conn || cancelled) return;

        connection = conn;

        // Xóa toàn bộ listener cũ
        connection.off("NewStaffRequest");
        connection.off("PaymentCompleted");

        // Đăng ký listener mới
        connection.on(
          "NewStaffRequest",
          handleNewStaffRequest,
        );

        connection.on(
          "PaymentCompleted",
          handlePaymentCompleted,
        );

        if (connection.state === "Disconnected") {
          await connection.start();
        }

        if (!cancelled) {
          console.log("✅ Manager SignalR connected");
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "❌ SignalR connection error:",
            error,
          );
        }
      }
    };

    start();

    return () => {
      cancelled = true;

      if (connection) {
        connection.off(
          "NewStaffRequest",
          handleNewStaffRequest,
        );

        connection.off(
          "PaymentCompleted",
          handlePaymentCompleted,
        );
      }
    };
  }, [enabled]);
}