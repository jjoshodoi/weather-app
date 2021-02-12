import React, { useState, useEffect } from "react";

const SearchBar = ({
  WEATHER_API_KEY,
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
      <button className="Search-button" type="submit">
        Search
      </button>
      <span onClick={getUserLocation} type="submit">
        LOCATE
      </span>
    </form>
  );
};

export default SearchBar;