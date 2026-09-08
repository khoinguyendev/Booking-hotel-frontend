"use client";

import { hotelStaffService } from "@/services/hotel-staff.service";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface Staff {
  id: number;
  employeeCode: string;
  fullName: string;
}

export default function FaceRegisterCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [employeeCode, setEmployeeCode] = useState("");
  const [staff, setStaff] = useState<Staff | null>(null);

  const [searching, setSearching] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Tìm nhân viên
  // ==========================================

  const findStaff = async () => {
    const code = employeeCode.trim();

    if (!code) {
      toast.error("Vui lòng nhập mã nhân viên");
      return;
    }

    setSearching(true);
    setStaff(null);

    try {
      const response =await hotelStaffService.getByEmployeeCode(code)

      setStaff(response.data.data);
        console.log(response.data.data)
      toast.success("Đã tìm thấy nhân viên");
    } catch (error) {
      console.error("Tìm nhân viên thất bại:", error);

      setStaff(null);

      toast.error(
        error instanceof Error
          ? error.message
          : "Không tìm thấy nhân viên"
      );
    } finally {
      setSearching(false);
    }
  };

  // ==========================================
  // Camera
  // ==========================================

  const startCamera = async () => {
    if (!staff) {
      toast.error("Vui lòng tìm nhân viên trước");
      return;
    }

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: 640,
            height: 480,
          },
          audio: false,
        });

      const video = videoRef.current;

      if (!video) {
        stream
          .getTracks()
          .forEach((track) => track.stop());

        return;
      }

      video.srcObject = stream;

      video.onloadedmetadata = async () => {
        try {
          await video.play();
          setStreaming(true);
        } catch (error) {
          console.error("Camera play error:", error);
        }
      };
    } catch (error) {
      console.error("Không thể mở camera:", error);

      toast.error("Không thể truy cập camera");
    }
  };

  // ==========================================
  // Capture & Register
  // ==========================================

  const capture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !staff) {
      return;
    }

    if (video.readyState < 2) {
      toast.error("Camera chưa sẵn sàng");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      toast.error("Không thể xử lý ảnh");
      return;
    }

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const blob =
      await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          resolve,
          "image/jpeg",
          0.9
        );
      });

    if (!blob) {
      toast.error("Không thể tạo ảnh");
      return;
    }

    const formData = new FormData();

    // Chỉ gửi ID nhân viên + ảnh
   formData.append(
  "employee_id",
  staff.id.toString()
);

formData.append(
  "employee_code",
  staff.employeeCode
);

formData.append(
  "name",
  staff.fullName
);

    formData.append(
      "file",
      blob,
      "face.jpg"
    );

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/face/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.text();

        throw new Error(
          `Face API error ${response.status}: ${error}`
        );
      }

      const data = await response.json();

      console.log(
        "Đăng ký thành công:",
        data
      );

      toast.success(
        `Đã đăng ký khuôn mặt cho ${staff.fullName}`
      );
    } catch (error) {
      console.error(
        "Đăng ký khuôn mặt thất bại:",
        error
      );

      toast.error(
        "Đăng ký khuôn mặt thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      {/* ========================================
          Employee Search
      ======================================== */}

      <div className="flex gap-2">
        <input
          value={employeeCode}
          onChange={(e) => {
            setEmployeeCode(e.target.value);

            // Nếu user thay đổi mã
            // thì xóa nhân viên cũ
            if (staff) {
              setStaff(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              findStaff();
            }
          }}
          placeholder="Nhập mã nhân viên..."
          className="h-10 w-64 rounded-lg border px-3 outline-none focus:ring-2"
        />

        <button
          onClick={findStaff}
          disabled={searching}
          className="rounded-lg bg-black px-4 text-white disabled:opacity-50"
        >
          {searching ? "Đang tìm..." : "Tìm"}
        </button>
      </div>

      {/* ========================================
          Staff Information
      ======================================== */}

      {staff && (
        <div className="rounded-xl border bg-gray-50 p-4">
          <div className="font-medium">
            {staff.fullName}
          </div>

          <div className="text-sm text-gray-500">
            Mã nhân viên: {staff.employeeCode}
          </div>
        </div>
      )}

      {/* ========================================
          Camera
          Chỉ hiển thị khi đã tìm thấy nhân viên
      ======================================== */}

      {staff && (
        <div className="flex justify-center space-y-3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-[800px] rounded-xl bg-black"
          />

          <canvas
            ref={canvasRef}
            className="hidden"
          />

          {!streaming ? (
            <button
              onClick={startCamera}
              className="rounded-lg bg-black px-5 py-2.5 text-white"
            >
              Bật camera
            </button>
          ) : (
            <button
              onClick={capture}
              disabled={loading}
              className="rounded-lg bg-black px-5 py-2.5 text-white disabled:opacity-50"
            >
              {loading
                ? "Đang xử lý..."
                : "Chụp & đăng ký"}
            </button>
          )}
        </div>
      )}

      {/* ========================================
          Chưa tìm thấy nhân viên
      ======================================== */}

      {!staff && !searching && (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
          Nhập mã nhân viên để bắt đầu đăng ký khuôn mặt
        </div>
      )}
    </div>
  );
}
