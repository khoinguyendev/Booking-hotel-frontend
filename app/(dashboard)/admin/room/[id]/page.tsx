"use client";

import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import EmployeeDashboard from "@/components/dashboard/employee/EmployeeDashboard";
import ManagerDashboard from "@/components/dashboard/manager/ManagerDashboard";
import ManagerRoomDetail from "@/components/room/manager/ManagerRoomDetail";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      

      case 3:
        return <ManagerRoomDetail />;

      default:
        return null;
    }
  };

  return renderContent();
}