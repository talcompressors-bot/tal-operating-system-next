export type ManufacturerPartRegistryRow = {
  manufacturer: string;
  sourceFile: string;
  sourceSheet: string;
  manufacturerSku: string;
  partCategory: string;
  sourceRow: number;
  sourceDescription: string;
  compatibleModels: string[];
  keywords: string[];
};

const PM_SERIES_SOURCE_FILE =
  "data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls";

export const manufacturerPartRegistryRows: ManufacturerPartRegistryRow[] = [
  {
    manufacturer: "SCR",
    sourceFile: PM_SERIES_SOURCE_FILE,
    sourceSheet: "40PM",
    manufacturerSku: "25100043-071",
    partCategory: "AIR_FILTER",
    sourceRow: 6,
    sourceDescription: "air filter core",
    compatibleModels: ["40PM", "SCR-40PM", "SCR40PM"],
    keywords: ["air filter", "airfilter"],
  },
  {
    manufacturer: "SCR",
    sourceFile: PM_SERIES_SOURCE_FILE,
    sourceSheet: "40PM",
    manufacturerSku: "25200007-005",
    partCategory: "OIL_FILTER",
    sourceRow: 7,
    sourceDescription: "Oil Filter",
    compatibleModels: ["40PM", "SCR-40PM", "SCR40PM"],
    keywords: ["oil filter", "oilfilter"],
  },
  {
    manufacturer: "SCR",
    sourceFile: PM_SERIES_SOURCE_FILE,
    sourceSheet: "40PM",
    manufacturerSku: "25300045-023",
    partCategory: "OIL_SEPARATOR",
    sourceRow: 8,
    sourceDescription: "oil separator",
    compatibleModels: ["40PM", "SCR-40PM", "SCR40PM"],
    keywords: ["oil separator", "separator"],
  },
  {
    manufacturer: "SCR",
    sourceFile: PM_SERIES_SOURCE_FILE,
    sourceSheet: "40PM",
    manufacturerSku: "80000175-039",
    partCategory: "OIL_COOLANT",
    sourceRow: 9,
    sourceDescription: "Coolant",
    compatibleModels: ["40PM", "SCR-40PM", "SCR40PM"],
    keywords: ["coolant", "oil top-up", "oil top up", "skr oil", "3l skr", "oil"],
  },
];
