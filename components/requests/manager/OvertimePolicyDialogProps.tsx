import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOvertimePolicies } from "@/hooks/useOvertimePolicies";
import { OVERTIME_TYPE_LABEL } from "@/services/overtimePolicy.service";
import { Check } from "lucide-react";
import { useState } from "react";

interface OvertimePolicyDialogProps {
  open: boolean;
  disabled:boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (policyId: number) => void;
}



export function OvertimePolicyDialog({
  open,
  onOpenChange,
  disabled,
  onConfirm,
}: OvertimePolicyDialogProps) {
    const {policies}=useOvertimePolicies();
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
  const handleConfirm = () => {
    if (!selectedPolicy) return;

    onConfirm(selectedPolicy);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Chọn chính sách tăng ca</DialogTitle>

          <DialogDescription>
            Chọn chính sách áp dụng cho đơn tăng ca này.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {policies.map((policy) => {
            const selected = selectedPolicy === policy.id;

            return (
              <button
                key={policy.id}
                type="button"
                onClick={() => setSelectedPolicy(policy.id)}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  border-2
                  p-4
                  text-left
                  transition
                  ${
                    selected
                      ? "border-[#007AFF] bg-[#007AFF]/5"
                      : "border-[#E5E5EA] hover:border-[#007AFF]/40"
                  }
                `}
              >
                <div>
                  <p className="text-sm font-semibold text-[#1C1C1E]">
                    {OVERTIME_TYPE_LABEL[policy.type]}
                  </p>

                  <p className="mt-1 text-xs text-[#8E8E93]">
                    Hệ số {policy.multiplier}x
                  </p>
                </div>

                {selected && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#007AFF]">
                    <Check
                      size={15}
                      strokeWidth={2.5}
                      className="text-white"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-medium
              text-[#8E8E93]
              hover:bg-[#F2F2F7]
            "
          >
            Hủy
          </button>

          <button
            type="button"
            disabled={!selectedPolicy||disabled}
            
            onClick={handleConfirm}
            className="
              rounded-xl
              bg-[#007AFF]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#006ee6]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Xác nhận duyệt
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}