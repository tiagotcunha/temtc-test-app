import "./App.css";
import ScreenLoader from "./pages/screen_loading";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import ScreenList from "./pages/screen_list";
import ScreenDetail from "./pages/screen_detail";
const AppHeader = styled.header`
  background: gray;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;
function App() {
  return (
    <div>
      <ThemeProvider>
        <CSSReset />
        <Router>
          <AppHeader>
            <p>Bliss Recruitment</p>
            <p>Tiago Cunha</p>
          </AppHeader>
          <Switch>
            <Route exact path="/">
              <ScreenLoader />
            </Route>
            <Route path="/list">
              <ScreenList />
            </Route>
            <Route path="/question/:id">
              <ScreenDetail />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
