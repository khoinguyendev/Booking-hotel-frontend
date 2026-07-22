"use client";

import { formatCurrency } from "@/utils/format";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { hotelSurchargeService } from "@/services/hotelSurcharge.service";
import toast from "react-hot-toast";
import { HotelSurcharge } from "@/types/hotel";



interface Props {
  surcharges: HotelSurcharge[];
}

export default function SurchargeSection({ surcharges }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<HotelSurcharge | null>(null);
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editing) {
        // Cập nhật
        await hotelSurchargeService.update(editing.id, form);
        toast.success("Đã cập nhật")
      } else {
        // Thêm mới
        await hotelSurchargeService.create(form);
        toast.success("Đã thêm")
      }

      setOpen(false);

      // Reset form
      setEditing(null);
      setForm({
        name: "",
        description: "",
        chargeType: "Fixed",
        applyType: "Booking",
        amount: 0,
        isRequired: true,
        isActive: true,
      });

      // TODO: Gọi lại API lấy danh sách phụ thu
      // await fetchSurcharges();
    } catch (error) {
      console.error(error);
      toast.error(editing ? "Cập nhật phụ thu thất bại." : "Thêm phụ thu thất bại.");
    } finally {
      setLoading(false);
    }
  };
  const [form, setForm] = useState({
    name: "",
    description: "",
    chargeType: "Fixed",
    applyType: "Booking",
    amount: 0,
    isRequired: true,
    isActive: true,
  });
  return (
    <>
      <section className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold">Phụ thu khách sạn</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Quản lý các khoản phụ thu áp dụng
            </p>
          </div>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-blue-700
            transition
          "
            onClick={() => {
              setEditing(null);

              setForm({
                name: "",
                description: "",
                chargeType: "Fixed",
                applyType: "Booking",
                amount: 0,
                isRequired: true,
                isActive: true,
              });

              setOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Thêm phụ thu
          </button>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Tên phụ thu
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Loại
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Áp dụng
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Giá trị
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Bắt buộc
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Trạng thái
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody>
              {surcharges.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition"
                >
                  <td className="px-6 py-5 font-semibold">{item.name}</td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {item.chargeType === "Fixed" ? "Cố định" : "Phần trăm"}
                    </span>
                  </td>

                  <td className="px-6 py-5">{item.applyType}</td>

                  <td className="px-6 py-5 font-bold text-blue-600">
                    {item.chargeType === "Fixed"
                      ? formatCurrency(item.amount)
                      : `${item.amount}%`}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isRequired
                          ? "bg-orange-100 text-orange-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {item.isRequired ? "Bắt buộc" : "Tùy chọn"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ${
                        item.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditing(item);

                          setForm({
                            name: item.name,
                            description: item.description,
                            chargeType: item.chargeType,
                            applyType: item.applyType,
                            amount: item.amount,
                            isRequired: item.isRequired,
                            isActive: item.isActive,
                          });

                          setOpen(true);
                        }}
                        className="
                        p-2
                        rounded-xl
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-800
                        transition
                      "
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>

                      <button
                        className="
                        p-2
                        rounded-xl
                        hover:bg-red-50
                        dark:hover:bg-red-500/10
                        transition
                      "
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {surcharges.length === 0 && (
            <div className="py-12 text-center text-zinc-500">
              Chưa có phụ thu nào.
            </div>
          )}
        </div>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Cập nhật phụ thu" : "Thêm phụ thu"}
            </DialogTitle>
            <DialogDescription>
              Nhập thông tin phụ thu khách sạn.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label>Tên phụ thu</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại phụ thu</Label>

                <Select
                  value={form.chargeType}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      chargeType: value as "Fixed" | "Percent",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Fixed">Cố định</SelectItem>

                    <SelectItem value="Percent">Phần trăm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Áp dụng</Label>

                <Select
                  value={form.applyType}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      applyType: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Booking">Booking</SelectItem>

                    <SelectItem value="Room">Phòng</SelectItem>

                    <SelectItem value="Night">Theo đêm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Giá trị</Label>

              <Input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Bắt buộc</p>
                <p className="text-sm text-muted-foreground">
                  Khách bắt buộc phải thanh toán khoản phụ thu này.
                </p>
              </div>

              <Switch
                checked={form.isRequired}
                onCheckedChange={(checked) =>
                  setForm({
                    ...form,
                    isRequired: checked,
                  })
                }
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-zinc-300 dark:data-[state=unchecked]:bg-zinc-600"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Đang hoạt động</p>
                <p className="text-sm text-muted-foreground">
                  Cho phép áp dụng phụ thu này.
                </p>
              </div>

              <Switch
                checked={form.isActive}
                onCheckedChange={(checked) =>
                  setForm({
                    ...form,
                    isActive: checked,
                  })
                }
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-zinc-300 dark:data-[state=unchecked]:bg-zinc-600"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>

            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? "Đang lưu..." : editing ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
