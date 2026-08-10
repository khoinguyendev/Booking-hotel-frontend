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
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

const schema = z.object({
  fullName: z.string().min(2, 'Nhập họ tên'),

  email: z.string().email('Email không hợp lệ'),

  password: z.string().min(6, 'Tối thiểu 6 ký tự'),

  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),

  codeId: z.string().min(1, 'Nhập mã nhân viên'),

   positionId: z.number().min(1, "Chọn chức vụ"),
});

type FormValues = z.infer<typeof schema>;

interface Position {
  id: number;
  name: string;
}

interface Props {
  open: boolean;

  loading?: boolean;

  positions: Position[];

  onClose: () => void;

  onSubmit: (data: FormValues) => void;
}

export default function CreateStaffDialog({
  open,
  loading,
  positions,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      codeId: '',
      positionId: undefined as any,
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>
            Thêm nhân viên
          </DialogTitle>

        </DialogHeader>

        <Form {...form}>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Họ tên
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Nguyễn Văn A"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="abc@gmail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Mật khẩu
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>
                      Số điện thoại
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeId"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel>
                      Mã nhân viên
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />

            </div>

            <FormField
              control={form.control}
              name="positionId"
              render={({ field }) => (
                <FormItem>

                  <FormLabel>
                    Chức vụ
                  </FormLabel>

                  <Select
                    value={
                      field.value
                        ? field.value.toString()
                        : ''
                    }
                    onValueChange={(value) =>
                      field.onChange(Number(value))
                    }
                  >
                    <FormControl>

                      <SelectTrigger>

                        <SelectValue placeholder="Chọn chức vụ" />

                      </SelectTrigger>

                    </FormControl>

                    <SelectContent>

                      {positions.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id.toString()}
                        >
                          {item.name}
                        </SelectItem>
                      ))}

                    </SelectContent>

                  </Select>

                  <FormMessage />

                </FormItem>
              )}
            />

            <DialogFooter>

              <Button
                variant="outline"
                type="button"
                onClick={onClose}
              >
                Hủy
              </Button>

              <Button
                disabled={loading}
                type="submit"
              >
                Thêm nhân viên
              </Button>

            </DialogFooter>

          </form>

        </Form>

      </DialogContent>
    </Dialog>
  );
}