"use client";

import { useEffect, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";

import {
  ImportStep,
  ImportStepStatus,
} from "@/components/staff/import/ImportStaffDialog";

import { ImportError } from "@/types/staff";

import { getSignalRConnection } from "@/lib/signalr";

interface ImportProgressData {
  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;
  progress: number;
  status: "processing" | "completed" | "failed";
}

interface UseImportFileProps {
  importFn: (file: File) => Promise<any>;
  onSuccess?: () => Promise<void> | void;
}

const INITIAL_STEPS: ImportStep[] = [
  {
    id: "select",
    title: "Đã chọn file",
    status: "waiting",
  },
  {
    id: "upload",
    title: "Đang tải file",
    status: "waiting",
  },
  {
    id: "process",
    title: "Đang xử lý dữ liệu",
    status: "waiting",
  },
  {
    id: "done",
    title: "Hoàn thành",
    status: "waiting",
  },
];

export function useImportFile({
  importFn,
  onSuccess,
}: UseImportFileProps) {
  const [open, setOpen] = useState(false);

  const [progress, setProgress] = useState(0);

  const [fileName, setFileName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [errorDialogOpen, setErrorDialogOpen] =
    useState(false);

  const [importErrors, setImportErrors] = useState<
    ImportError[]
  >([]);

  const [totalRows, setTotalRows] = useState(0);

  const [processedRows, setProcessedRows] =
    useState(0);

  const [successRows, setSuccessRows] =
    useState(0);

  const [errorRows, setErrorRows] =
    useState(0);

  const [steps, setSteps] =
    useState<ImportStep[]>(INITIAL_STEPS);

  const [importing, setImporting] =
    useState(false);

  // ========================================
  // Update step
  // ========================================

  const updateStep = (
    id: string,
    status: ImportStepStatus
  ) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? {
              ...step,
              status,
            }
          : step
      )
    );
  };

  // ========================================
  // Reset
  // ========================================

  const resetImport = () => {
    setProgress(0);

    setTotalRows(0);

    setProcessedRows(0);

    setSuccessRows(0);

    setErrorRows(0);

    setErrorMessage("");

    setErrorDialogOpen(false);

    setImportErrors([]);

    setSteps(
      INITIAL_STEPS.map((step) => ({
        ...step,
        status: "waiting",
      }))
    );
  };

  // ========================================
  // SignalR
  // ========================================

  useEffect(() => {
    let connection: HubConnection | null = null;

    const handleImportProgress = (
      data: ImportProgressData
    ) => {
      console.log(
        "📊 Import progress:",
        data
      );

      // -----------------------------
      // Progress
      // -----------------------------

      setProgress(data.progress);

      // -----------------------------
      // Statistics
      // -----------------------------

      setTotalRows(data.totalRows);

      setProcessedRows(
        data.processedRows
      );

      setSuccessRows(
        data.successRows
      );

      setErrorRows(
        data.errorRows
      );

      // -----------------------------
      // Processing
      // -----------------------------

      if (data.status === "processing") {
        setImporting(true);

        updateStep(
          "upload",
          "success"
        );

        updateStep(
          "process",
          "loading"
        );
      }

      // -----------------------------
      // Completed
      // -----------------------------

      if (data.status === "completed") {
        setImporting(false);

        setProgress(100);

        updateStep(
          "select",
          "success"
        );

        updateStep(
          "upload",
          "success"
        );

        updateStep(
          "process",
          "success"
        );

        updateStep(
          "done",
          "success"
        );

        onSuccess?.();
      }

      // -----------------------------
      // Failed
      // -----------------------------

      if (data.status === "failed") {
        setImporting(false);

        updateStep(
          "process",
          "error"
        );
      }
    };

    const startSignalR = async () => {
      try {
        connection =
          await getSignalRConnection();

        if (!connection) {
          console.error(
            "Không thể tạo SignalR connection."
          );

          return;
        }

        connection.on(
          "ImportProgress",
          handleImportProgress
        );

        if (
          connection.state ===
          "Disconnected"
        ) {
          await connection.start();
        }

        console.log(
          "SignalR connected:",
          connection.connectionId
        );
      } catch (error) {
        console.error(
          "SignalR connection error:",
          error
        );
      }
    };

    startSignalR();

    return () => {
      connection?.off(
        "ImportProgress",
        handleImportProgress
      );
    };
  }, [onSuccess]);

  // ========================================
  // Start import
  // ========================================

  const startImport = async (file: File) => {
  resetImport();

  setOpen(true);
  setFileName(file.name);
  setImporting(true);

  updateStep("select", "success");

  updateStep("upload", "loading");

  try {
    // Upload bắt đầu
    updateStep("upload", "success");

    // Backend bắt đầu xử lý
    updateStep("process", "loading");

    // SignalR sẽ cập nhật progress
    await importFn(file);

    // ⚠️ Không update process/done ở đây
    //
    // SignalR "completed" sẽ làm việc đó.

  } catch (error: any) {
    setImporting(false);

    updateStep("process", "error");

    const data =
      error.response?.data?.data;

    setTotalRows(
      data?.totalRows ?? 0
    );

    setImportErrors(
      data?.errors ?? []
    );

    setErrorMessage(
      error.response?.data?.message ??
        "Import thất bại"
    );

    setErrorDialogOpen(true);
  }
};

  // ========================================
  // Return
  // ========================================

  return {
    // Dialog
    open,
    setOpen,

    // Progress
    progress,

    // File
    fileName,

    // Steps
    steps,

    // Status
    importing,

    // Statistics
    totalRows,
    processedRows,
    successRows,
    errorRows,

    // Error
    errorMessage,

    errorDialogOpen,
    setErrorDialogOpen,

    importErrors,

    // Action
    startImport,

    // Optional
    resetImport,
  };
}