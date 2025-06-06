import { cn } from "libs";

interface SkipCardSkeletonProps {
  className?: string;
}

export function SkipCardSkeleton({ className }: SkipCardSkeletonProps) {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden", className)}>
      {/* Image placeholder */}
      <div className="relative h-64 bg-slate-200 animate-pulse" />

      <div className="p-4 space-y-3">
        {/* Price and hire period */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-24 bg-slate-200 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Location info */}
        <div className="space-y-2 flex justify-between items-center gap-2.5">
          <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
          <div className="h-7 w-20 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
