import { ReportData } from "./types";

export const data: ReportData = {
  baseCurrency: "DKK",
  quoteCurrency: "EUR",
  startDate: "2024-10-20",
  endDate: "2024-10-24",
  trendChangesHistogram: {
    values: [1, 2, 3, 2, 0.3, 2],
    labels: [-1.5, -1, -0.5, 0, 0.5, 1, 1.5],
  },
  currencyExchangeRateHistory: {
    values: [4.5, 4.43, 4.4, 4.5, 4.52],
    labels: [
      "20-10-2024",
      "21-10-2024",
      "22-10-2024",
      "23-10-2024",
      "24-10-2024",
    ],
  },
  statistics: {
    increasingTrend: 2,
    decreasingTrend: 2,
    stableTrends: 0,
    median: 4.4321,
    coeffOfVariation: 0.031,
    standardDeviation: 0.0136,
    dominant: null,
  },
};
