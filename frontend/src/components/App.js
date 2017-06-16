import React from "react";

export default ({ seasons, episodes, visibleSeasons, handleFilterChange }) => {
  const renderSeasons = ss =>
    Object.keys(ss)
      .sort((a, b) => parseInt(seasons[a].number) - parseInt(seasons[b].number))
      .map(renderSeason);

  const renderSeason = (s, index, ss) => (
    <div key={s}>
      {seasons[s].title}
      {renderEpisodes(visibleSeasons[s])}
      <hr />
    </div>
  );

  const renderEpisodes = episodes => (
    <div>
      {episodes.map(renderEpisode)}
    </div>
  );

  const renderEpisode = episode => (
    <div key={episode.id}>
      {episode.title_episode}
    </div>
  );

  let input;

  return (
    <div>
      <input
        ref={n => input = n}
        onChange={() => handleFilterChange(input.value)}
      />
      {renderSeasons(visibleSeasons)}

    </div>
  );
};
