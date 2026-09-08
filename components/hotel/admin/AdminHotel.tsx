import AdminHotelHeader from "@/components/hotel/admin/AdminHotelHeader";
import AdminHotelStats from "@/components/hotel/admin/AdminHotelStats";
import AdminHotelToolbar from "./AdminHotelToolbar";
import AdminHotelTable from "./AdminHotelTable";
const hotels = [
  {
    id: 1,
    name: "Sunrise Hotel",
    brand: "AAA Hotels",
    star: 4,
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    roomCount: 120,
    staffCount: 38,
    status: "active" as const,
  },
  {
    id: 2,
    name: "Ocean Resort",
    brand: "BBB Hotels",
    star: 5,
    address: "12 Nguyễn Đình Chiểu, Mũi Né, Bình Thuận",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
    roomCount: 86,
    staffCount: 24,
    status: "active" as const,
  },
  {
    id: 3,
    name: "Grand Palace",
    brand: "AAA Hotels",
    star: 5,
    address: "88 Lê Lợi, Quận 1, TP.HCM",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    roomCount: 210,
    staffCount: 62,
    status: "maintenance" as const,
  },
];
export default function AdminHotel() {
  return (
    <div className="min-h-screen space-y-6 p-6">
      <AdminHotelHeader />

      <AdminHotelStats
        totalHotels={24}
        activeHotels={21}
        maintenanceHotels={2}
        totalRooms={2450}
      />
      {/* <AdminHotelToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        brand={brand}
        onBrandChange={setBrand}
        brands={[
          { id: 1, name: "AAA Hotels" },
          { id: 2, name: "BBB Hotels" },
          { id: 3, name: "CCC Hotels" },
        ]}
        onReset={() => {
          setSearch("");
          setStatus("all");
          setBrand("all");
        }}
      /> */}
      <AdminHotelTable
        hotels={hotels}
        onView={(hotel) => {
          console.log("View:", hotel.id);
        }}
        onEdit={(hotel) => {
          console.log("Edit:", hotel.id);
        }}
        onDelete={(hotel) => {
          console.log("Delete:", hotel.id);
        }}
      />
    </div>
  );
}
