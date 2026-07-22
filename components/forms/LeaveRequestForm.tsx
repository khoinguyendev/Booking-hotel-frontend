"use client";

import { z } from "zod";

import { CalendarDays, FileText } from "lucide-react";

import { format, differenceInDays, startOfDay, addDays } from "date-fns";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { forwardRef, useImperativeHandle } from "react";

const schema = z
  .object({
    fromDate: z.date({
      message: "Vui lòng chọn ngày bắt đầu",
    }),

    toDate: z.date({
      message: "Vui lòng chọn ngày kết thúc",
    }),

    reason: z
      .string()
      .min(5, "Lý do tối thiểu 5 ký tự")
      .max(500, "Lý do tối đa 500 ký tự"),
  })
  .refine(
  (data) => startOfDay(data.fromDate) >= addDays(startOfDay(new Date()), 1),
  {
    message: "Ngày bắt đầu phải từ ngày mai trở đi",
    path: ["fromDate"],
  })
  .refine(
    (data) => data.toDate >= data.fromDate,

    {
      message: "Ngày kết thúc phải sau ngày bắt đầu",

      path: ["toDate"],
    },
  ).refine(
    (data) => differenceInDays(data.toDate, data.fromDate) + 1 <= 5,
    {
      message: "Đơn xin nghỉ không được vượt quá 5 ngày",
      path: ["toDate"],
    })
  
  ;

export type LeaveRequestFormData = z.infer<typeof schema>;
export interface LeaveRequestFormRef {
  submit: () => void;
}
interface Props {
  onSubmit: (data: LeaveRequestFormData ) => void;
}
const LeaveRequestForm = forwardRef<LeaveRequestFormRef, Props>(
  ({ onSubmit }, ref) => {
  const {
    watch,
    setValue,
    register,
  handleSubmit,
    formState: { errors },
  } = useForm<LeaveRequestFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      reason: "",
    },
  });
  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    
  }));
  const fromDate = watch("fromDate");

  const toDate = watch("toDate");

  const totalDays =
    fromDate && toDate ? differenceInDays(toDate, fromDate) + 1 : 0;

  return (
    <div className="space-y-6">
      {/* Date */}

      <div className="grid gap-4 md:grid-cols-2">
        {/* From */}

        <div>
          <label
            className="mb-2 block text-sm font-semibold"
          >
            Ngày bắt đầu
          </label>

          <Popover>
            <PopoverTrigger className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#E5E5EA] px-4 text-left text-sm">
              <CalendarDays size={18} className="text-[#007AFF]" />
              {fromDate ? (
                format(fromDate, "dd/MM/yyyy")
              ) : (
                <span className="text-gray-400">Chọn ngày</span>
              )}
            </PopoverTrigger>

            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={(date) =>
                  setValue("fromDate", date as Date, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            </PopoverContent>
          </Popover>

          {errors.fromDate && (
            <p className="mt-2 text-xs text-red-500">
              {errors.fromDate.message}
            </p>
          )}
        </div>

        {/* To */}

        <div>
          <label
            className="mb-2 block text-sm font-semibold"
          >
            Ngày kết thúc
          </label>

          <Popover>
            <PopoverTrigger
              className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#E5E5EA] px-4 text-left text-sm"
            >
              <CalendarDays size={18} className="text-[#007AFF]" />

              {toDate ? (
                format(toDate, "dd/MM/yyyy")
              ) : (
                <span className="text-gray-400">Chọn ngày</span>
              )}
            </PopoverTrigger>

            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={(date) =>
                  setValue("toDate", date as Date, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            </PopoverContent>
          </Popover>

          {errors.toDate && (
            <p className="mt-2 text-xs text-red-500">{errors.toDate.message}</p>
          )}
        </div>
      </div>

      {/* Summary */}

      {totalDays <= 5 && (
        <div
          className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30"
        >
          <p
            className="text-sm font-semibold text-blue-700 dark:text-blue-300"
          >
            Số ngày nghỉ:
            <span className="ml-2">{totalDays} ngày</span>
          </p>
        </div>
      )}

      {/* Reason */}

      <div>
        <label
          className="mb-2 block text-sm font-semibold"
        >
          Lý do nghỉ
        </label>

        <textarea
          rows={4}
          {...register("reason")}
          placeholder="Nhập lý do xin nghỉ..."
          className="w-full resize-none rounded-2xl border border-[#E5E5EA] p-4 text-sm outline-none focus:border-[#007AFF] dark:border-[#2C2C2E] dark:bg-[#1C1C1E]"
        />
        <div
          className=" mt-2 flex justify-between"
        >
          {errors.reason && (
            <p
              className="text-xs text-red-500"
            >
              {errors.reason.message}
            </p>
          )}

          <span
            className=" text-xs text-gray-400"
          >
            500 ký tự
          </span>
        </div>
      </div>

      {/* Evidence */}

      {/* <div>
        <div
          className="
mb-3
flex
items-center
gap-2
"
        >
          <FileText size={18} className="text-[#007AFF]" />

          <h3 className="font-semibold">Minh chứng</h3>
        </div>

        <UploadEvidence />
      </div> */}
    </div>
  );

})
LeaveRequestForm.displayName = "LeaveRequestForm";

export default LeaveRequestForm;