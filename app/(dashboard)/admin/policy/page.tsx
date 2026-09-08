"use client";


import ManagerPolice from "@/components/policy/manager/ManagerPolice";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      

      case 3:
        return <ManagerPolice />;

      default:
        return null;
    }
  };

  return renderContent();
}