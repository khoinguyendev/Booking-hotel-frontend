"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { Booking, BookingStatus } from "@/types/booking";
import BookingStats from "./BookingStats";
import BookingFilter from "./BookingFilter";
import QuickBookingStatusFilter from "./QuickBookingStatusFilter";
import BookingToolbar from "./BookingToolbar";
import BookingTable from "./BookingTable";
import DataTablePagination from "@/components/pagination/DataTablePagination";
import BookingDetailDrawer from "./BookingDetailDrawer";
import { bookingService } from "@/services/booking.service";
import { useBooking } from "@/hooks/manager/useBooking";

export default function ManagerBooking() {

  /* ========================================================= */
  /* State                                                       */
  /* ========================================================= */
  const now = new Date();

  const [statsMonth, setStatsMonth] = useState(now.getMonth() + 1);

  const [statsYear, setStatsYear] = useState(now.getFullYear());


  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  /* ========================================================= */
  /* Dialog / Drawer                                             */
  /* ========================================================= */

  const [openDetail, setOpenDetail] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  /* ========================================================= */
  /* Filter                                                      */
  /* ========================================================= */

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");


  const [status, setStatus] = useState<BookingStatus | 0>(0);

  const [checkinFrom, setCheckinFrom] = useState("");

  const [checkinTo, setCheckinTo] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(0);

    const {
    bookings,
    stats,
    loading,
    loadingStats,
    pagination,
    refetch,
    refetchStats,
  } = useBooking({
    search,
    status,
    paymentStatus,
    checkinFrom,
    checkinTo,
    month: statsMonth,
    year: statsYear,
  });

 
  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);

    setOpenDetail(true);
  };

  /* ========================================================= */
  /* Edit                                                        */
  /* ========================================================= */

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);

    setOpenEdit(true);
  };


  return (
    <div
      className="
        min-h-screen

        space-y-6

        bg-[#F2F2F7]

        p-6

        dark:bg-black
      "
    >
      {/* ===================================================== */}
      {/* Header                                                  */}
      {/* ===================================================== */}

      <div>
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.3em]
            text-[#007AFF]
          "
        >
          Quản lý đặt phòng
        </p>

        <h1
          className="
            mt-1
            text-3xl
            font-black
            tracking-tight
          "
        >
          Danh sách booking
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-[#8E8E93]
          "
        >
          Quản lý đặt phòng, khách hàng, thanh toán và trạng thái lưu trú.
        </p>
      </div>

      {/* ===================================================== */}
      {/* Statistics                                              */}
      {/* ===================================================== */}

      <BookingStats
        data={stats}
        loading={loading}
        month={statsMonth}
        year={statsYear}
        onMonthChange={setStatsMonth}
        onYearChange={setStatsYear}
      />

      {/* ===================================================== */}
      {/* Filter                                                   */}
      {/* ===================================================== */}

      <BookingFilter
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          pagination.setPage(1);
        }}
        checkinFrom={checkinFrom}
        onCheckinFromChange={(value) => {
          setCheckinFrom(value);
          pagination.setPage(1);
        }}
        checkinTo={checkinTo}
        onCheckinToChange={(value) => {
          setCheckinTo(value);
          pagination.setPage(1);
        }}
        paymentStatus={paymentStatus}
        onPaymentStatusChange={(value) => {
          setPaymentStatus(value);
          pagination.setPage(1);
        }}
      />

      {/* ===================================================== */}
      {/* Quick Status                                            */}
      {/* ===================================================== */}

      <QuickBookingStatusFilter
        value={status}
        onChange={(value) => {
          setStatus(value);
          pagination.setPage(1);
        }}
      />

      {/* ===================================================== */}
      {/* Import input                                             */}
      {/* ===================================================== */}

      {/* <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".xlsx,.xls"
        onChange={async (event) => {
          const file = event.target.files?.[0];

          if (file) {
            await handleImport(file);
          }

          event.target.value = "";
        }}
      /> */}

      {/* ===================================================== */}
      {/* Toolbar                                                  */}
      {/* ===================================================== */}

      {/* <BookingToolbar
        selectedBookings={selectedBookings}
        onCreate={() => {
          setOpenCreate(true);
        }}
        onConfirm={handleBulkConfirm}
        onCheckIn={handleBulkCheckIn}
        onCheckOut={handleBulkCheckOut}
        onCancel={handleBulkCancel}
        onExport={handleExport}
        onImport={() => {
          fileInputRef.current?.click();
        }}
        loading={loading}
      /> */}

      {/* ===================================================== */}
      {/* Table                                                    */}
      {/* ===================================================== */}

      <BookingTable
        bookings={bookings}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        // onConfirm={handleConfirm}
        // onCheckIn={handleCheckIn}
        // onCheckOut={handleCheckOut}
        // onCancel={handleCancel}
      />

      {/* ===================================================== */}
      {/* Pagination                                               */}
      {/* ===================================================== */}

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

      {/* ===================================================== */}
      {/* Detail Drawer                                            */}
      {/* ===================================================== */}

      <BookingDetailDrawer
        open={openDetail}
        booking={selectedBooking}
        onClose={() => {
          setOpenDetail(false);
        }}
        onEdit={() => {
          if (!selectedBooking) return;

          setOpenDetail(false);

          setEditingBooking(selectedBooking);

          setOpenEdit(true);
        }}
        // onConfirm={() => {
        //   if (!selectedBooking) return;

        //   handleConfirm(selectedBooking);
        // }}
        // onCheckIn={() => {
        //   if (!selectedBooking) return;

        //   handleCheckIn(selectedBooking);
        // }}
        // onCheckOut={() => {
        //   if (!selectedBooking) return;

        //   handleCheckOut(selectedBooking);
        // }}
        // onCancel={() => {
        //   if (!selectedBooking) return;

        //   handleCancel(selectedBooking);
        // }}
      />

      {/* ===================================================== */}
      {/* Create                                                    */}
      {/* ===================================================== */}

      {/* <CreateBookingDialog
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
        }}
        onSubmit={handleCreateBooking}
      /> */}

      {/* ===================================================== */}
      {/* Edit                                                      */}
      {/* ===================================================== */}

      {/* <EditBookingDialog
        open={openEdit}
        booking={editingBooking}
        onClose={() => {
          setOpenEdit(false);
          setEditingBooking(null);
        }}
        onSubmit={handleUpdateBooking}
      /> */}
    </div>
  );
}
