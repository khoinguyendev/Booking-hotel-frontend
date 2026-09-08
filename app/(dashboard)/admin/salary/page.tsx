"use client";

import EmployeeSalary from "@/components/salary/employee/EmployeeSalary";
import ManagerSalary from "@/components/salary/manager/ManagerSalary";
import { useAuthStore } from "@/store/auth.store";




export default function Page() {

  const { user} = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
       case 2:
        return <EmployeeSalary />;

      case 3:
        return <ManagerSalary />;
       
      default:
        return null;
    }
  };

  return renderContent();
}