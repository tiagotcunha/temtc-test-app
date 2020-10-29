import "./App.css";
import { useEffect, useState } from "react";
import ScreenLoader from "./pages/screen_loading";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import ScreenList from "./pages/screen_list";
import ScreenDetail from "./pages/screen_detail";
import { errorInterceptor } from "./api";
import ScreenShare from "./pages/screen_share";
import { useHistory } from "react-router-dom";
import ScreenInternetStatus from "./pages/screen_internet_status";
const AppHeader = styled.header`
  background: gray;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

function Routes() {
  let history = useHistory();
  const [noInternet, setInternet] = useState(false);
  useEffect((e) => {
    errorInterceptor.subscribe((event) => {
      if (event == "noConnection") {
        setInternet(true);
      }
    });
  });
  return noInternet ? (
    <ScreenInternetStatus />
  ) : (
    <div>
      <AppHeader>
        <Link to="/">Bliss Recruitment</Link>
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
        <Route path="/share">
          <ScreenShare />
        </Route>
      </Switch>
    </div>
  );
}
function App() {
  return (
    <div>
      <ThemeProvider>
        <CSSReset />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
