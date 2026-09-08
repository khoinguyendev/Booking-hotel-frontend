"use client";

import ManagerBooking from "@/components/booking/manager/ManagerBooking";
import { useAuthStore } from "@/store/auth.store";

export default function Page() {
  const { user } = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {

      case 3:
        return <ManagerBooking />;
      
      default:
        return null;
    }
  };

  return renderContent();
}
