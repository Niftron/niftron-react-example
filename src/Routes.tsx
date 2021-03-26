import React from "react";
import { Redirect, Route } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Badges from "./pages/MintSwags";
import MySawgs from "./pages/MySwags";

// All the routes in the application are defined here
// define routes like this or set of components and load this component in the App.tsx??

const Routes: React.FC = () => {
  return (
    <>
      <Route key="/" exact path="/" component={Home} />{" "}
      {/* this should be Home.tsx */}
      <Route key="/account" path="/account" component={Account} />
      <Route key="/mintSwags" path="/mintSwags" component={Badges} />
      <Route key="/mySwags" path="/mySwags" component={MySawgs} />

      <Redirect from="/" to="/account" />
    </>
  );
};

export default Routes;
