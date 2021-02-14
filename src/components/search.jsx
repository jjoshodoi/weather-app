import React from "react";

const SearchBar = ({
  update,
  search,
  getUserLocation,
  getSearch,
}) => {
  return (
    <form onSubmit={getSearch} className="Search-form">
      <input
        className="Search-Bar"
        type="text"
        value={search}
        onChange={update}
      />
      <button className="Search-Button" type="submit">
        Search
      </button>
      <button onClick={getUserLocation} className="Search-Location" type="submit">
        Locate
      </button>
    </form>
  );
};

export default SearchBar;
