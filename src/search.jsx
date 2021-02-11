import React, { useEffect, useState } from "react";

const SearchForm = ({ getLocation }) => {
  const [searchText, setSearchText] = useState(() => " ");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
    getLocation(searchText);
  };
  return (
    <form className="Search-form" onSubmit={handleSubmit}>
      <input
        className="Search-Bar"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter City ... e.g. London, Birmingham, Moscow"
      />
      <button onClick={handleSubmit} className="Search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
