export type MockEquipmentRow = {
  id: string;
  equipmentNumber: string;
  type: string;
  model: string;
  serialNumber: string;
  status: string;
  notes: string;
};

export type MockServiceReport = {
  id: string;
  reportNumber: string;
  customer: string;
  serviceDate: string;
  technician: string;
  status: "Open" | "Signed" | "Sent" | "Closed";
  description: string;
  recommendations: string;
  equipment: MockEquipmentRow[];
};

export const serviceReports: MockServiceReport[] = [
  {
    id: "sr-1048",
    reportNumber: "1048",
    customer: "Tal Plastics Manufacturing",
    serviceDate: "2026-06-18",
    technician: "Avi Cohen",
    status: "Signed",
    description:
      "Quarterly compressor maintenance, oil inspection, belt tension check, and controller diagnostics.",
    recommendations:
      "Replace oil separator during the next scheduled service and monitor running hours weekly.",
    equipment: [
      {
        id: "eq-1048-1",
        equipmentNumber: "C-12",
        type: "Screw Compressor",
        model: "Atlas GA 37",
        serialNumber: "GA37-88421",
        status: "Operational",
        notes: "Oil level normal, belts show early wear.",
      },
      {
        id: "eq-1048-2",
        equipmentNumber: "D-04",
        type: "Air Dryer",
        model: "FX 12",
        serialNumber: "FX12-7710",
        status: "Needs follow-up",
        notes: "Condensate drain should be checked next visit.",
      },
    ],
  },
  {
    id: "sr-1049",
    reportNumber: "1049",
    customer: "North Industrial Bakery",
    serviceDate: "2026-06-19",
    technician: "Maya Levi",
    status: "Open",
    description:
      "Emergency visit for pressure drop in production line. Checked intake filter, pressure switch, and leaks.",
    recommendations:
      "Approve replacement pressure switch and schedule leak test for secondary air line.",
    equipment: [
      {
        id: "eq-1049-1",
        equipmentNumber: "C-03",
        type: "Piston Compressor",
        model: "ABAC B7000",
        serialNumber: "B7-55291",
        status: "Limited operation",
        notes: "Pressure switch response is inconsistent.",
      },
    ],
  },
  {
    id: "sr-1050",
    reportNumber: "1050",
    customer: "Galilee Metal Works",
    serviceDate: "2026-06-20",
    technician: "Noam Bar",
    status: "Closed",
    description:
      "Annual preventive maintenance including filter replacement, oil change, and electrical panel inspection.",
    recommendations:
      "System is stable. Continue regular service interval and replace intake filter stock before August.",
    equipment: [
      {
        id: "eq-1050-1",
        equipmentNumber: "C-18",
        type: "Screw Compressor",
        model: "Kaeser SM 15",
        serialNumber: "SM15-11903",
        status: "Operational",
        notes: "Service completed, no abnormal vibration.",
      },
      {
        id: "eq-1050-2",
        equipmentNumber: "T-02",
        type: "Air Tank",
        model: "500L Vertical",
        serialNumber: "T500-445",
        status: "Operational",
        notes: "Safety valve checked.",
      },
    ],
  },
  {
    id: "sr-1051",
    reportNumber: "1051",
    customer: "Haifa Packaging Ltd.",
    serviceDate: "2026-06-21",
    technician: "Avi Cohen",
    status: "Sent",
    description:
      "Service call for high temperature alarm. Cleaned cooler, inspected fan operation, and reset controller alert.",
    recommendations:
      "Improve ventilation around compressor room and clean cooler again in 30 days.",
    equipment: [
      {
        id: "eq-1051-1",
        equipmentNumber: "C-07",
        type: "Screw Compressor",
        model: "Ingersoll Rand R22",
        serialNumber: "IR22-3308",
        status: "Operational",
        notes: "Temperature returned to normal after cooler cleaning.",
      },
    ],
  },
];

export function getServiceReport(id: string) {
  return serviceReports.find((report) => report.id === id);
}
