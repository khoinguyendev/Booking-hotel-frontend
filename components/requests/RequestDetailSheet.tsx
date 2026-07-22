"use client";

import {
  CalendarDays,
  Clock3,
  Coffee,
  RefreshCcw,
  User,
  X,
} from "lucide-react";

import RequestStatusBadge from "./RequestStatusBadge";
import {
  LeaveData,
  OvertimeData,
  ShiftChangeData,
  StaffRequest,
} from "@/types/requests";
import { useAuthStore } from "@/store/auth.store";
import { staffService } from "@/services/staft.service";
import { requestService } from "@/services/request.service";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  request: StaffRequest | null;
  onClose: () => void;
}

export default function RequestDetailSheet({ open, request, onClose }: Props) {
  const user = useAuthStore((state) => state.user);
  if (!open || !request) return null;
    
  const handleCancelRequest = async () => {
    // Xử lý logic từ chối đơn
    try {
      // Gọi API để từ chối đơn
      await requestService.deleteRequest(request.id);
      toast.success("Đơn đã được hủy thành công");
    } catch (error) {
      console.error("Lỗi khi từ chối đơn:", error);
      toast.error("Có lỗi xảy ra khi hủy đơn");
    }
  }
  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Sheet */}

      <div
        className="
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-[560px]
          flex-col
          bg-white
          dark:bg-[#1C1C1E]
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="border-b border-[#E5E5EA] p-6 dark:border-[#2C2C2E]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#007AFF]">
                Chi tiết đơn
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#1C1C1E] dark:text-white">
                {getTitle(request.type)}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-[#2C2C2E]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Trạng thái */}

          <section className="rounded-3xl border border-[#E5E5EA] p-5 dark:border-[#2C2C2E]">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Trạng thái</span>

              <RequestStatusBadge status={request.status} />
            </div>
          </section>

          {/* Nhân viên */}

          <section className="rounded-3xl border border-[#E5E5EA] p-5 dark:border-[#2C2C2E]">
            <div className="mb-4 flex items-center gap-2">
              <User size={18} className="text-[#007AFF]" />

              <span className="font-bold">Nhân viên</span>
            </div>

            <p className="font-semibold">{request.staffName}</p>

            <p className="text-sm text-gray-500">{request.employeeCode}</p>
          </section>

          {/* Nội dung */}

          <section className="rounded-3xl border border-[#E5E5EA] p-5 dark:border-[#2C2C2E]">
            {renderBody(request)}
          </section>

          {/* Lý do */}

          <section className="rounded-3xl border border-[#E5E5EA] p-5 dark:border-[#2C2C2E]">
            <h4 className="font-bold">Lý do</h4>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              {request.reason}
            </p>
          </section>

          {/* Kết quả */}

          {request.status === "Approved" && (
            <section className="rounded-3xl bg-green-50 p-5 dark:bg-green-950/20">
              <p className="font-semibold text-green-700 dark:text-green-300">
                Đã duyệt bởi {request.approvedBy}
              </p>

              <p className="mt-1 text-sm text-green-600">
                {request.approvedAt}
              </p>
            </section>
          )}

          {request.status === "Rejected" && (
            <section className="rounded-3xl bg-red-50 p-5 dark:bg-red-950/20">
              <p className="font-semibold text-red-700 dark:text-red-300">
                Lý do từ chối
              </p>

              <p className="mt-2">{request.rejectReason}</p>
            </section>
          )}
        </div>

        {/* Footer */}

        <div className="border-t border-[#E5E5EA] p-6 dark:border-[#2C2C2E]">
          <div className="flex gap-3">
            {/* Nhân viên */}
            {user?.role === "Staff" && request.status === "Pending" && (
              <button
                onClick={handleCancelRequest}
                className="flex-1 rounded-full border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                Hủy đơn
              </button>
            )}

            {/* Manager */}
            {user?.role === "Manager" && request.status === "Pending" && (
              <>
                <button
                  // onClick={handleRejectRequest}
                  className="flex-1 rounded-full border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Từ chối
                </button>

                <button
                  // onClick={handleApproveRequest}
                  className="flex-1 rounded-full bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Duyệt
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="flex-1 rounded-full bg-[#007AFF] py-3 font-semibold text-white transition hover:bg-[#0066DD]"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function getTitle(type: StaffRequest["type"]) {
  switch (type) {
    case "Leave":
      return "Đơn xin nghỉ";

    case "ShiftChange":
      return "Đơn đổi ca";

    default:
      return "Đơn tăng ca";
  }
}

function renderBody(request: StaffRequest) {
  switch (request.type) {
    case "Leave":
      const leaveData = request.detail as LeaveData;
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Coffee size={18} />

            <span className="font-semibold">Xin nghỉ</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <CalendarDays size={16} />
            {leaveData.fromDate}→{leaveData.toDate}
          </div>
        </div>
      );

    case "ShiftChange":
      const shiftChangeData = request.detail as ShiftChangeData;
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <RefreshCcw size={18} />

            <span className="font-semibold">Đổi ca</span>
          </div>

          <p>
            {shiftChangeData.currentShiftName}→
            {shiftChangeData.newShiftName ??
              shiftChangeData.targetWorkScheduleId}
          </p>
        </div>
      );

    default:
      const overtimeData = request.detail as OvertimeData;
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock3 size={18} />

            <span className="font-semibold">Tăng ca</span>
          </div>

          <p>{overtimeData.workDate}</p>

          <p>
            {overtimeData.fromTime}-{overtimeData.toTime}
          </p>

          <p>{overtimeData.hours} giờ</p>
        </div>
      );
  }
}
