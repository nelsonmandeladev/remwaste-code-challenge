import { IconArrowRight, IconClock } from "@tabler/icons-react";
import { useGlobalUrlQueryParams } from "hooks";
import { cn } from "libs";
import React from "react";
import { SkipService } from "services";
import { Sheet } from "./ui";

/**
 * Props for the SkipCard component
 */
interface SkipCardProps {
  /** The skip data to display */
  skip: Skip;
}

/**
 * Component that displays a single skip card with its details
 */
export function SkipCard({ skip }: SkipCardProps) {
  const { queryParams, setQueryParams } = useGlobalUrlQueryParams();
  return (
    <React.Fragment>
      <div className="bg-white rounded-lg overflow-hidden group hover:shadow-2xl transform-fill duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={skip.imageUrl}
            alt={`${skip.size} yard skip`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-blue-600/10 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {skip.size} Yard
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              £{SkipService.calculateTotalPrice(skip).toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <IconClock />
              {skip.hirePeriodDays} days hire
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skip.allowedOnRoad && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Road Allowed
              </span>
            )}
            {skip.allowsHeavyWaste && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                Heavy Waste
              </span>
            )}
            {skip.transportCost && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Transport Included
              </span>
            )}
          </div>
          <div className="flex justify-between items-center gap-2.5">
            <div className="text-sm text-gray-600">
              <p>Postcode: {skip.postcode}</p>
              {skip.area && <p>Area: {skip.area}</p>}
            </div>
            <button
              className={cn(
                "flex items-center gap-2.5 text-sm border border-blue-800 rounded-full px-4 py-1 text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-300",
                {
                  "bg-blue-800 text-white":
                    skip.id === queryParams.selectedSkipId,
                },
              )}
              onClick={() =>
                setQueryParams({
                  selectedSkipId:
                    skip.id !== queryParams.selectedSkipId ? skip.id : 0,
                })
              }
            >
              Select <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
