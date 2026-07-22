'use client';

import { useState } from 'react';
import { Camera, MapPin, Pencil, Star, X } from 'lucide-react';
import { hotelService } from '@/services/hotel.service';
import toast from 'react-hot-toast';
import { Hotel } from '@/types/hotel';

interface Props {
  hotel: Hotel
}

export default function HotelHeader({ hotel }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: hotel.name,
    banner: hotel.banner,
    address: hotel.address,
    star: hotel.star,
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'star' ? Number(value) : value
    }));
  };


  const handleUpdate = async () => {
    try {
      setLoading(true);

      hotelService.updateHotelByManager(form);
      // thành công đóng modal
      setOpen(false);
      toast.success("Đã cập nhật")
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật")
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <section className="relative overflow-hidden rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800">

        <div className="relative h-[320px]">

          <img
            src={hotel.banner}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />


          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


          <button
            className="
              absolute top-5 right-5
              flex items-center gap-2
              rounded-2xl
              bg-white/15
              backdrop-blur-xl
              border border-white/20
              px-4 py-2
              text-xs font-semibold text-white
              hover:bg-white/25
            "
          >
            <Camera className="h-4 w-4" />
            Đổi ảnh bìa
          </button>



          <div className="absolute bottom-0 left-0 right-0 p-8">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

              <div>

                <span className="
                  inline-flex rounded-full
                  bg-blue-500/20
                  border border-blue-400/30
                  px-3 py-1
                  text-xs font-semibold text-blue-100
                ">
                  {hotel.brandName}
                </span>


                <h1 className="mt-3 text-4xl font-black text-white">
                  {hotel.name}
                </h1>


                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4"/>
                    {hotel.address}
                  </div>


                  <div className="flex items-center gap-1">

                    {Array.from({
                      length: hotel.star
                    }).map((_, index)=>(
                      <Star
                        key={index}
                        className="
                          h-4 w-4
                          fill-yellow-400
                          text-yellow-400
                        "
                      />
                    ))}

                  </div>

                </div>

              </div>



              <button
                onClick={()=>setOpen(true)}
                className="
                  flex items-center gap-2
                  rounded-2xl
                  bg-blue-600
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  hover:bg-blue-700
                "
              >
                <Pencil className="h-4 w-4"/>
                Chỉnh sửa thông tin
              </button>


            </div>

          </div>

        </div>

      </section>



      {/* MODAL */}

      {open && (

        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full max-w-lg
              rounded-3xl
              bg-white
              dark:bg-zinc-900
              p-6
              shadow-xl
            "
          >

            <div className="
              flex justify-between items-center mb-6
            ">
              <h2 className="
                text-xl font-bold
                text-zinc-900 dark:text-white
              ">
                Chỉnh sửa khách sạn
              </h2>


              <button
                onClick={()=>setOpen(false)}
                disabled={loading}
              >
                <X/>
              </button>

            </div>



            <div className="space-y-4">


              <div>
                <label className="text-sm">
                  Tên khách sạn
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="
                    mt-1 w-full rounded-xl
                    border px-4 py-2
                    dark:bg-zinc-800
                  "
                />
              </div>



              <div>
                <label className="text-sm">
                  Banner
                </label>

                <input
                  name="banner"
                  value={form.banner}
                  onChange={handleChange}
                  className="
                    mt-1 w-full rounded-xl
                    border px-4 py-2
                    dark:bg-zinc-800
                  "
                />
              </div>



              <div>
                <label className="text-sm">
                  Địa chỉ
                </label>

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="
                    mt-1 w-full rounded-xl
                    border px-4 py-2
                    dark:bg-zinc-800
                  "
                />
              </div>



              <div>
                <label className="text-sm">
                  Số sao
                </label>

                <input
                  type="number"
                  min={1}
                  max={5}
                  name="star"
                  value={form.star}
                  onChange={handleChange}
                  className="
                    mt-1 w-full rounded-xl
                    border px-4 py-2
                    dark:bg-zinc-800
                  "
                />
              </div>


            </div>



            <div className="
              mt-6 flex justify-end gap-3
            ">


              <button
                onClick={()=>setOpen(false)}
                disabled={loading}
                className="
                  rounded-xl
                  border
                  px-5 py-2
                "
              >
                Hủy
              </button>



              <button
                onClick={handleUpdate}
                disabled={loading}
                className="
                  rounded-xl
                  bg-blue-600
                  px-5 py-2
                  text-white
                  disabled:opacity-50
                "
              >

                {loading 
                  ? "Đang cập nhật..."
                  : "Cập nhật"
                }

              </button>


            </div>


          </div>

        </div>

      )}

    </>
  );
}