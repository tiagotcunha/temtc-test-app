import "./App.css";
import ScreenLoader from "./pages/screen_loading";
import styled from "styled-components";

const AppHeader = styled.header`
  background: red;
`;
function App() {
  return (
    <div>
      <AppHeader />
      <ScreenLoader />
    </div>
  );
}

export default App;
