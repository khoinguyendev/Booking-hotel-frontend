'use client';

import { FileText, Pencil, ShieldCheck } from 'lucide-react';

interface Props {
  policies: string[];
}

export default function PolicySection({ policies }: Props) {
  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-5">

        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Chính sách khách sạn
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Quy định và chính sách áp dụng
          </p>
        </div>

        <button
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Pencil className="h-4 w-4" />
          
        </button>

      </div>

      {/* Body */}

      <div className="p-6">

        {policies.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-12 text-center">

            <FileText className="h-12 w-12 text-zinc-400" />

            <p className="mt-4 text-sm text-zinc-500">
              Chưa có chính sách nào.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {policies.map((policy, index) => (

              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  border-zinc-200
                  dark:border-zinc-700
                  p-4
                  transition
                  hover:border-blue-300
                  hover:bg-zinc-50
                  dark:hover:bg-zinc-800/40
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    dark:bg-blue-500/10
                  "
                >
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex-1">

                  <h4 className="font-semibold text-zinc-900 dark:text-white">
                    Chính sách {index + 1}
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {policy}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}
