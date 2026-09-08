"use client";


import ManagerRoomTypeDetail from "@/components/room-type/manager/ManagerRoomTypeDetail";

import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      

      case 3:
        return <ManagerRoomTypeDetail />;

      default:
        return null;
    }
  };

  return renderContent();
}