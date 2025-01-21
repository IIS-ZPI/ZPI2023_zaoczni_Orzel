import "./App.css";
import Container from "./components/Container";
import AnalysisForm from "./components/AnalysisForm";
import AppHeader from "./components/AppHeader";
import AppTitle from "./components/AppTitle";
import AnalysisReport from "./components/AnalysysReport";
import { data as mockData } from "./mock-data";
import { useState } from "react";
import { ReportConfig, ReportData } from "./types";

function App() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ReportConfig) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setReportData(mockData);
      setIsDataValid(true);
      setIsLoading(false);
    }, 500);
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
      <AnalysisReport
        data={reportData}
        isDataValid={isDataValid}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default App;
