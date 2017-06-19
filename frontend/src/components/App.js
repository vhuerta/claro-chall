/**
 * Functional component to render the app
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import React from "react";
import PropTypes from "prop-types";

import Filter from "./Filter";
import Season from "./Season";

const App = ({ seasons, episodes, visibleSeasons, handleFilterChange }) => {
  const sortedSeasons = visibleSeasons =>
    Object.keys(visibleSeasons).sort(
      (id1, id2) => +seasons[id1].number - +seasons[id2].number
    );

  const renderSeasons = visibleSeasons =>
    (Object.keys(visibleSeasons).length
      ? sortedSeasons(visibleSeasons).map(id => (
          <div className="section" key={id}>
            <Season
              season={seasons[id]}
              episodes={episodes}
              episodesIds={visibleSeasons[id]}
            />
          </div>
        ))
      : <div className="section">
          <div className="notification is-warning">
            No se encontraron resultados
          </div>
        </div>);

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      {renderSeasons(visibleSeasons)}
    </div>
  );
};

App.propTypes = {
  seasons: PropTypes.object.isRequired,
  episodes: PropTypes.object.isRequired,
  visibleSeasons: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default App;
