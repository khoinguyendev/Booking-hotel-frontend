"use client";

import Link from "next/link";
import { ArrowRight, BedDouble, Pencil, Plus } from "lucide-react";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { roomTypeService } from "@/services/roomType.service";
import { RoomType } from "@/services/hotel.service";
import CreateRoomTypeDialog, { CreateRoomTypeFormValues } from "@/components/room-type/manager/CreateRoomTypeDialog";

interface Props {
  roomTypes: RoomType[];
}

export default function RoomTypeSection({ roomTypes }: Props) {
  const [createRoomTypeOpen, setCreateRoomTypeOpen] = useState(false);
  const [creatingRoomType, setCreatingRoomType] = useState(false);

  async function handleCreateRoomType(data: CreateRoomTypeFormValues) {
    try {
      setCreatingRoomType(true);

      await roomTypeService.create(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingRoomType(false);
    }
  }
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Loại phòng
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Danh sách các loại phòng hiện có
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setCreateRoomTypeOpen(true)}
            className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-blue-600
        px-4
        py-2
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
      "
          >
            <Plus className="h-4 w-4" />
            Tạo
          </Button>
          <Link
            href="/admin/manager/room-types"
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
          >
            Quản lý
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <CreateRoomTypeDialog
        open={createRoomTypeOpen}
        loading={creatingRoomType}
        onClose={() => setCreateRoomTypeOpen(false)}
        onSubmit={handleCreateRoomType}
      />
      {/* Body */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {roomTypes.map((room) => (
          <div
            key={room.id}
            className="
              group
              rounded-2xl
              border
              border-zinc-200
              dark:border-zinc-700
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-blue-50
                    dark:bg-blue-500/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <BedDouble className="w-7 h-7 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {room.name}
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    {room.roomCount} phòng
                  </p>
                </div>
              </div>

              <button
                className="
                  opacity-0
                  group-hover:opacity-100
                  transition
                  rounded-xl
                  p-2
                  hover:bg-zinc-100
                  dark:hover:bg-zinc-800
                "
              >
                <Pencil className="w-4 h-4 text-zinc-600" />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Giá từ
              </p>

              <h4 className="mt-2 text-2xl font-black text-blue-600">
                {formatPrice(room.basePrice)}
              </h4>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span
                className="
                  rounded-full
                  bg-emerald-100
                  dark:bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-emerald-700
                  dark:text-emerald-400
                "
              >
                Đang hoạt động
              </span>

              <Link
                href={`/quan-ly/loai-phong/${room.id}`}
                className="
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:underline
                "
              >
                Chi tiết →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
