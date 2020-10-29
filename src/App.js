import "./App.css";
import ScreenLoader from "./pages/screen_loading";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import ScreenList from "./pages/screen_list";
import ScreenDetail from "./pages/screen_detail";
const AppHeader = styled.header`
  background: red;
`;
function App() {
  return (
    <div>
      <ThemeProvider >
        <CSSReset />
        <Router>
          <AppHeader />
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
