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
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";
import store from "./store";
import Routes from "./routes";

const Root = ({ store }) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Routes />
    </I18nextProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

render(<Root store={store} />, document.getElementById("root"));
