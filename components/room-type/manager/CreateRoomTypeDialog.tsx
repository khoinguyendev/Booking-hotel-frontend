'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

const schema = z.object({
  name: z
    .string()
    .min(1, 'Tên loại phòng là bắt buộc.')
    .max(100, 'Tên loại phòng tối đa 100 ký tự.'),

  maxGuest: z
    .number()
    .min(1, 'Số khách tối đa phải ít nhất là 1.')
    .max(20, 'Số khách tối đa là 20.'),

  bedType: z
    .string()
    .min(1, 'Loại giường là bắt buộc.')
    .max(100, 'Loại giường tối đa 100 ký tự.'),

  roomSize: z
    .number()
    .min(1, 'Diện tích phải lớn hơn 0.')
    .max(1000, 'Diện tích tối đa là 1000 m².'),

  basePrice: z
    .number()
    .min(1, 'Giá phòng phải lớn hơn 0.')
    .max(100000000, 'Giá phòng quá lớn.'),

  description: z.string().optional(),

  images: z.string().optional(),
});


export type CreateRoomTypeFormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRoomTypeFormValues) => void;
}

export default function CreateRoomTypeDialog({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<CreateRoomTypeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      maxGuest: 2,
      bedType: '',
      roomSize: 20,
      basePrice: 0,
      description: '',
      images: '',
    },
  });

  function handleClose() {
    if (loading) return;

    form.reset();
    onClose();
  }

  function handleSubmit(data: CreateRoomTypeFormValues) {
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Tạo loại phòng
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Thêm một loại phòng mới cho khách sạn.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Tên + số khách */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tên loại phòng <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="VD: Deluxe Double"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxGuest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Số khách tối đa{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        placeholder="VD: 2"
                        {...field}
                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Giường + diện tích */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="bedType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Loại giường <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="VD: 1 giường đôi"
                        {...field}
                        
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Diện tích (m²)
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={1000}
                        step="0.1"
                        placeholder="VD: 25"
                        {...field}
                         onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Giá */}
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Giá cơ bản / đêm{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={100000000}
                      placeholder="VD: 800000"
                      {...field}
                       onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>

                  <p className="text-xs text-muted-foreground">
                    Đơn vị: VNĐ / đêm
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mô tả */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Mô tả về loại phòng, tiện nghi, không gian..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Nhập URL hình ảnh, phân tách bằng dấu phẩy..."
                      {...field}
                    />
                  </FormControl>

                  <p className="text-xs text-muted-foreground">
                    Có thể nhập nhiều URL, phân tách bằng dấu phẩy.
                  </p>

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
                {loading ? 'Đang tạo...' : 'Tạo loại phòng'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
