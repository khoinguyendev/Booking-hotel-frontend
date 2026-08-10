'use client';

interface Props {
  rows?: number;
}

export default function StaffSkeleton({
  rows = 8,
}: Props) {
  return (
    <div
      className="
        overflow-hidden

        rounded-3xl

        border
        border-[#E5E5EA]

        bg-white

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <table className="min-w-full">

        <thead className="bg-[#F8F8F8] dark:bg-[#2C2C2E]">

          <tr>

            {Array.from({ length: 10 }).map((_, index) => (
              <th
                key={index}
                className="px-4 py-5"
              >
                <div
                  className="
                    h-4
                    animate-pulse
                    rounded

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {Array.from({ length: rows }).map((_, row) => (
            <tr
              key={row}
              className="
                border-b

                border-[#F2F2F7]

                dark:border-[#2C2C2E]
              "
            >
              {/* Checkbox */}

              <td className="px-4 py-5">
                <div
                  className="
                    h-4
                    w-4

                    animate-pulse

                    rounded

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />
              </td>

              {/* Avatar */}

              <td className="px-4 py-5">

                <div
                  className="
                    h-11
                    w-11

                    animate-pulse

                    rounded-full

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />

              </td>

              {/* Name */}

              <td className="px-4 py-5">

                <div className="space-y-2">

                  <div
                    className="
                      h-4
                      w-40

                      animate-pulse

                      rounded

                      bg-[#E5E5EA]

                      dark:bg-[#3A3A3C]
                    "
                  />

                  <div
                    className="
                      h-3
                      w-56

                      animate-pulse

                      rounded

                      bg-[#F2F2F7]

                      dark:bg-[#2C2C2E]
                    "
                  />

                </div>

              </td>

              {/* Employee code */}

              <td className="px-4 py-5">

                <div
                  className="
                    h-4
                    w-20

                    animate-pulse

                    rounded

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />

              </td>

              {/* Position */}

              <td className="px-4 py-5">

                <div
                  className="
                    h-4
                    w-24

                    animate-pulse

                    rounded

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />

              </td>

              {/* Shift */}

              <td className="px-4 py-5">

                <div
                  className="
                    h-8
                    w-24

                    animate-pulse

                    rounded-full

                    bg-blue-100

                    dark:bg-blue-900/30
                  "
                />

              </td>

              {/* Checkin */}

              <td className="px-4 py-5">

                <div
                  className="
                    mx-auto

                    h-4
                    w-12

                    animate-pulse

                    rounded

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />

              </td>

              {/* Checkout */}

              <td className="px-4 py-5">

                <div
                  className="
                    mx-auto

                    h-4
                    w-12

                    animate-pulse

                    rounded

                    bg-[#E5E5EA]

                    dark:bg-[#3A3A3C]
                  "
                />

              </td>

              {/* Status */}

              <td className="px-4 py-5">

                <div
                  className="
                    mx-auto

                    h-8
                    w-24

                    animate-pulse

                    rounded-full

                    bg-green-100

                    dark:bg-green-900/30
                  "
                />

              </td>

              {/* Actions */}

              <td className="px-4 py-5">

                <div className="flex justify-center gap-2">

                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="
                        h-9
                        w-9

                        animate-pulse

                        rounded-xl

                        bg-[#E5E5EA]

                        dark:bg-[#3A3A3C]
                      "
                    />
                  ))}

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}