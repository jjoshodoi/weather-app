import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const SearchBar = ({
  getUserLocation,
  getSearch,
  handleChange,
  handleSelect,
  address,
}) => {
  return (
    <div className="">
      <form onSubmit={getSearch} className="Search-form">
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  className: "Search-Bar",
                  placeholder: "Enter Address ...",
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
        <button className="Search-Button" type="submit">
          Search
        </button>
        <button onClick={getUserLocation} className="Search-Location">
          Locate
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
