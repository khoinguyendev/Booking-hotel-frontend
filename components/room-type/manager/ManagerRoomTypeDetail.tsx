import RoomTypeHeader from "@/components/room-type/RoomTypeHeader";
import RoomTypeOverview from "@/components/room-type/RoomTypeOverview";
import RoomTypeInfoCard from "@/components/room-type/RoomTypeInfoCard";
import RoomGallery from "@/components/room-type/RoomGallery";
import RoomListSection from "@/components/room-type/RoomListSection";
import { useParams } from "next/navigation";
import { useRoomType } from "@/hooks/manager/useRoomType";

export default function ManagerRoomTypeDetail() {
  const params = useParams();
  const id = Number(params.id);
  if (!id) return null;
  const { roomType, loading, refetch } = useRoomType(id);
  if (!roomType) {
    return <div>Không tìm thấy loại phòng.</div>;
  }
  return (
    <div className="space-y-6">
      <RoomTypeHeader id={id} roomType={roomType} />

       <RoomTypeOverview roomType={roomType} />

      {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RoomTypeInfoCard roomType={roomType} />
        </div>
      </div> */}

      <RoomGallery id={id} images={roomType.images} />

      <RoomListSection id={id} />
    </div>
  );
}
