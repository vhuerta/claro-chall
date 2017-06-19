import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppContainer from "./containers/AppContainer";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/:id?" component={AppContainer} />
    </Switch>
  </Router>
);

export default Routes;
