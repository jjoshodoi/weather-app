import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const SearchBar = ({
  update,
  search,
  getUserLocation,
  getSearch,
  handleChange,
  handleSelect,
  address,
}) => {
  return (
    <div>
      {/* <form onSubmit={getSearch} className="Search-form">
        <input
          className="Search-Bar"
          type="text"
          value={search}
          onChange={update}
        />
        <button className="Search-Button" type="submit">
          Search
        </button>
      </form> */}
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                className: "Search-Bar",
                placeholder: "Enter Address ...",
                // className: "location-search-input",
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button onClick={getUserLocation} className="Search-Location">
        Locate
      </button>
    </div>
  );
};

export default SearchBar;
