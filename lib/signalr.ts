import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

let connection: HubConnection | null = null;

export async function getSignalRConnection() {
  if (typeof window === "undefined") {
    return null;
  }

  if (connection) {
    return connection;
  }

  const { HubConnectionBuilder, LogLevel } =
    await import("@microsoft/signalr");

  connection = new HubConnectionBuilder()
    .withUrl(`${process.env.NEXT_PUBLIC_HUB_URL}/hubs/notifications`, {
      accessTokenFactory: () =>
        localStorage.getItem("accessToken") ?? "",
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  return connection;
}