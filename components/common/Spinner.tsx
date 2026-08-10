"use client";

interface Props {
  fullScreen?: boolean;
}

export default function Loading({ fullScreen = false }: Props) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[9999] flex items-center justify-center"
          : "flex items-center justify-center"
      }
    >
      <div className="loader" />
    </div>
  );
}