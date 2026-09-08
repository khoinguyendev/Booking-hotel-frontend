"use client";

import { useEffect, useRef, useState } from "react";

interface RecognitionResult {
  employee_id: number;
  employee_code: string;
  name: string;
  score: number;
}

export default function FaceRecognitionCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const scanningRef = useRef(false);

  const [streaming, setStreaming] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] =
    useState<RecognitionResult | null>(null);

  const [error, setError] = useState("");

  // ==========================================
  // Start camera
  // ==========================================

  const startCamera = async () => {
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

      streamRef.current = stream;

      const video = videoRef.current;

      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      video.srcObject = stream;

      video.onloadedmetadata = async () => {
        try {
          await video.play();

          setStreaming(true);
        } catch (error) {
          console.error(
            "Camera play error:",
            error
          );
        }
      };
    } catch (error) {
      console.error(
        "Không thể mở camera:",
        error
      );

      setError("Không thể truy cập camera");
    }
  };

  // ==========================================
  // Capture frame + recognize
  // ==========================================

  const recognize = async () => {
    // Không cho request chồng nhau
    if (scanningRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    if (video.readyState < 2) {
      return;
    }

    scanningRef.current = true;
    setScanning(true);

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
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
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/jpeg",
              0.8
            );
          }
        );

      if (!blob) {
        return;
      }

      const formData = new FormData();

      formData.append(
        "file",
        blob,
        "face.jpg"
      );

      const response = await fetch(
        "http://127.0.0.1:8000/face/recognize",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Nhận diện thất bại"
        );
      }

      if (data.success) {
        setResult(data.data);
        setError("");
      } else {
        setResult(null);
        setError("");
      }

    } catch (error) {
      console.error(
        "Recognition error:",
        error
      );

    } finally {
      scanningRef.current = false;
      setScanning(false);
    }
  };

  // ==========================================
  // Auto scan
  // ==========================================

  useEffect(() => {
    if (!streaming) {
      return;
    }

    const interval = setInterval(() => {
      recognize();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [streaming]);

  // ==========================================
  // Start camera when component mounted
  // ==========================================

  useEffect(() => {
    startCamera();

    return () => {
      streamRef.current
        ?.getTracks()
        .forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="space-y-6">

      {/* Camera */}
      <div className="relative w-[640px] overflow-hidden rounded-xl bg-black">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full"
        />

        {/* Face guide */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-48 rounded-[50%] border-2 border-white/80" />
        </div>

        {/* Status */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-black/60 px-4 py-2 text-sm text-white">
            {scanning
              ? "Đang quét..."
              : "Đang chờ..."}
          </div>
        </div>

      </div>

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {/* Camera not started */}
      {!streaming && (
        <button
          onClick={startCamera}
          className="rounded-lg bg-black px-5 py-2.5 text-white"
        >
          Bật camera
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <div className="mb-4 text-sm text-gray-500">
            Đã nhận diện
          </div>

          <div className="space-y-2">

            <div>
              <span className="text-gray-500">
                Nhân viên:
              </span>{" "}
              <strong>
                {result.name}
              </strong>
            </div>

            <div>
              <span className="text-gray-500">
                Mã nhân viên:
              </span>{" "}
              {result.employee_code}
            </div>

            <div>
              <span className="text-gray-500">
                Employee ID:
              </span>{" "}
              {result.employee_id}
            </div>

            <div>
              <span className="text-gray-500">
                Similarity:
              </span>{" "}
              {(result.score * 100).toFixed(2)}%
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
