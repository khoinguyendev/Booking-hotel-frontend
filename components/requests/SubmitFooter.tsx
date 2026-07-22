'use client';


import {
  Loader2,
  Send,
  X,
} from 'lucide-react';


interface Props {

  loading?: boolean;

  onCancel: () => void;

  onSubmit: () => void;

  disabled?: boolean;

}


export default function SubmitFooter({

  loading = false,

  onCancel,

  onSubmit,

  disabled = false,

}: Props) {


  return (

    <div
className="
flex
p-6
items-center
justify-end
gap-3

border-t
...
"
>


      {/* Cancel */}

      <button

        type="button"

        onClick={onCancel}

        disabled={loading}

        className="
          flex
          items-center
          gap-2

          rounded-full

          bg-[#E5E5EA]

          px-5
          py-2.5

          text-sm
          font-semibold

          text-[#1C1C1E]

          transition

          hover:bg-[#D1D1D6]

          disabled:cursor-not-allowed
          disabled:opacity-50


          dark:bg-[#2C2C2E]
          dark:text-white
          dark:hover:bg-[#3A3A3C]
        "
      >

        <X size={16}/>

        Hủy

      </button>




      {/* Submit */}

      <button

        type="button"

        onClick={onSubmit}

        disabled={
          loading ||
          disabled
        }

        className="
          flex
          min-w-[130px]
          items-center
          justify-center
          gap-2

          rounded-full

          bg-[#007AFF]

          px-6
          py-2.5

          text-sm
          font-semibold

          text-white

          shadow-sm

          transition


          hover:bg-[#0066CC]


          disabled:cursor-not-allowed

          disabled:opacity-50
        "
      >

        {
          loading
          ?
          (
            <>
              <Loader2
                size={16}
                className="
                  animate-spin
                "
              />

              Đang gửi...
            </>
          )

          :

          (
            <>
              <Send
                size={16}
              />

              Gửi đơn
            </>
          )
        }


      </button>


    </div>

  );
}