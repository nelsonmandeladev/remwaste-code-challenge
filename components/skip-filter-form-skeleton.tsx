import { cn } from "libs";

interface SkipFilterFormSkeletonProps {
  className?: string;
}

export function SkipFilterFormSkeleton({ className }: SkipFilterFormSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center gap-4">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Size Filter Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-slate-200 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Price Range Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
        <div className="flex flex-col gap-2.5">
          <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Location Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Features Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 