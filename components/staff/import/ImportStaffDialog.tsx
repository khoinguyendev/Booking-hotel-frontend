"use client";

import {
  CheckCircle2,
  Circle,
  Loader2,
  XCircle,
  FileSpreadsheet,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export type ImportStepStatus =
  | "waiting"
  | "loading"
  | "success"
  | "error";

export interface ImportStep {
  id: string;
  title: string;
  status: ImportStepStatus;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  setErrorDialogOpen: (open: boolean) => void;

  fileName?: string;

  progress: number;

  steps: ImportStep[];

  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;

  errorMessage?: string;
}

export default function ImportStaffDialog({
  open,
  onOpenChange,
  fileName,
  progress,
  steps,
  totalRows,
  processedRows,
  successRows,
  errorRows,
  errorMessage,
  setErrorDialogOpen,
}: Props) {
  const isCompleted =
    progress === 100 &&
    steps.some(
      (step) =>
        step.id === "done" &&
        step.status === "success"
    );

  const isFailed = steps.some(
    (step) =>
      step.status === "error"
  );

  const progressText = isCompleted
    ? "Import hoàn tất."
    : isFailed
      ? "Import thất bại."
      : progress === 0
        ? "Đang chuẩn bị..."
        : "Đang xử lý dữ liệu...";

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet
              size={20}
              className="text-green-600"
            />

            Import nhân viên
          </DialogTitle>

          <DialogDescription>
            Đang xử lý dữ liệu từ file Excel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* =========================
              File
          ========================= */}

          {fileName && (
            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/40">
                <FileSpreadsheet
                  size={21}
                  className="text-green-600"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {fileName}
                </p>

                <p className="text-xs text-muted-foreground">
                  File Excel
                </p>
              </div>
            </div>
          )}

          {/* =========================
              Progress
          ========================= */}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {progressText}
              </span>

              <span className="text-sm font-semibold">
                {progress}%
              </span>
            </div>

            <Progress
              value={progress}
              indicatorClassName={
                isFailed
                  ? "bg-red-500"
                  : "bg-green-500"
              }
            />

            {/* Rows */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {processedRows.toLocaleString()} /{" "}
                {totalRows.toLocaleString()} dòng
              </span>

              {totalRows > 0 && (
                <span>
                  {Math.round(
                    (processedRows / totalRows) * 100
                  )}
                  %
                </span>
              )}
            </div>
          </div>

          {/* =========================
              Statistics
          ========================= */}

          {totalRows > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {/* Success */}
              <div className="rounded-xl border bg-muted/20 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Thành công
                  </span>

                  <CheckCircle2
                    size={16}
                    className="text-green-600"
                  />
                </div>

                <p className="mt-1 text-lg font-semibold text-green-600">
                  {successRows.toLocaleString()}
                </p>
              </div>

              {/* Error */}
              <div className="rounded-xl border bg-muted/20 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Lỗi
                  </span>

                  <XCircle
                    size={16}
                    className="text-red-600"
                  />
                </div>

                <p className="mt-1 text-lg font-semibold text-red-600">
                  {errorRows.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* =========================
              Steps
          ========================= */}

          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-3"
              >
                <StatusIcon
                  status={step.status}
                />

                <span
                  className={
                    step.status === "success"
                      ? "text-sm font-medium text-green-600"
                      : step.status === "error"
                        ? "text-sm font-medium text-red-600"
                        : step.status === "loading"
                          ? "text-sm font-medium text-foreground"
                          : "text-sm text-muted-foreground"
                  }
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* =========================
              Error
          ========================= */}

          {errorMessage && (
            <div className="space-y-3">
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30">
                {errorMessage}
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  setErrorDialogOpen(true)
                }
              >
                Xem chi tiết lỗi
              </Button>
            </div>
          )}

          {/* =========================
              Completed
          ========================= */}

          {isCompleted && (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
              <CheckCircle2 size={18} />

              <span>
                Đã import thành công{" "}
                <strong>
                  {successRows.toLocaleString()}
                </strong>{" "}
                nhân viên.
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatusIcon({
  status,
}: {
  status: ImportStepStatus;
}) {
  switch (status) {
    case "success":
      return (
        <CheckCircle2
          size={18}
          className="shrink-0 text-green-600"
        />
      );

    case "loading":
      return (
        <Loader2
          size={18}
          className="shrink-0 animate-spin text-blue-600"
        />
      );

    case "error":
      return (
        <XCircle
          size={18}
          className="shrink-0 text-red-600"
        />
      );

    default:
      return (
        <Circle
          size={18}
          className="shrink-0 text-muted-foreground"
        />
      );
  }
}