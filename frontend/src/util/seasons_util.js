/**
 * Util functions to handle the seasons data
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import axios from "axios";

/**
 * Function used to normalize the response, when data is fetched
 * 
 */
export const normalizePayload = payload => {
  let normalized = {
    episodes: { byId: {}, allIds: [] },
    seasons: { byId: {}, allIds: [] }
  };

  if (payload && payload.response && payload.response.seasons) {
    normalized = payload.response.seasons.reduce((re, s) => {
      re.seasons.byId[s.id] = { ...s };
      re.seasons.allIds.push(s.id);
      re.seasons.byId[s.id].episodes = s.episodes.map(e => {
        e.season = s.id;
        re.episodes.byId[e.id] = { ...e };
        re.episodes.allIds.push(e.id);
        return e.id;
      });
      return re;
    }, normalized);
  }

  return normalized;
};

/**
 * Function than fetch the data from server
 */
export const fetchData = gid => {
  const url = process.env.NODE_ENV === "production"
    ? "https://claro-chall.herokuapp.com/series"
    : "http://localhost:3000/series";
  gid = gid || "?gId=544242";
  return axios.get(url + gid).then(res => res.data);
};

/**
 * Filter all the episodes by name and descriptions
 */
export const filterAllSeasonsFast = (episodes, filter) => {
  let result = {};

  const search = new RegExp(
    filter
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .replace("a", "[áa]")
      .replace("e", "[ée]")
      .replace("i", "[íi]")
      .replace("o", "[óo]")
      .replace("u", "[úu]")
      .replace("A", "[ÁA]")
      .replace("E", "[ÉE]")
      .replace("I", "[ÍI]")
      .replace("O", "[ÓO]")
      .replace("U", "[ÚU]"),
    "gi"
  );

  for (let i = 0, len = episodes.allIds.length; i < len; ++i) {
    const id = episodes.allIds[i];
    const episode = episodes.byId[id];
    if (
      search.test(episode.title_episode) || search.test(episode.description)
      //||search.test(episode.description_large)
    ) {
      result[episode.season] = result[episode.season] || [];
      result[episode.season] = result[episode.season].concat(episode.id);
    }
  }
  return result;
};

/**
 * Cleanest way but not so fast
 * 
 * @deprecated
 */
// export const filterAllSeasons = (seasons, episodes, filter) =>
//   seasons.allIds.reduce((arr, id) => {
//     const season = seasons.byId[id];
//     const search = new RegExp(filter, "gi");
//     season.episodes = season.episodes.reduce((arr, e) => {
//       const episode = episodes.byId[e];
//       return search.test(episode.description) ||
//         search.test(episode.description_large)
//         ? arr.concat(episode)
//         : arr;
//     }, []);
//     return season.episodes.length ? arr.concat(season) : arr;
//   }, []);
