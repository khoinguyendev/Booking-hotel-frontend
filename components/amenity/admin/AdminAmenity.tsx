"use client";

import { useMemo, useState } from "react";

import AdminAmenityHeader from "@/components/amenity/admin/AdminAmenityHeader";
import AdminAmenityStats from "@/components/amenity/admin/AdminAmenityStats";
import AdminAmenityToolbar from "@/components/amenity/admin/AdminAmenityToolbar";
import AdminAmenityTable from "@/components/amenity/admin/AdminAmenityTable";
import CreateAmenityDialog, {
  CreateAmenityFormValues,
} from "@/components/amenity/admin/CreateAmenityDialog";
import { useAmenities } from "@/hooks/admin/useAmenities";

export default function AdminAmenity() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const { amenities, loading, createAmenity } = useAmenities();
  const handleCreate = async (data: CreateAmenityFormValues) => {
    const success = await createAmenity(data);

    if (success) {
      setCreateOpen(false);
    }
  };
  console.log(amenities,"sđ")
  return (
    <div className="min-h-screen space-y-6 bg-[#F2F2F7] p-6 dark:bg-black">
      <AdminAmenityHeader onCreate={() => setCreateOpen(true)} />

      {/* <AdminAmenityStats
        total={total}
        active={active}
        deleted={deleted}
      /> */}

      <AdminAmenityToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onReset={() => {
          setSearch("");
          setStatus("all");
        }}
      />

      <AdminAmenityTable
        amenities={amenities}
        onView={(amenity) => {
          console.log("View", amenity);
        }}
        onEdit={(amenity) => {
          console.log("Edit", amenity);
        }}
        onDelete={(amenity) => {
          console.log("Delete", amenity);
        }}
        onRestore={(amenity) => {
          console.log("Restore", amenity);
        }}
      />

      <CreateAmenityDialog
        open={createOpen}
        loading={loading}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
