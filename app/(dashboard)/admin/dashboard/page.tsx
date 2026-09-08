"use client";

import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import EmployeeDashboard from "@/components/dashboard/employee/EmployeeDashboard";
import ManagerDashboard from "@/components/dashboard/manager/ManagerDashboard";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
       case 2:
        return <EmployeeDashboard />;

      case 3:
        return <ManagerDashboard />;
        case 4:
        return <AdminDashboard />;
      default:
        return null;
    }
  };

  return renderContent();
}