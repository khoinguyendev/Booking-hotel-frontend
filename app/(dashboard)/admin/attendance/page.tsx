"use client";

import EmployeeAttendance from "@/components/attendance/employee/EmployeeAttendance";
import ManagerAttendance from "@/components/attendance/manager/ManagerAttendance";
import { useAuthStore } from "@/store/auth.store";

export default function Page() {
  const { user } = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      case 2:
        return <EmployeeAttendance />;

      case 3:
        return <ManagerAttendance />;
      
      default:
        return null;
    }
  };

  return renderContent();
}
