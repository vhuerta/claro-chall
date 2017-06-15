import typeToReducer from "type-to-reducer";

import { FETCH_SEASONS } from "../actions";

export const SET_FILTER = "SET_FILTER";

const initialState = {
  filter: "",
  loading: false,
  episodes: { byId: {}, allIds: [] },
  seasons: { byId: {}, allIds: [] },
  selectedChapter: null
};

const setFilter = (state, { filter }) => ({ ...state, filter });

const fetchSeriesPending = state => {
  return { ...state, loading: true };
};
const fetchSeriesRejected = (state, payload) => {
  return { ...state, loading: false };
};
const fetchSeriesSuccess = (state, { payload }) => {
  let normalized = {
    episodes: { byId: {}, allIds: [] },
    seasons: { byId: {}, allIds: [] }
  };

  if (payload && payload.response && payload.response.seasons) {
    /**
     * Normalize the data
     */
    normalized = payload.response.seasons.reduce((re, s) => {
      re.seasons.byId[s.id] = { ...s };
      re.seasons.allIds.push(s.id);
      re.seasons.byId[s.id].episodes = s.episodes.map(e => {
        re.episodes.byId[e.id] = { ...e };
        re.episodes.allIds.push(e.id);
        return e.id;
      });
      return re;
    }, normalized);
  }

  return { ...state, loading: false, ...normalized };
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
