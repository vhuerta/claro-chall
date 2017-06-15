import axios from "axios";

const url = "http://localhost:3000/series?gId=";

export const FETCH_SEASONS = "FETCH_SEASONS";

export default {
  fetchSeasons(gid = 544242) {
    return dispatch =>
      dispatch({
        type: FETCH_SEASONS,
        payload: axios.get(url + gid).then(res => res.data)
      });
  }
};
