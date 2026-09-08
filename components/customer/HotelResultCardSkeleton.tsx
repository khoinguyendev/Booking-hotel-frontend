export default function HotelResultCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      <div className="grid animate-pulse md:grid-cols-[280px_1fr_190px]">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-muted md:aspect-auto md:min-h-60">
          <div className="absolute left-4 top-4 h-6 w-20 rounded-full bg-muted-foreground/10" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          {/* Title + heart */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="h-7 w-3/4 rounded-md bg-muted" />

              <div className="mt-2 h-4 w-40 rounded bg-muted" />
            </div>

            <div className="size-11 shrink-0 rounded-full bg-muted" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-14 rounded-lg bg-muted" />
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-4 w-28 rounded bg-muted" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-3">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-20 rounded bg-muted" />
          </div>

          {/* Policies */}
          <div className="flex flex-wrap gap-3">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col justify-between gap-4 border-t border-border p-5 md:border-l md:border-t-0">
          <div>
            <div className="h-4 w-8 rounded bg-muted" />

            <div className="mt-2 h-8 w-32 rounded-md bg-muted" />

            <div className="mt-2 h-3 w-28 rounded bg-muted" />
          </div>

          <div className="h-12 w-full rounded-xl bg-muted" />
        </div>
      </div>
    </article>
  );
}