"use client";

import ManagerStaff from "@/components/staff/manager/ManagerStaff";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      

      case 3:
        return <ManagerStaff />;
       
      default:
        return null;
    }
  };

  return renderContent();
}