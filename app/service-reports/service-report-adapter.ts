import { getServiceReport, serviceReports } from "./mock-data";

export function getServiceReportList() {
  return serviceReports;
}

export function getServiceReportById(id: string) {
  return getServiceReport(id);
}

export function getServiceReportStaticParams() {
  return serviceReports.map((report) => ({
    id: report.id,
  }));
}
