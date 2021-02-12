import React from "react";

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
      <input type="image" src="src\Images\sunicon.png"/>  
      <span onClick={getUserLocation} type="submit">
        LOCATE
      </span>
    </form>
  );
};

export default SearchBar;
