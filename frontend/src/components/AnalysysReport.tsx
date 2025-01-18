import styled from "styled-components";
import { Card, CardTitle, CardValue } from "./Card";

const AnalysysReportWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 25px;
  padding-top: 10px;
`;

const AnalysisReport: React.FC = () => {
  return (
    <AnalysysReportWrapper>
      <Card gridColumn="1 / span 1" gridRow="1 / span 1">
        <CardTitle>Increasing trend</CardTitle>
        <CardValue>
          <span>2</span>
          <span>/6</span>
        </CardValue>
      </Card>

      <Card gridColumn="2 / span 1" gridRow="1 / span 1">
        <CardTitle>Median</CardTitle>
        <CardValue>
          <span>4,3038</span>
        </CardValue>
      </Card>

      <Card gridColumn="1 / span 1" gridRow="2 / span 1">
        <CardTitle>Decreasing trend</CardTitle>
        <CardValue>
          <span>4</span>
          <span>/6</span>
        </CardValue>
      </Card>

      <Card gridColumn="2 / span 1" gridRow="2 / span 1">
        <CardTitle>Coefficient of variation</CardTitle>
        <CardValue>
          <span>0,031%</span>
        </CardValue>
      </Card>

      <Card gridColumn="1 / span 1" gridRow="3 / span 1">
        <CardTitle>Stable trend</CardTitle>
        <CardValue>
          <span>0</span>
          <span>/6</span>
        </CardValue>
      </Card>

      <Card gridColumn="2 / span 1" gridRow="3 / span 1">
        <CardTitle>Standard deviation</CardTitle>
        <CardValue>
          <span>0,0136</span>
        </CardValue>
      </Card>

      <Card gridColumn="1 / span 2" gridRow="4 / span 1">
        <CardTitle>Determinant</CardTitle>
        <CardValue>
          <span>-</span>
        </CardValue>
      </Card>

      <Card gridColumn="3 / span 4" gridRow="1 / span 2">
        <CardTitle>Histogram of trend changes</CardTitle>
      </Card>

      <Card gridColumn="3 / span 4" gridRow="3 / span 2">
        <CardTitle>EUR/PLN rate</CardTitle>
      </Card>
    </AnalysysReportWrapper>
  );
};

export default AnalysisReport;
