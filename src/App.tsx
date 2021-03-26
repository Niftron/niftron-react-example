import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";

function App(props: any) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
