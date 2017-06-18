/**
 * Functional component to render an Episode
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import React from "react";
import PropTypes from "prop-types";

const Episode = ({ episode }) => {
  return (
    <div className="column is-4-tablet is-3-desktop">

      <div className="card episode">
        <div className="card-image">
          <figure className="image">
            <img src={episode.image_still} alt={episode.title_episode} />
            <figcaption>
              {episode.title_episode}
            </figcaption>
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-6">{episode.title_episode}</p>
          <div className="content">
            <p>{episode.description}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired
};

export default Episode;
