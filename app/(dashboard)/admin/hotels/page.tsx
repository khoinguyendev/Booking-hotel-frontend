"use client";

import AdminHotel from "@/components/hotel/admin/AdminHotel";
import ManagerHotel from "@/components/hotel/manager/ManagerHotel";
import { useAuthStore } from "@/store/auth.store";

export default function Page() {
  const { user } = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      case 3:
        return <ManagerHotel />;
      case 4:
        return <AdminHotel />;
      default:
        return null;
    }
  };

  return renderContent();
}
