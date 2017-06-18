/**
 * App actions
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import { fetchData } from "./../util/seasons_util";

export const FETCH_SEASONS = "FETCH_SEASONS";
export const SET_FILTER = "SET_FILTER";

export default {
  fetchSeasons(gid = 544242) {
    return dispatch =>
      dispatch({
        type: FETCH_SEASONS,
        payload: fetchData(gid)
      });
  },
  setFilter(filter) {
    return dispatch =>
      dispatch({
        type: SET_FILTER,
        payload: filter
      });
  }
};
