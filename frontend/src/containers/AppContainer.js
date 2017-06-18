/**
 * Container component to connect redux store with functional components
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import createReactClass from "create-react-class";

import { filterAllSeasonsFast } from "../util/seasons_util";
import App from "../components/App";
import actions from "../actions";

/**
 * Component than fetch data after mount
 */
const AppContainer = createReactClass({
  componentDidMount() {
    this.props.fetchSeasons();
  },

  render() {
    console.log(this.props);
    return <App {...this.props} />;
  }
});

/**
 * State props for the component
 */
const mapStateToProps = (state, props) => {
  return {
    seasons: state.seasons.byId || {},
    episodes: state.episodes.byId || {},
    visibleSeasons: filterAllSeasonsFast(state.episodes, state.filter) || {}
  };
};

/**
 * Dispatchable props for the component
 */
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
