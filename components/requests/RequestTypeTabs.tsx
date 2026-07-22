'use client';

import {
  Coffee,
  RefreshCcw,
  Clock3,
} from 'lucide-react';

import {
  RequestTab,
} from './CreateRequestDialog';


interface Props {
  value: RequestTab;

  onChange: (
    value: RequestTab
  ) => void;
}


const TABS = [
  {
    label: 'Xin nghỉ',
    value: 'leave' as RequestTab,
    icon: Coffee,
  },

  {
    label: 'Đổi ca',
    value: 'shift' as RequestTab,
    icon: RefreshCcw,
  },

  {
    label: 'Tăng ca',
    value: 'overtime' as RequestTab,
    icon: Clock3,
  },
];


export default function RequestTypeTabs({
  value,
  onChange,
}: Props) {


  return (
    <div
      className="
        flex
        w-full
        gap-1
        rounded-full
        bg-[#E5E5EA]
        p-1

        dark:bg-[#2C2C2E]
      "
    >

      {TABS.map((item)=>{

        const Icon = item.icon;

        const active =
          value === item.value;


        return (

          <button

            key={item.value}

            type="button"

            onClick={() =>
              onChange(item.value)
            }

            className={`
              flex
              flex-1
              items-center
              justify-center
              gap-2

              rounded-full

              px-4
              py-2.5

              text-sm
              font-semibold

              transition-colors


              ${
                active
                  ?
                    `
                    bg-white
                    text-[#007AFF]
                    shadow-sm

                    dark:bg-[#1C1C1E]
                    `
                  :
                    `
                    text-[#8E8E93]

                    hover:text-[#1C1C1E]

                    dark:hover:text-white
                    `
              }
            `}
          >

            <Icon
              size={17}
              className={
                active
                ?
                'text-[#007AFF]'
                :
                ''
              }
            />


            <span>
              {item.label}
            </span>


          </button>

        );

      })}

    </div>
  );
}