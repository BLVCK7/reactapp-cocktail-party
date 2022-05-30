import React from 'react';

import searchSVG from '../../assets/img/search.svg';
import cancelSVG from '../../assets/img/cancel.svg';

const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <img className="search-icon" src={searchSVG} alt="search" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Название милкшейка..."
        autoComplete="off"
      />
      {search && (
        <img onClick={() => setSearch('')} className="cancel-icon" src={cancelSVG} alt="cancel" />
      )}
    </div>
  );
};

export default Search;
