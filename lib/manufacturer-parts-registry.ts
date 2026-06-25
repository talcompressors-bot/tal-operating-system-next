import registryRows from "../data-sources/vendor-spare-parts/generated/manufacturer-parts-registry.sample.json";

export type ManufacturerServiceInterval = {
  interval: string;
  quantity: number | null;
  rawValue: string;
};

export type ManufacturerExchangeTimes = {
  first: string | null;
  second: string | null;
};

export type ManufacturerPartRegistryRow = {
  manufacturer: string;
  series: string;
  model: string;
  normalizedModel: string;
  partCategory: string;
  manufacturerSku: string;
  manufacturerPartName: string;
  hebrewDescription: string | null;
  englishDescription: string;
  specification: string;
  unit: string;
  ratedQuantity: number | null;
  quotationUsd: number | null;
  serviceIntervals: ManufacturerServiceInterval[];
  exchangeTimes: ManufacturerExchangeTimes;
  remarks: string;
  extraColumns: Record<string, string>;
  sourceFile: string;
  sourceSheet: string;
  sourceRow: number;
  active: boolean;
  reviewStatus: string;
};

export const manufacturerPartRegistryRows =
  registryRows as unknown as ManufacturerPartRegistryRow[];
