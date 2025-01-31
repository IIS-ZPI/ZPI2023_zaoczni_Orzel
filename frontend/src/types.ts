export type Currency = "DKK" | "EUR" | "USD" | "PLN";

export type HistogramData = {
  values: number[];
  labels: number[];
};

export type LineChartData = {
  values: number[];
  labels: string[];
};

export type Statistics = {
  increasingTrends: number;
  decreasingTrends: number;
  stableTrends: number;
  median: number;
  coeffOfVariation: number;
  standardDeviation: number;
  dominant: number | number[] | null;
};

export type ReportData = {
  baseCurrency: Currency;
  quoteCurrency: Currency;
  startDate: string;
  endDate: string;
  trendChangesHistogram: HistogramData;
  currencyExchangeRateHistory: LineChartData;
  statistics: Statistics;
};

export type ReportConfig = {
  baseCurrency: Currency;
  quoteCurrency: Currency;
  startDate: Date;
  endDate: Date;
};
