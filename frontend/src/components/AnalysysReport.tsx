import styled from "styled-components";
import { Card, CardTitle, CardValue } from "./Card";
import { ReportData } from "../types";
import {  CategoryScale  } from "chart.js";
import Chart from "chart.js/auto";
import Histogram from "./Histogram";
import LineChart from "./LineChart";
Chart.register(CategoryScale);

const AnalysysReportWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 25px;
  padding-top: 10px;
`;


type AnalysisReportProps = { 
  data: ReportData;
};

const AnalysisReport: React.FC<AnalysisReportProps> = ({ data }) => {
  const totalTrends = data.statistics.increasingTrends + data.statistics.decreasingTrends + data.statistics.stableTrends;
  const { statistics } = data;

  

  return (
    <AnalysysReportWrapper>
      <Card $gridColumn="1 / span 1" $gridRow="1 / span 1">
        <CardTitle>Increasing trend</CardTitle>
        <CardValue>
          <span>{statistics.increasingTrends}</span>
          <span>/{totalTrends}</span>
        </CardValue>
      </Card>

      <Card $gridColumn="2 / span 1" $gridRow="1 / span 1">
        <CardTitle>Median</CardTitle>
        <CardValue>
          <span>{statistics.median}</span>
        </CardValue>
      </Card>

      <Card $gridColumn="1 / span 1" $gridRow="2 / span 1">
        <CardTitle>Decreasing trend</CardTitle>
        <CardValue>
          <span>{statistics.decreasingTrends}</span>
          <span>/{totalTrends}</span>
        </CardValue>
      </Card>

      <Card $gridColumn="2 / span 1" $gridRow="2 / span 1">
        <CardTitle>Coefficient of variation</CardTitle>
        <CardValue>
          <span>{statistics.coeffOfVariation}%</span>
        </CardValue>
      </Card>

      <Card $gridColumn="1 / span 1" $gridRow="3 / span 1">
        <CardTitle>Stable trend</CardTitle>
        <CardValue>
          <span>{statistics.stableTrends}</span>
          <span>/{totalTrends}</span>
        </CardValue>
      </Card>

      <Card $gridColumn="2 / span 1" $gridRow="3 / span 1">
        <CardTitle>Standard deviation</CardTitle>
        <CardValue>
          <span>{statistics.standardDeviation}</span>
        </CardValue>
      </Card>

      <Card $gridColumn="1 / span 2" $gridRow="4 / span 1">
        <CardTitle>Dominant</CardTitle>
        <CardValue>
          <span>{statistics.dominant || "-"}</span>
        </CardValue>
      </Card>

      <Card $gridColumn="3 / span 4" $gridRow="1 / span 2"  style={{ alignItems: "center"}}>
        <CardTitle>Histogram of trend changes</CardTitle>
        <Histogram {...data.trendChangesHistogram} />
      </Card>

      <Card $gridColumn="3 / span 4" $gridRow="3 / span 2" style={{ alignItems: "center"}}>
        <CardTitle>{data.baseCurrency}/{data.quoteCurrency} rate</CardTitle> 
        <LineChart {...data.currencyExchangeRateHistory} />
      </Card>
    </AnalysysReportWrapper>
  );
};

export default AnalysisReport;
