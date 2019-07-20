import React from "react";
import Dashboard from "../Components/Dashboard";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={props => <Dashboard {...props} />} />
    </Switch>
  </Router>
);

export default Routes;
