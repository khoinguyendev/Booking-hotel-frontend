"use client";

import AdminAmenity from "@/components/amenity/admin/AdminAmenity";

import { useAuthStore } from "@/store/auth.store";

export default function Page() {
  const { user } = useAuthStore();

  const renderContent = () => {
    switch (Number(user?.role)) {
      case 4:
        return <AdminAmenity />;

     
      
      default:
        return null;
    }
  };

  return renderContent();
}
