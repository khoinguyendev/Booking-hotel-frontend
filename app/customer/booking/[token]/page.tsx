"use client";

import BookingGuestForm, {
  BookingGuestData,
  BookingGuestFormRef,
} from "@/components/customer/BookingGuestForm";
import BookingOtpModal from "@/components/customer/BookingOtpModal";
import BookingPriceSummary from "@/components/customer/BookingPriceSummary";
import BookingRoomSummary from "@/components/customer/BookingRoomSummary";
import BookingSpecialRequest from "@/components/customer/BookingSpecialRequest";
import Footer from "@/components/stayora/Footer";
import Header from "@/components/stayora/Header";
import { useCreateBookingOtpVerification } from "@/hooks/customer/useCreateBookingOtpVerification";
import { useVerifyBookingOtp } from "@/hooks/customer/useVerifyBookingOtp";
import { BookingDraft } from "@/types/booking";
import { CreateBookingOtpVerificationResponse } from "@/types/bookingOtpVerification";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function BookingPage() {
  const params = useParams();

  const token = params.token as string;

  const [booking, setBooking] = useState<BookingDraft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const guestFormRef = useRef<BookingGuestFormRef>(null);
  const [guest, setGuest] = useState<BookingGuestData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const {
    createOtp,
    loading: createOtpLoading,
    error: createOtpError,
  } = useCreateBookingOtpVerification();
  const {
    verifyOtp,
    loading: verifyOtpLoading,
    error: verifyOtpError,
  } = useVerifyBookingOtp();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");

  const [otpResponse, setOtpResponse] =
    useState<CreateBookingOtpVerificationResponse | null>(null);
  useEffect(() => {
    if (!token) return;

    try {
      const stored = sessionStorage.getItem(`booking:${token}`);

      if (!stored) {
        setBooking(null);
        return;
      }

      const data: BookingDraft = JSON.parse(stored);

      setBooking(data);
    } catch (error) {
      console.error("Không thể đọc thông tin booking:", error);
      setBooking(null);
    } finally {
      setLoaded(true);
    }
  }, [token]);
  const handleBooking = async () => {
    if (!booking) return;

    const isGuestValid = guestFormRef.current?.validate();

    if (!isGuestValid) {
      return;
    }

    try {
      const data = {
        roomTypeId: booking.roomTypeId,

        guestName: guest.fullName,
        guestEmail: guest.email,
        guestPhone: guest.phone,

        checkin: booking.checkIn,
        checkout: booking.checkOut,

        guests: booking.guests,
        roomQuantity: booking.rooms,
      };

      const response = await createOtp(data);
      setOtpResponse(response);
      // API gửi OTP thành công
      setOtpModalOpen(true);
    } catch (error) {
      console.error("Không thể gửi OTP:", error);
    }
  };

  /*
   * Loading
   */
  if (!loaded) {
    return (
      <>
        <Header />

        <main className="customer-app">
          <div className="shell py-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-6">
                <BookingSkeleton />
                <BookingSkeleton />
                <BookingSkeleton />
              </div>

              <BookingSkeleton />
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /*
   * Không tìm thấy booking
   */
  if (!booking) {
    return (
      <>
        <Header />

        <main className="customer-app">
          <div className="shell py-20">
            <div className="mx-auto max-w-xl rounded-sm border border-dashed border-border bg-card p-10 text-center">
              <h1 className="font-serif text-3xl font-semibold text-primary">
                Không tìm thấy thông tin đặt phòng
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Phiên đặt phòng không tồn tại hoặc thông tin đã bị xóa. Vui lòng
                quay lại trang khách sạn và chọn phòng lại.
              </p>

              <Link
                href="/khach-san"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-sm
                  bg-primary
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-primary-foreground
                  transition
                  hover:bg-primary/90
                "
              >
                <ArrowLeft size={16} />
                Quay lại khách sạn
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);

  return (
    <>
      <Header />

      <main className="customer-app">
        {/* Heading */}
        <section className="border-b border-border bg-background">
          <div className="shell py-10">
            <Link
              href={`/khach-san/${booking.roomTypeId}`}
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-muted-foreground
                transition
                hover:text-primary
              "
            >
              <ArrowLeft size={16} />
              Quay lại khách sạn
            </Link>

            {/* <div className="mt-6">
              <p className="eyebrow text-accent">Hoàn tất đặt phòng</p>

              <h1
                className="
                  mt-3
                  max-w-3xl
                  font-serif
                  text-4xl
                  font-medium
                  tracking-tight
                  text-primary
                  sm:text-5xl
                "
              >
                Đặt phòng của bạn
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Kiểm tra thông tin lưu trú và nhập thông tin liên hệ để hoàn tất
                đặt phòng.
              </p>
            </div> */}
          </div>
        </section>

        {/* Content */}
        <section className="shell py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* LEFT */}
            <div className="min-w-0 space-y-6">
              <BookingRoomSummary
                room={booking.room}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={booking.guests}
                rooms={booking.rooms}
              />

              <BookingGuestForm
                ref={guestFormRef}
                value={guest}
                onChange={setGuest}
              />

              <BookingSpecialRequest
                value={specialRequest}
                onChange={setSpecialRequest}
              />

              {/* Security */}
              <section className="rounded-sm border border-border bg-card p-5">
                <div className="flex gap-3">
                  <div
                    className="
                      flex
                      size-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-secondary/10
                      text-secondary
                    "
                  >
                    <CheckIcon />
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary">
                      Đặt phòng an toàn
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Sau khi xác nhận, hệ thống sẽ tạo mã đặt phòng và gửi
                      thông tin xác nhận đến email của bạn.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <div className="min-w-0">
              <BookingPriceSummary
                room={booking.room}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={booking.guests}
                rooms={booking.rooms}
                onBooking={handleBooking}
                loading={createOtpLoading}
              />
            </div>
          </div>
        </section>
        <BookingOtpModal
          open={otpModalOpen}
          email={guest.email}
          onClose={() => setOtpModalOpen(false)}
          loading={verifyOtpLoading}
          onSubmit={async (otp) => {
            if (!otpResponse) return;

            const result = await verifyOtp(otpResponse.verificationId, otp);

            if (!result) {
              return;
            }

            // OTP đúng

            setOtpModalOpen(false);

            // Chuyển sang bước thanh toán
            window.location.href=result;
          }}
        />
      </main>

      <Footer />
    </>
  );
}

function BookingSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />

        <div className="mt-3 h-7 w-48 animate-pulse rounded bg-muted" />
      </div>

      <div className="space-y-4 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />

        <div className="h-10 w-full animate-pulse rounded bg-muted" />

        <div className="h-10 w-full animate-pulse rounded bg-muted" />

        <div className="h-24 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
