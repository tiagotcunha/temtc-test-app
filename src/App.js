import "./App.css";
import ScreenLoader from "./pages/screen_loading";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const AppHeader = styled.header`
  background: red;
`;
function App() {
  return (
    <div>
      <Router>
        <AppHeader />
        <Switch>
          <Route exact path="/">
            <ScreenLoader />
          </Route>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
