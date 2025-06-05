import { useQueryStates, parseAsInteger, parseAsString, parseAsBoolean, parseAsArrayOf } from "nuqs";

export const useGlobalUrlQueryParams = () => {
  const [queryParams, setQueryParams] = useQueryStates(
    {
      activePage: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(5),
      skipSize: parseAsArrayOf(parseAsString).withDefault([]),
      minSize: parseAsInteger.withDefault(0),
      maxSize: parseAsInteger.withDefault(0),
      minPrice: parseAsInteger.withDefault(0),
      maxPrice: parseAsInteger.withDefault(0),
      postcode: parseAsString.withDefault(""),
      area: parseAsString.withDefault(""),
      allowedOnRoad: parseAsBoolean.withDefault(false),
      allowsHeavyWaste: parseAsBoolean.withDefault(false),
      hasTransportCost: parseAsBoolean.withDefault(false),
      hasPerTonneCost: parseAsBoolean.withDefault(false),
      createdAtFrom: parseAsString.withDefault(""),
      createdAtTo: parseAsString.withDefault(""),
      updatedAtFrom: parseAsString.withDefault(""),
      updatedAtTo: parseAsString.withDefault(""),
      filterFormOpen: parseAsBoolean.withDefault(true)
    },
    {
      history: "push",
      shallow: false,
    },
  );

  return { queryParams, setQueryParams };
};