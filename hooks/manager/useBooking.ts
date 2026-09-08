import { useCallback, useEffect, useState } from "react";

import { bookingService, BookingStatsData } from "@/services/booking.service";

import { Booking, BookingStatus, PaymentStatus } from "@/types/booking";
import { usePagination } from "../usePayroll";

interface Props {
  search?: string;

  status?: BookingStatus | 0;

  paymentStatus?: PaymentStatus | 0;

  checkinFrom?: string;

  checkinTo?: string;

  month: number;

  year: number;
}

export function useBooking({
  search,
  status,
  paymentStatus,
  checkinFrom,
  checkinTo,
  month,
  year,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [loadingStats, setLoadingStats] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [stats, setStats] = useState<BookingStatsData>({
    month: 0,
    year: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    paidAmount: 0,
  });

  const pagination = usePagination();

  const { page, pageSize, setTotalItems, setTotalPages } = pagination;

  // ======================================================
  // Bookings
  // ======================================================

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const res = await bookingService.getBookings({
        page,
        pageSize,

        search: search?.trim() || undefined,

        status: status && status > 0 ? status : undefined,

        paymentStatus:
          paymentStatus && paymentStatus > 0 ? paymentStatus : undefined,

        checkinFrom: checkinFrom || undefined,

        checkinTo: checkinTo || undefined,
      });

      const data = res.data.data;

      setBookings(data.items);

      setTotalItems(data.totalItems);

      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    pageSize,
    search,
    status,
    paymentStatus,
    checkinFrom,
    checkinTo,
    setTotalItems,
    setTotalPages,
  ]);

  // ======================================================
  // Stats
  // ======================================================

  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);

      const res = await bookingService.getStats({
        month,
        year,
      });

      setStats(res.data.data);
    } catch (err) {
      console.error("Fetch booking stats error:", err);
    } finally {
      setLoadingStats(false);
    }
  }, [month, year]);

  // ======================================================
  // Fetch bookings when filter changes
  // ======================================================

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ======================================================
  // Fetch stats when month/year changes
  // ======================================================

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    // Data
    bookings,
    stats,

    // Loading
    loading,
    loadingStats,

    // Pagination
    pagination,

    // Refetch
    refetch: fetchBookings,
    refetchStats: fetchStats,
  };
}
