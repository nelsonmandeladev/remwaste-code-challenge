/**
 * type representing a skip hire option
 */
declare type Skip = {
  /** Unique identifier for the skip */
  readonly id: number;
  /** Size of the skip in cubic yards */
  readonly size: number;
  /** Number of days the skip can be hired for */
  readonly hirePeriodDays: number;
  /** Transport cost in pounds sterling */
  readonly transportCost: number | null;
  /** Cost per tonne in pounds sterling */
  readonly perTonneCost: number | null;
  /** Price before VAT in pounds sterling */
  readonly priceBeforeVat: number;
  /** VAT percentage */
  readonly vat: number;
  /** Postcode where the skip is available */
  readonly postcode: string;
  /** Area where the skip is available */
  readonly area: string;
  /** Whether the skip is forbidden */
  readonly forbidden: boolean;
  /** Creation timestamp */
  readonly createdAt: string;
  /** Last update timestamp */
  readonly updatedAt: string;
  /** Whether the skip is allowed on the road */
  readonly allowedOnRoad: boolean;
  /** Whether the skip allows heavy waste */
  readonly allowsHeavyWaste: boolean;
  /** Whether the skip allows heavy waste */
  readonly imageUrl: string;
};

declare type SkipFilter = {
  size?: number | number[];
  minSize?: number;
  maxSize?: number;
  hirePeriodDays?: number;
  maxPrice?: number;
  minPrice?: number;
  postcode?: string;
  area?: string;
  forbidden?: boolean;
  allowedOnRoad?: boolean;
  allowsHeavyWaste?: boolean;
  hasTransportCost?: boolean;
  hasPerTonneCost?: boolean;
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  updatedAt?: {
    from?: Date;
    to?: Date;
  };
};

declare type SkipFilterResult = {
  skips: Skip[];
  total: number;
  filtered: number;
  appliedFilters: Partial<SkipFilter>;
};

declare type SkipSizeCategory = "small" | "medium" | "large" | "extra-large";

declare type SkipPriceRange = {
  min: number;
  max: number;
  average: number;
};

declare type SkipFilterStats = {
  sizeCategories: Record<SkipSizeCategory, number>;
  priceRange: SkipPriceRange;
  availablePostcodes: string[];
  availableAreas: string[];
};
