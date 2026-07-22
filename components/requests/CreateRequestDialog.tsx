"use client";

import React, { useEffect, useRef, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import RequestTypeTabs from "./RequestTypeTabs";
import LeaveRequestForm, {
  LeaveRequestFormData,
  LeaveRequestFormRef,
} from "../forms/LeaveRequestForm";
import ShiftChangeRequestForm, {
  ShiftChangeRequestFormRef,
} from "../forms/ShiftChangeRequestForm";
import OvertimeRequestForm from "../forms/OvertimeRequestForm";
import SubmitFooter from "./SubmitFooter";
import { format } from "date-fns";
import { requestService } from "@/services/request.service";
import toast from "react-hot-toast";
import { WorkScheduleResponse } from "../work-schedule/WorkCalendar";
import { ShiftChangeRequest } from "@/types/requests";

export type RequestTab = "leave" | "shift" | "overtime";
export interface CreateLeaveRequest {
  fromDate: string;
  toDate: string;
  reason: string;
}
interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export default function CreateRequestDialog({ open, onOpenChange }: Props) {
  const [tab, setTab] = useState<RequestTab>("leave");
  const leaveFormRef = useRef<LeaveRequestFormRef>(null);
  const shiftFormRef = useRef<ShiftChangeRequestFormRef>(null);
  
  const handleLeaveSubmit = async (data: LeaveRequestFormData) => {
    const payload = {
      fromDate: format(data.fromDate, "yyyy-MM-dd"),
      toDate: format(data.toDate, "yyyy-MM-dd"),
      reason: data.reason,
    };
    try {
      // Call the API to create the leave request
      const response = await requestService.createLeaveRequest(payload);
      toast.success("Leave request created successfully!");
    } catch (error) {
      toast.error("Failed to create leave request.");
    }
  };
  const handleChangeShiftSubmit = async (data: ShiftChangeRequest) => {
    try {
      // Call the API to create the shift change request
      const response = await requestService.createShiftChangeRequest(data);
      toast.success("Shift change request created successfully!");
      console.log("Shift Change Request Response:", response.data);
    } catch (error) {
      toast.error("Failed to create shift change request.");
    }
  };
  
  const handleSubmit = () => {
    switch (tab) {
      case "leave":
        leaveFormRef.current?.submit();
        console.log("Submit Leave");
        break;

      case "shift":
        shiftFormRef.current?.submit();
        console.log("Submit Shift");
        break;

      case "overtime":
        console.log("Submit OT");
        break;
    }
  };
   
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden rounded-[32px] border bg-white p-0 shadow-2xl
  dark:bg-[#1C1C1E]
  dark:bg-[#1C1C1E]
    "
      >
        {/* Header */}

        <DialogHeader
          className="
              border-b
              border-[#E5E5EA]
              px-8
              py-6

              dark:border-[#2C2C2E]
            "
        >
          <DialogTitle
            className="
                text-3xl
                font-black
              "
          >
            Tạo đơn
          </DialogTitle>

          <p className="mt-1 text-sm text-gray-500">
            Chọn loại đơn và điền thông tin.
          </p>
        </DialogHeader>

        {/* Tabs */}

        <div className="px-8 pt-6">
          <RequestTypeTabs value={tab} onChange={setTab} />
        </div>

        {/* Form */}

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full px-8 py-6">
            {tab === "leave" && (
              <LeaveRequestForm
                ref={leaveFormRef}
                onSubmit={handleLeaveSubmit}
              />
            )}

            {tab === "shift" && <ShiftChangeRequestForm ref={shiftFormRef}
                onSubmit={handleChangeShiftSubmit}/>}

            {tab === "overtime" && <OvertimeRequestForm />}
          </ScrollArea>
        </div>

        {/* Footer */}

        <div className="shrink-0 border-t">
          <SubmitFooter
            loading={false}
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
