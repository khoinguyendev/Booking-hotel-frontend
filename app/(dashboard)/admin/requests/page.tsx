"use client";

import EmployeeRequest from "@/components/requests/employee/EmployeeRequest";
import ManagerRequest from "@/components/requests/manager/ManagerRequest";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
       case 2:
        return <EmployeeRequest />;

      case 3:
        return <ManagerRequest />;
       
      default:
        return null;
    }
  };

  return renderContent();
}