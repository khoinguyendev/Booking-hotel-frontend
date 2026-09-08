"use client";

import Link from "next/link";
import { ArrowRight, Plus, Search } from "lucide-react";
import { useRoomsByRoomType } from "@/hooks/manager/useRoomsByRoomType";
import { ROOM_TYPE_LABEL, RoomStatus } from "@/types/room";
import { useState } from "react";
import CreateRoomDialog from "./manager/CreateRoomDialog";
import toast from "react-hot-toast";
import DataTablePagination from "../pagination/DataTablePagination";

interface Props {
  id: number;
}

const getStatusClassName = (status: RoomStatus) => {
  switch (status) {
    case RoomStatus.Available:
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";

    case RoomStatus.Occupied:
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

    case RoomStatus.Reserved:
      return "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400";

    case RoomStatus.Cleaning:
      return "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400";

    case RoomStatus.Maintenance:
      return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";

    case RoomStatus.OutOfService:
      return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-400";
  }
};

export default function RoomListSection({ id }: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const { rooms, createRoom, creating, loading, pagination, refetch } =
    useRoomsByRoomType({
      roomTypeId: id,
    });

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold">Danh sách phòng</h2>

          <p className="mt-1 text-sm text-zinc-500">{rooms.length} phòng</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}

          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm số phòng..."
              className="
        h-11
        w-52
        rounded-xl
        border
        border-zinc-300
        bg-white
        pl-10
        pr-4
        text-sm
        outline-none
        transition
        focus:border-blue-500
        dark:border-zinc-700
        dark:bg-zinc-900
      "
            />
          </div> */}

          {/* Status */}

          {/* <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
      h-11
      rounded-xl
      border
      border-zinc-300
      bg-white
      px-4
      text-sm
      outline-none
      transition
      focus:border-blue-500
      dark:border-zinc-700
      dark:bg-zinc-900
    "
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Available">Trống</option>
            <option value="Occupied">Đang sử dụng</option>
            <option value="Maintenance">Bảo trì</option>
            <option value="Cleaning">Đang dọn</option>
            <option value="OutOfService">Ngừng sử dụng</option>
          </select> */}

          {/* Button */}

          <button
            onClick={() => setCreateOpen(true)}
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
            Thêm phòng
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Phòng
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Tầng
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Trạng thái
              </th>

              <th className="px-6 py-4 text-right text-xs uppercase text-zinc-500">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">Phòng {room.roomNumber}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">Tầng {room.floor}</td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(
                      room.status,
                    )}`}
                  >
                    {ROOM_TYPE_LABEL[room.status]}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <Link
                    href={`/quan-ly/phong/${room.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Chi tiết
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <DataTablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
          onPageSizeChange={(size) => {
            pagination.setPageSize(size);
            pagination.setPage(1);
          }}
        />
      <CreateRoomDialog
        open={createOpen}
        loading={creating}
        onClose={() => setCreateOpen(false)}
        onSubmit={async (data) => {
          const success = await createRoom(data);

          if (success) {
            toast.success("Đã thêm");
            setCreateOpen(false);
          }
        }}
      />
    </section>
  );
}
