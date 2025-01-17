import "./App.css";
import Container from "./components/Container";
import AnalysisForm from "./components/AnalysisForm";
import AppHeader from "./components/AppHeader";
import AppTitle from "./components/AppTitle";

function App() {
  return (
    <Container>
      <AppHeader>
        <AppTitle>Currency Analysis Reports</AppTitle>
      </AppHeader>
      <AnalysisForm />
    </Container>
  );
}

export default App;
