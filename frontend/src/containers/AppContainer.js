import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import createReactClass from "create-react-class";

import App from "../components/App";
import actions from "../actions";

const AppContainer = createReactClass({
  componentDidMount() {
    this.props.fetchSeasons();
  },

  render() {
    return <App {...this.props} />;
  }
});

const mapStateToProps = (state, props) => {
  return {
    seasons: state.seasons.byId,
    episodes: state.episodes.byId,
    visibleSeasons: filterAllSeasonsFast(state.episodes, state.filter)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSeasons() {
      dispatch(actions.fetchSeasons());
    },
    handleFilterChange(filter) {
      dispatch(actions.setFilter(filter));
    }
  };
};

/**
 * Filter all the episodes by name and descriptions
 */
const filterAllSeasonsFast = (episodes, filter) => {
  let result = {};

  const search = new RegExp(
    filter
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
      search.test(episode.title_episode) ||
      search.test(episode.description) ||
      search.test(episode.description_large)
    ) {
      result[episode.season] = result[episode.season] || [];
      result[episode.season] = result[episode.season].concat(episode);
    }
  }
  return result;
};

/**
 * Cleanest way but not so fast
 * 
 * @deprecated
 */
const filterAllSeasons = (seasons, episodes, filter) =>
  seasons.allIds.reduce((arr, id) => {
    const season = seasons.byId[id];
    const search = new RegExp(filter, "gi");
    season.episodes = season.episodes.reduce((arr, e) => {
      const episode = episodes.byId[e];
      return search.test(episode.description) ||
        search.test(episode.description_large)
        ? arr.concat(episode)
        : arr;
    }, []);
    return season.episodes.length ? arr.concat(season) : arr;
  }, []);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
