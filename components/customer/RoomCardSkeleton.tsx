export default function RoomCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      <div className="grid lg:grid-cols-[280px_1fr_220px]">
        {/* Image + amenities */}
        <div className="p-4">
          <div className="relative aspect-[1.35] overflow-hidden rounded-sm bg-muted animate-pulse" />

          {/* Amenities */}
          <div className="mt-4">
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
                  <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Room info */}
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div>
            {/* Name */}
            <div className="h-7 w-56 rounded bg-muted animate-pulse" />

            {/* Meta */}
            <div className="mt-3 h-4 w-64 rounded bg-muted animate-pulse" />

            {/* Description */}
            <div className="mt-5 space-y-2">
              <div className="h-3.5 w-full max-w-xl rounded bg-muted animate-pulse" />
              <div className="h-3.5 w-5/6 max-w-xl rounded bg-muted animate-pulse" />
              <div className="h-3.5 w-2/3 max-w-xl rounded bg-muted animate-pulse" />
            </div>
          </div>

          {/* Room information */}
          <div className="grid grid-cols-2 gap-3 rounded-sm bg-muted/60 p-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                <div className="h-3.5 w-16 rounded bg-muted animate-pulse" />
                <div className="h-3.5 w-20 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>

          {/* Policies */}
          <div className="space-y-2">
            <div className="h-4 w-36 rounded bg-muted animate-pulse" />
            <div className="h-4 w-48 rounded bg-muted animate-pulse" />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col justify-between gap-5 border-t border-border p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div>
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />

            <div className="mt-2 h-7 w-32 rounded bg-muted animate-pulse" />

            <div className="mt-2 h-3 w-36 rounded bg-muted animate-pulse" />

            <div className="mt-4 flex items-center gap-2">
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
              <div className="h-6 w-12 rounded-full bg-muted animate-pulse" />
            </div>
          </div>

          <div>
            {/* Available */}
            <div className="mb-3 h-4 w-24 rounded bg-muted animate-pulse" />

            {/* Select button */}
            <div className="h-11 w-full rounded-sm bg-muted animate-pulse" />

            {/* Detail button */}
            <div className="mt-3 h-11 w-full rounded-sm bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  );
}