"use client";

import ManagerStaffWorkSchedule from "@/components/staff/manager/ManagerStaffWorkSchedule";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      

      case 3:
        return <ManagerStaffWorkSchedule />;
       
      default:
        return null;
    }
  };

  return renderContent();
}