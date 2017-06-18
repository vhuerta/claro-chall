/**
 * App entry point, this file mounts the react APP on the div
 * within id #root
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes";

import "./css/styles.css";
import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";

const Root = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

render(<Root store={store} />, document.getElementById("root"));
