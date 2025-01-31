import api from "./instance";
import { ReportConfig, ReportData } from "../types";

export const fetchReport = async (data: ReportConfig) => {
  return await api.post<ReportData>(`/currency/exchange-rate`, {
    baseCurrency: data.baseCurrency,
    quoteCurrency: data.quoteCurrency,
    startDate: data.startDate.toISOString().split("T")[0],
    endDate: data.endDate.toISOString().split("T")[0],
  });
};
