/**
 * Empty state component for when no skips match the filters
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-slate-100 p-3 mb-4 size-40">
        <img 
          src="/empty-box.png"
          alt="Empty state"
          className="w-full h-full aspect-auto object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">No skips found</h3>
      <p className="text-slate-600 max-w-sm">
        Try adjusting your filters to see more results. You can modify the size, price range, location, or features.
      </p>
    </div>
  );
}