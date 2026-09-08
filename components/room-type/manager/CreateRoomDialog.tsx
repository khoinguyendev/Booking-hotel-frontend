"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RoomStatus } from "@/types/room";

const schema = z.object({
  roomNumber: z
    .string()
    .min(1, "Số phòng là bắt buộc.")
    .max(20, "Số phòng tối đa 20 ký tự."),

  floor: z
    .number()
    .min(0, "Tầng không được nhỏ hơn 0.")
    .max(200, "Tầng tối đa là 200."),

  status: z.nativeEnum(RoomStatus),
});

export type CreateRoomFormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRoomFormValues) => void;
}

const roomStatuses = [
  {
    value: RoomStatus.Available,
    label: "Sẵn sàng cho thuê",
  },
  {
    value: RoomStatus.Occupied,
    label: "Đang có khách",
  },
  {
    value: RoomStatus.Reserved,
    label: "Đã được đặt",
  },
  {
    value: RoomStatus.Cleaning,
    label: "Đang dọn phòng",
  },
  {
    value: RoomStatus.Maintenance,
    label: "Đang bảo trì",
  },
  {
    value: RoomStatus.OutOfService,
    label: "Ngừng sử dụng",
  },
];

export default function CreateRoomDialog({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<CreateRoomFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomNumber: "",
      floor: 0,
      status: RoomStatus.Available,
    },
  });

  function handleClose() {
    if (loading) return;

    form.reset();
    onClose();
  }

  function handleSubmit(data: CreateRoomFormValues) {
    onSubmit(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Thêm phòng
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Thêm phòng mới cho loại phòng này.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Số phòng */}
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số phòng{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="VD: 101"
                      maxLength={20}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tầng */}
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tầng{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={200}
                      placeholder="VD: 1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber)
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trạng thái */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Trạng thái{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>

                  <Select
                    value={String(field.value)}
                    onValueChange={(value) =>
                      field.onChange(Number(value))
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {roomStatuses.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={String(status.value)}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Hủy
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Đang thêm..." : "Thêm phòng"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}