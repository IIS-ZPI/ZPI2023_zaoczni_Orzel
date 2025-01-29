import styled from "styled-components";
import { Card, CardTitle, CardValue } from "./Card";
import { ReportData } from "../types";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Histogram from "./Histogram";
import LineChart from "./LineChart";
import CenteredContainer from "./CenteredContainer";
import AppTitle from "./AppTitle";
import Container from "./Container";

Chart.register(CategoryScale);

const AnalysysReportWrapper = styled.div<{ disabled: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 25px;
  padding-top: 10px;
  ${(props) => props.disabled && "opacity: 0.05;  pointer-events: none;"}
`;

const AnalysisReportWarning = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  oapcity: 1;
`;

type AnalysisReportProps = {
  data: ReportData | null;
  isDataValid: boolean;
  isLoading: boolean;
};

const AnalysisReport: React.FC<AnalysisReportProps> = ({
  data,
  isDataValid,
  isLoading,
}) => {
  if (!data) {
    return (
      <CenteredContainer style={{ paddingTop: "48px " }}>
        <AppTitle>
          {isLoading ? "Loading..." : "Provide data and run your analysis"}
        </AppTitle>
      </CenteredContainer>
    );
  }

  const getDominantStr = (value: number | number[] | null) => {
    if (value === null) {
      return "-";
    }
    if (typeof value === "number") {
      return value.toFixed(4);
    }
    let str = "";
    value.forEach((val) => (str += " " + val.toFixed(4)));
    return str;
  };

  const totalTrends =
    data.statistics.increasingTrends +
    data.statistics.decreasingTrends +
    data.statistics.stableTrends;
  const { statistics } = data;

  const showReport = isDataValid && !isLoading;

  return (
    <Container style={{ position: "relative" }}>
      {!showReport && (
        <AnalysisReportWarning>
          <AppTitle>{isLoading ? "Loading..." : "Run analysis again"}</AppTitle>
        </AnalysisReportWarning>
      )}
      <AnalysysReportWrapper disabled={!showReport}>
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
            <span>{statistics.median.toFixed(4)}</span>
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
            <span>{statistics.coeffOfVariation.toFixed(4)}%</span>
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
            <span>{statistics.standardDeviation.toFixed(4)}</span>
          </CardValue>
        </Card>

        <Card $gridColumn="1 / span 2" $gridRow="4 / span 1">
          <CardTitle>Dominant</CardTitle>
          <CardValue>
            <span>{getDominantStr(statistics.dominant)}</span>
          </CardValue>
        </Card>

        <Card
          $gridColumn="3 / span 4"
          $gridRow="1 / span 2"
          style={{ alignItems: "center" }}
        >
          <CardTitle>Histogram of trend changes</CardTitle>
          <Histogram {...data.trendChangesHistogram} />
        </Card>

        <Card
          $gridColumn="3 / span 4"
          $gridRow="3 / span 2"
          style={{ alignItems: "center" }}
        >
          <CardTitle>
            {data.baseCurrency}/{data.quoteCurrency} rate
          </CardTitle>
          <LineChart {...data.currencyExchangeRateHistory} />
        </Card>
      </AnalysysReportWrapper>
    </Container>
  );
};

export default AnalysisReport;
