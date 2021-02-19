import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { IoLocationSharp } from "react-icons/io5";

const SearchBar = ({
  getUserLocation,
  getSearch,
  handleChange,
  handleSelect,
  address,
}) => {
  return (
    <div className="search-margin">
      <form onSubmit={getSearch} className="Search-form row">
        <div className="column"></div>
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
            <div className="stretch-bar column-2">
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
        <div className="column row-and-column ">
          <div className="column top">
            <IoLocationSharp size={35} onClick={getUserLocation} />
            <button className="Search-Button top" type="submit">
              Search
            </button>
          </div>
          <div className="column-2"></div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
