import api from "./instance";
import { ReportConfig, ReportData } from "../types";
import { ApiResponse } from "./types";

export const fetchReport = async (
  data: ReportConfig
): Promise<ApiResponse<ReportData>> => {
  try {
    const response = await api.post<ReportData>(`/currency/exchange-rate`, {
      baseCurrency: data.baseCurrency,
      quoteCurrency: data.quoteCurrency,
      startDate: data.startDate.toISOString().split("T")[0],
      endDate: data.endDate.toISOString().split("T")[0],
    });

    if (response.status != 200) {
      return {
        success: false,
        errorMsg: "Server error. Unable to process the request.",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: true,
      errorMsg: "Server is not available",
    };
  }
};
