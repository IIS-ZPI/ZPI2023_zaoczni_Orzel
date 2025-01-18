import "./App.css";
import Container from "./components/Container";
import AnalysisForm from "./components/AnalysisForm";
import AppHeader from "./components/AppHeader";
import AppTitle from "./components/AppTitle";
import AnalysisReport from "./components/AnalysysReport";

function App() {
  return (
    <Container>
      <AppHeader>
        <AppTitle>Currency Analysis Reports</AppTitle>
      </AppHeader>
      <AnalysisForm />
      <AnalysisReport />
    </Container>
  );
}

export default App;
