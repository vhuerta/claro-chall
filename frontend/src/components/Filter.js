/**
 * Functional component to render the input filter
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

import React from "react";
import PropTypes from "prop-types";

const Filter = ({ handleFilterChange }) => {
  return (
    <div className="column columns">
      <div className="column is-one-third is-offset-one-third">

        <div className="field">
          <p className="control has-icons-right">
            <input
              type="text"
              className="input is-fullwidth"
              onChange={({ target }) => {
                handleFilterChange(target.value);
              }}
              placeholder="Buscar..."
            />
            <span className="icon is-small is-right">
              <i className="fa fa-search" />
            </span>
          </p>
        </div>

      </div>
      <div className="column is-one-third">
        <a
          className="button is-success is-outlined"
          target="__blank"
          href="https://github.com/vhuerta/claro-chall"
        >
          Codigo fuente
        </a>
      </div>
    </div>
  );
};

Filter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired
};

export default Filter;
