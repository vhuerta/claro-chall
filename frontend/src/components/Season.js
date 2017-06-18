/**
 * Functional component to render a Season
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import React from "react";
import PropTypes from "prop-types";

import Episode from "./Episode";

const Season = ({ season, episodes, episodesIds }) => {
  const sortedEpisodes = episodesIds => {
    return episodesIds.sort(
      (id1, id2) =>
        +episodes[id1].episode_number - +episodes[id2].episode_number
    );
  };

  const renderEpisodes = (episodes, episodesIds) =>
    sortedEpisodes(episodesIds).map(eId => (
      <Episode key={eId} episode={episodes[eId]} />
    ));

  return (
    <div className="columns is-multiline season">
      <div className="column is-12">
        <div className="media">
          <div className="media-content">
            <p className="title is-5">{season.title}</p>
          </div>
        </div>
      </div>
      {renderEpisodes(episodes, episodesIds)}
    </div>
  );
};

Season.propTypes = {
  season: PropTypes.object.isRequired,
  episodes: PropTypes.object.isRequired,
  episodesIds: PropTypes.arrayOf(PropTypes.string)
};

export default Season;
