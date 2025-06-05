import { SKIPS } from "mocks";
import { ListItemRender, Render } from "./renderers";
import { SkipCard } from "./skip-card";
import { cn } from "libs";
import { useGlobalUrlQueryParams } from "hooks";
import { SkipService } from "services";
import { useMemo, useState, useEffect } from "react";
import { SkipCardSkeleton } from "./skip-card-skeleton";
import { EmptyState } from "./empty-state";

/**
 * Component that displays a grid of available skips
 */
export function SkipsList() {
  const { queryParams } = useGlobalUrlQueryParams();
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
  const [filteredSkips, setFilteredSkips] = useState<Skip[]>([]);

  // Convert URL query params to SkipFilter format
  const filter: SkipFilter = useMemo(() => {
    // Map size categories to their corresponding size ranges
    const sizeMap: Record<string, number[]> = {
      'small': [4, 6],
      'medium': [8, 10, 12],
      'large': [14, 16],
      'extra-large': [20, 40]
    };

    const sizes = queryParams.skipSize.length > 0
      ? queryParams.skipSize.flatMap(category => sizeMap[category] || [])
      : undefined;

    return {
      size: sizes,
      minSize: queryParams.minSize > 0 ? queryParams.minSize : undefined,
      maxSize: queryParams.maxSize > 0 ? queryParams.maxSize : undefined,
      minPrice: queryParams.minPrice > 0 ? queryParams.minPrice : undefined,
      maxPrice: queryParams.maxPrice > 0 ? queryParams.maxPrice : undefined,
      postcode: queryParams.postcode || undefined,
      area: queryParams.area || undefined,
      allowedOnRoad: queryParams.allowedOnRoad || undefined,
      allowsHeavyWaste: queryParams.allowsHeavyWaste || undefined,
      hasTransportCost: queryParams.hasTransportCost || undefined,
      hasPerTonneCost: queryParams.hasPerTonneCost || undefined,
    }
  }, [queryParams]);

  // Simulate API call with delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const { skips } = SkipService.filterSkips(SKIPS, filter);
      setFilteredSkips(skips);
      setIsLoading(false);
      setIsInitialLoad(false); // Mark initial load as complete
    }, isInitialLoad ? 0 : 800); // No delay on initial load, 800ms for subsequent loads

    return () => clearTimeout(timer);
  }, [filter, isInitialLoad]);

  // Show loading state during initial load or filter changes
  if (isLoading) {
    return (
      <div className={cn("w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", {
        "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3": queryParams.filterFormOpen
      })}>
        {Array.from({ length: 9 }).map((_, index) => (
          <SkipCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show empty state only after initial load and when there are no results
  if (!isInitialLoad && filteredSkips.length === 0) {
    return <EmptyState />;
  }

  // Show filtered results
  return (
    <div className={cn("w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", {
      "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3": queryParams.filterFormOpen
    })}>
      <ListItemRender
        items={filteredSkips}
        render={(skip) => <SkipCard key={skip.id} skip={skip} />}
      />
    </div>
  );
}
