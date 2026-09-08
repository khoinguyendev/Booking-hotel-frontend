"use client";

import EmployeeWorkSchedule from "@/components/work-schedule/employee/EmployeeWorkSchedule";
import ManagerWorkSchedule from "@/components/work-schedule/manager/ManagerWorkSchedule";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
       case 2:
        return <EmployeeWorkSchedule />;

      case 3:
        return <ManagerWorkSchedule />;
       
      default:
        return null;
    }
  };

  return renderContent();
}