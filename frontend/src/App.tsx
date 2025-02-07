import "./App.css";
import Container from "./components/Container";
import AnalysisForm from "./components/AnalysisForm";
import AppHeader from "./components/AppHeader";
import AppTitle from "./components/AppTitle";
import AnalysisReport from "./components/AnalysysReport";
import { useState } from "react";
import { ReportConfig, ReportData } from "./types";
import { fetchReport } from "./api/reportApi";
import CenteredContainer from "./components/CenteredContainer";

function App() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ReportConfig) => {
    setIsLoading(true);
    const response = await fetchReport(data);
    if (response.data) {
      setReportData(response.data);
      setIsDataValid(true);
    }
    if (response.errorMsg) {
      setError(response.errorMsg);
    } else {
      setError("");
    }
    setIsLoading(false);
  };

  const onChange = () => {
    setIsDataValid(false);
  };

  return (
    <Container>
      <AppHeader>
        <AppTitle>Currency Analysis Reports</AppTitle>
      </AppHeader>
      <AnalysisForm
        onSubmit={onSubmit}
        onChange={onChange}
        isLoading={isLoading}
      />
      {!reportData && (
        <CenteredContainer style={{ paddingTop: "48px " }}>
          <AppTitle>
            {isLoading
              ? "Loading..."
              : error
              ? error
              : "Provide data and run your analysis"}
          </AppTitle>
        </CenteredContainer>
      )}
      {reportData && (
        <AnalysisReport
          data={reportData}
          isDataValid={isDataValid}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
}

export default App;
