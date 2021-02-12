import React, { useState, useEffect } from "react";

const SearchBar = ({ API_KEY }) => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London");

  useEffect(() => {
    getLocation();
  }, [query]);

  const getLocation = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
    );
    const data = await response.json();
    setLocations(data.hits);
    console.log(query, data);
  };
  // Calls the API key and allows you call certain data.
  // Add parameters we need to call such as temp, day, sunny/rainy
  const update = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

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
    </form>
  );
};

export default SearchBar;
