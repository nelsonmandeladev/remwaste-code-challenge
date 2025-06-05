import { useEffect, useState } from "react";
import { ListItemRender, Render } from "./renderers";
import { useGlobalUrlQueryParams } from "hooks";
import { SkipService } from "services";
import { SkipFilterFormSkeleton } from "./skip-filter-form-skeleton";


interface SkipFilterFormProps {
  skips: Skip[];
  onFilterChange?: (filter: SkipFilter) => void;
}

export const SkipFilterForm = ({ skips, onFilterChange }: SkipFilterFormProps) => {
  const { queryParams, setQueryParams } = useGlobalUrlQueryParams();
  const [stats, setStats] = useState<SkipFilterStats | null>(null);

  useEffect(() => {
    setStats(SkipService.getFilterStats(skips));
  }, [skips]);

  const hasActiveFilters = () => {
    return (
      (queryParams.skipSize?.length ?? 0) > 0 ||
      (queryParams.minPrice ?? 0) > 0 ||
      (queryParams.maxPrice ?? 0) > 0 ||
      (queryParams.postcode?.length ?? 0) > 0 ||
      (queryParams.area?.length ?? 0) > 0 ||
      queryParams.allowedOnRoad ||
      queryParams.allowsHeavyWaste ||
      queryParams.hasTransportCost ||
      queryParams.hasPerTonneCost
    );
  };

  const handleSizeChange = (category: string) => {
    console.log({category})

    const currentSizes = queryParams.skipSize || [];
    const newSizes = currentSizes.includes(category)
      ? currentSizes.filter(s => s !== category)
      : [...currentSizes, category];
    setQueryParams({ skipSize: newSizes });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setQueryParams({ minPrice: min, maxPrice: max });
  };

  const handleFeatureToggle = (feature: keyof Pick<SkipFilter, 'allowedOnRoad' | 'allowsHeavyWaste' | 'hasTransportCost' | 'hasPerTonneCost'>) => {
    setQueryParams({ [feature]: !queryParams[feature] });
  };

  const handleLocationChange = (postcode: string, area: string) => {
    setQueryParams({ postcode, area });
  };

  const handleClearFilters = () => {
    setQueryParams({
      skipSize: [],
      minSize: 0,
      maxSize: 0,
      minPrice: 0,
      maxPrice: 0,
      postcode: "",
      area: "",
      allowedOnRoad: false,
      allowsHeavyWaste: false,
      hasTransportCost: false,
      hasPerTonneCost: false,
    });
  };

  return (
    <Render>
      <Render.If isTrue={!!stats}>
        <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-800">Skips filters</h3>
          <Render.If isTrue={hasActiveFilters()}>
          <button
                onClick={handleClearFilters}
                className="px-4 py-0 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Clear Filters
              </button>
          </Render.If>
          </div>
          {/* Size Filter */}
          <div className="space-y-2">
            <h6 className="font-normal text-slate-600">Size</h6>
            <div className="flex flex-wrap gap-2">
              <ListItemRender
                items={Object.entries(stats?.sizeCategories || {})}
                render={([category, count]) => (
                  <button
                    key={category}
                    onClick={() => handleSizeChange(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      queryParams.skipSize?.includes(category) 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category} ({count})
                  </button>
                )}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <h6 className="font-normal text-slate-600">Price Range</h6>
            <div className="flex flex-col gap-2.5">
              <input
                type="number"
                value={queryParams.minPrice || ''}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value), queryParams.maxPrice || 0)}
                placeholder="Min price"
                className="w-full px-3 py-2 border border-slate-500 rounded"
              />
              <input
                type="number"
                value={queryParams.maxPrice || ''}
                onChange={(e) => handlePriceRangeChange(queryParams.minPrice || 0, Number(e.target.value))}
                placeholder="Max price"
                className="w-full px-3 py-2 border border-slate-500 rounded"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <h6 className="font-normal text-slate-600">Location</h6>
            <div className="flex flex-col gap-4">
              <select
                value={queryParams.postcode}
                onChange={(e) => handleLocationChange(e.target.value, queryParams.area)}
                className="px-3 py-2 border rounded border-slate-500 flex-1"
              >
                <option value="">Select Postcode</option>
                <ListItemRender
                  items={stats?.availablePostcodes || []}
                  render={(postcode: string) => (
                    <option key={postcode} value={postcode}>
                      {postcode}
                    </option>
                  )}
                />
              </select>
              <select
                value={queryParams.area}
                onChange={(e) => handleLocationChange(queryParams.postcode, e.target.value)}
                className="px-3 py-2 border rounded border-slate-500 flex-1"
              >
                <option value="">Select Area</option>
                <ListItemRender
                  items={stats?.availableAreas || []}
                  render={(area: string) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  )}
                />
              </select>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h6 className="font-normal text-slate-600">Features</h6>
            <div className="grid grid-cols-1 gap-2.5">
              <ListItemRender
                items={[
                  { key: 'allowedOnRoad', label: 'Allowed on Road' },
                  { key: 'allowsHeavyWaste', label: 'Allows Heavy Waste' },
                  { key: 'hasTransportCost', label: 'Has Transport Cost' },
                  { key: 'hasPerTonneCost', label: 'Has Per Tonne Cost' }
                ]}
                render={({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={queryParams[key as keyof typeof queryParams] as boolean}
                      onChange={() => handleFeatureToggle(key as keyof Pick<SkipFilter, 'allowedOnRoad' | 'allowsHeavyWaste' | 'hasTransportCost' | 'hasPerTonneCost'>)}
                      className="peer border-slate-500 data-[state=checked]:bg-blue-800 data-[state=checked]:text-primary-foreground data-[state=checked]:border-blue-900 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive size-5 shrink-0 rounded-[4px] border transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span className="text-slate-500 text-sm font-normal">{label}</span>
                  </label>
                )}
              />
            </div>
          </div>                    
        </div>
      </Render.If>
      <Render.Else>
        <div className="">
          <SkipFilterFormSkeleton />
        </div>
      </Render.Else>
    </Render>
  );
};
