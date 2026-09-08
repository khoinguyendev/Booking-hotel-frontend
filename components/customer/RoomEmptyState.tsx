import { BedDouble, SearchX } from "lucide-react";

export default function RoomEmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-sm border border-dashed border-border bg-card px-6 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <BedDouble size={26} />
      </div>

      <h3 className="mt-5 font-serif text-2xl font-semibold text-primary">
        Không tìm thấy phòng phù hợp
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Khách sạn hiện không còn loại phòng phù hợp với số lượng khách,
        phòng hoặc thời gian lưu trú bạn đã chọn.
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <SearchX size={16} />
        <span>Hãy thử thay đổi ngày hoặc số lượng phòng</span>
      </div>
    </div>
  );
}