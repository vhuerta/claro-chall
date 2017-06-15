/**
 * Redux store configuration
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Production and development middleware configurations
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

const middlewares = {
  production: applyMiddleware(thunkMiddleware, promiseMiddleware()),
  development: composeEnhancers(
    applyMiddleware(thunkMiddleware, promiseMiddleware(), loggerMiddleware)
  )
};

export default createStore(
  reducers,
  process.env.NODE_ENV === "production"
    ? middlewares.production
    : middlewares.development
);
