/**
 * App reducers
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import typeToReducer from "type-to-reducer";
import { normalizePayload } from "./../util/seasons_util";

import { FETCH_SEASONS, SET_FILTER } from "../actions";

const initialState = {
  filter: "",
  loading: false,
  episodes: { byId: {}, allIds: [] },
  seasons: { byId: {}, allIds: [] }
};

/**
 * Sets the filter to redux store
 */
const setFilter = (state, { payload }) => ({ ...state, filter: payload });

/**
 * Called when fetch seasons starts
 */
const fetchSeriesPending = state => {
  return { ...state, loading: true };
};

/**
 * Called when fetch seasons fails
 */
const fetchSeriesRejected = (state, payload) => {
  return { ...state, loading: false };
};

/**
 * Called when fetch seasons success
 */
const fetchSeriesSuccess = (state, { payload }) => {
  return { ...state, loading: false, ...normalizePayload(payload) };
};

const SeriesReducers = typeToReducer(
  {
    [SET_FILTER]: setFilter,
    [FETCH_SEASONS]: {
      PENDING: fetchSeriesPending,
      REJECTED: fetchSeriesRejected,
      FULFILLED: fetchSeriesSuccess
    }
  },
  initialState
);

export default SeriesReducers;
