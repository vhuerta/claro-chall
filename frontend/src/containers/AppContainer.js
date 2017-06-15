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
    console.log(this.props.seasons);
    return <App {...this.props} />;
  }
});

const mapStateToProps = (state, props) => {
  return {
    seasons: getVisibleSeasons(state, state.filter)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSeasons() {
      dispatch(actions.fetchSeasons());
    }
  };
};

const getAllSeasons = seasons => seasons.allIds.map(id => seasons.byId[id]);
const getAllEpisodes = (ids, episodes) => ids.map(id => episodes.byId[id]);

const getVisibleSeasons = (state, filter) => {
  // TODO: Filter episodes and remove empty seasons
  const allSeasons = getAllSeasons(state.seasons).map(
    s => ((s.episodes = getAllEpisodes(s.episodes, state.episodes)), s)
  );

  return [...allSeasons];
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
