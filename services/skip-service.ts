export class SkipService {
  private static readonly SIZE_CATEGORIES: Record<SkipSizeCategory, { min: number; max: number }> = {
    small: { min: 0, max: 6 },
    medium: { min: 7, max: 12 },
    large: { min: 13, max: 20 },
    'extra-large': { min: 21, max: Infinity }
  };

  /**
   * Filters skips based on provided criteria
   */
  public static filterSkips(skips: Skip[], filter: SkipFilter): SkipFilterResult {
    const filteredSkips = skips.filter(skip => this.matchesFilter(skip, filter));
    
    return {
      skips: filteredSkips,
      total: skips.length,
      filtered: filteredSkips.length,
      appliedFilters: filter
    };
  }

  /**
   * Gets statistics about available skips
   */
  public static getFilterStats(skips: Skip[]): SkipFilterStats {
    return {
      sizeCategories: this.getSizeCategoryCounts(skips),
      priceRange: this.calculatePriceRange(skips),
      availablePostcodes: [...new Set(skips.map(skip => skip.postcode))],
      availableAreas: [...new Set(skips.map(skip => skip.area).filter(Boolean))]
    };
  }

  /**
   * Gets the size category for a given skip size
   */
  public static getSizeCategory(size: number): SkipSizeCategory {
    for (const [category, range] of Object.entries(this.SIZE_CATEGORIES)) {
      if (size >= range.min && size <= range.max) {
        return category as SkipSizeCategory;
      }
    }
    return 'extra-large';
  }

  /**
   * Calculates the total price including VAT for a skip
   */
  public static calculateTotalPrice(skip: Skip): number {
    return skip.priceBeforeVat * (1 + skip.vat / 100);
  }

  private static matchesFilter(skip: Skip, filter: SkipFilter): boolean {
    if (filter.size !== undefined) {
      const sizes = Array.isArray(filter.size) ? filter.size : [filter.size];
      if (!sizes.includes(skip.size)) return false;
    }

    if (filter.minSize !== undefined && skip.size < filter.minSize) return false;
    if (filter.maxSize !== undefined && skip.size > filter.maxSize) return false;
    if (filter.hirePeriodDays !== undefined && skip.hirePeriodDays !== filter.hirePeriodDays) return false;

    const totalPrice = this.calculateTotalPrice(skip);
    if (filter.minPrice !== undefined && totalPrice < filter.minPrice) return false;
    if (filter.maxPrice !== undefined && totalPrice > filter.maxPrice) return false;

    if (filter.postcode !== undefined && skip.postcode !== filter.postcode) return false;
    if (filter.area !== undefined && skip.area !== filter.area) return false;
    if (filter.forbidden !== undefined && skip.forbidden !== filter.forbidden) return false;
    if (filter.allowedOnRoad !== undefined && skip.allowedOnRoad !== filter.allowedOnRoad) return false;
    if (filter.allowsHeavyWaste !== undefined && skip.allowsHeavyWaste !== filter.allowsHeavyWaste) return false;

    if (filter.hasTransportCost !== undefined) {
      if (filter.hasTransportCost && skip.transportCost === null) return false;
      if (!filter.hasTransportCost && skip.transportCost !== null) return false;
    }

    if (filter.hasPerTonneCost !== undefined) {
      if (filter.hasPerTonneCost && skip.perTonneCost === null) return false;
      if (!filter.hasPerTonneCost && skip.perTonneCost !== null) return false;
    }

    if (filter.createdAt) {
      const createdDate = new Date(skip.createdAt);
      if (filter.createdAt.from && createdDate < filter.createdAt.from) return false;
      if (filter.createdAt.to && createdDate > filter.createdAt.to) return false;
    }

    if (filter.updatedAt) {
      const updatedDate = new Date(skip.updatedAt);
      if (filter.updatedAt.from && updatedDate < filter.updatedAt.from) return false;
      if (filter.updatedAt.to && updatedDate > filter.updatedAt.to) return false;
    }

    return true;
  }

  private static getSizeCategoryCounts(skips: Skip[]): Record<SkipSizeCategory, number> {
    const counts: Record<SkipSizeCategory, number> = {
      small: 0,
      medium: 0,
      large: 0,
      'extra-large': 0
    };

    skips.forEach(skip => {
      const category = this.getSizeCategory(skip.size);
      counts[category]++;
    });

    return counts;
  }

  private static calculatePriceRange(skips: Skip[]): SkipPriceRange {
    if (skips.length === 0) {
      return { min: 0, max: 0, average: 0 };
    }

    const prices = skips.map(skip => this.calculateTotalPrice(skip));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }
} 