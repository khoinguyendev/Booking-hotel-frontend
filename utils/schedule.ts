import {
  CalendarOff,
  Clock3,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";

export const getShiftInfo = (shiftName?: string) => {
  switch (shiftName) {
    case "Ca sáng":
      return {
        label: "Sáng",
        icon: Sunrise,
        className:
          "border border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/30",
      };

    case "Ca chiều":
      return {
        label: "Chiều",
        icon: Sunset,
        className:
          "border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/30",
      };

    case "Ca đêm":
      return {
        label: "Đêm",
        icon: Moon,
        className:
          "border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30",
      };

    case null:
      return {
        label: "Nghỉ",
        icon: CalendarOff,
        className:
          "border border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800",
      };

    default:
      return {
        label: "Chưa xếp",
        icon: Clock3,
        className:
          "border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-900/30",
      };
  }
};