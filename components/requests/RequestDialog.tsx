'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import LeaveRequestForm from '../forms/LeaveRequestForm';
import ShiftChangeRequestForm from '../forms/ShiftChangeRequestForm';
import OvertimeRequestForm from '../forms/OvertimeRequestForm';



type RequestType =
  | 'Leave'
  | 'ShiftChange'
  | 'Overtime';

interface Props {
  open: boolean;
  onClose: () => void;
}

const TYPES = [
  {
    value: 'Leave',
    label: 'Xin nghỉ',
  },
  {
    value: 'ShiftChange',
    label: 'Đổi ca',
  },
  {
    value: 'Overtime',
    label: 'Tăng ca',
  },
] as const;

export default function RequestDialog({
  open,
  onClose,
}: Props) {
  const [type, setType] =
    useState<RequestType>('Leave');

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}

      <div
        className="
        fixed
        left-1/2
        top-1/2
        z-50
        w-full
        max-w-3xl
        -translate-x-1/2
        -translate-y-1/2
        rounded-[32px]
        bg-white
        shadow-2xl

        dark:bg-[#1C1C1E]
      "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#E5E5EA] px-8 py-6 dark:border-[#2C2C2E]">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-[#007AFF]">

              Tạo mới

            </p>

            <h2 className="mt-1 text-3xl font-black">

              Đơn từ

            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-[#F2F2F7] p-2 hover:bg-[#E5E5EA]"
          >
            <X />
          </button>

        </div>

        {/* Type */}

        <div className="px-8 pt-6">

          <div className="flex rounded-full bg-[#F2F2F7] p-1">

            {TYPES.map((item) => (

              <button
                key={item.value}
                onClick={() => setType(item.value)}
                className={`
                  flex-1
                  rounded-full
                  py-2
                  text-sm
                  font-semibold

                  ${
                    type === item.value
                      ? 'bg-white shadow'
                      : 'text-gray-500'
                  }
                `}
              >
                {item.label}

              </button>

            ))}

          </div>

        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-8">

          {type === 'Leave' && (
            <LeaveRequestForm />
          )}

          {type === 'ShiftChange' && (
            <ShiftChangeRequestForm />
          )}

          {type === 'Overtime' && (
            <OvertimeRequestForm />
          )}

        </div>

      </div>
    </>
  );
}