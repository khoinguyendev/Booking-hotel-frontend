'use client';

import { useEffect } from 'react';
import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { AttendanceRecord } from '@/types/attendance';

const schema = z.object({
  checkInTime: z.string(),

  checkOutTime: z.string(),

  status: z.string(),

  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;

  attendance: AttendanceRecord | null;

  loading?: boolean;

  onClose: () => void;

  onSubmit: (data: FormValues) => void;
}

export default function EditAttendanceDialog({
  open,
  attendance,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      checkInTime: '',

      checkOutTime: '',

      status: 'Present',

      note: '',
    },
  });

  useEffect(() => {
    if (!attendance) return;

    form.reset({
      checkInTime: attendance.checkInTime ?? '',

      checkOutTime: attendance.checkOutTime ?? '',

      status: attendance.status,

      note: attendance.note ?? '',
    });
  }, [attendance, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            Chỉnh sửa chấm công
          </DialogTitle>

        </DialogHeader>

        <div className="mb-4 rounded-xl bg-muted p-4">

          <p className="font-semibold">
            {attendance?.fullName}
          </p>

          <p className="text-sm text-muted-foreground">
            {attendance?.employeeCode}
          </p>

        </div>

        <Form {...form}>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={form.control}
                name="checkInTime"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>
                      Check-in
                    </FormLabel>

                    <FormControl>

                      <Input
                        type="time"
                        {...field}
                      />

                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOutTime"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>
                      Check-out
                    </FormLabel>

                    <FormControl>

                      <Input
                        type="time"
                        {...field}
                      />

                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Trạng thái
                  </FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>

                      <SelectTrigger>

                        <SelectValue />

                      </SelectTrigger>

                    </FormControl>

                    <SelectContent>

                      <SelectItem value="Present">
                        Có mặt
                      </SelectItem>

                      <SelectItem value="Late">
                        Đi trễ
                      </SelectItem>

                      <SelectItem value="Absent">
                        Vắng
                      </SelectItem>

                      <SelectItem value="DayOff">
                        Nghỉ
                      </SelectItem>

                      <SelectItem value="NotCheckIn">
                        Chưa check-in
                      </SelectItem>

                    </SelectContent>

                  </Select>

                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Ghi chú
                  </FormLabel>

                  <FormControl>

                    <Textarea
                      rows={4}
                      placeholder="Nhập ghi chú..."
                      {...field}
                    />

                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            <DialogFooter>

              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Hủy
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                Lưu thay đổi
              </Button>

            </DialogFooter>

          </form>

        </Form>

      </DialogContent>
    </Dialog>
  );
}