import { BookingStatus } from "@/types/booking";

export const bookingStatusConfig: Record<
  BookingStatus,
  {
    label: string;
    className: string;
  }
> = {
  [BookingStatus.Pending]: {
    label: "Chờ xác nhận",
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
  },

  [BookingStatus.Confirmed]: {
    label: "Đã xác nhận",
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
  },

  [BookingStatus.CheckedIn]: {
    label: "Đã nhận phòng",
    className:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
  },

  [BookingStatus.CheckedOut]: {
    label: "Đã trả phòng",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  },

  [BookingStatus.Cancelled]: {
    label: "Đã hủy",
    className:
      "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300",
  },

  [BookingStatus.NoShow]: {
    label: "Không đến",
    className:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
  },

  [BookingStatus.Expired]: {
    label: "Hết hạn",
    className:
      "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  },
};