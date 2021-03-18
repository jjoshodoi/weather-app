import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { IoLocationSharp } from "react-icons/io5";

import { connect } from "react-redux";
import { updateAddress } from "../redux/reducers/search/actions";

const SearchBar = (props, { getUserLocation, address }) => {
  const [tempSearchValue, setTempSearchValue] = useState("");

  // Update the search bar accordingly

  // Runs onSubmit to get the value of search, then resets value
  const getSearch = (e) => {
    e.preventDefault();
    props.dispatch(updateAddress(tempSearchValue));
    // setQuery(address);
    setTempSearchValue("");
  };

  const handleChange = (e) => {
    //temporary store
    // setAddress(e.target.value);
    // updateAddress(e.target.value);
    setTempSearchValue(e.target.value);
  };

  // console.log(props.address);

  return (
    <div className="search-margin">
      <form onSubmit={getSearch} className="Search-form row">
        <div className="column"></div>
        <input
          type="text"
          value={tempSearchValue}
          placeholder="Enter Address..."
          onChange={handleChange}
        ></input>
        <div className="column row-and-column ">
          <div className="column top">
            <IoLocationSharp color="grey" size={35} onClick={getUserLocation} />
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

const mapStateToProps = (state) => {
  return {
    address: state.searchReducer.address,
  };
};

export default connect(mapStateToProps)(SearchBar);
