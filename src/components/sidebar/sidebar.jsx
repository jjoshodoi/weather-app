import { toggle } from "../../redux/reducers/sidebar/actions";

import React from "react";
import { connect } from "react-redux";

import { MdFavorite } from "react-icons/md";
import { GrClear } from "react-icons/gr";

import FavouriteListItem from "./favouriteListItem";

const SideBar = (props) => {
  const toggleSidebar = () => {
    props.dispatch(toggle());
  };

  return (
    <div className={props.isSideOpen ? "sidenav" : "sidenav-inactive"}>
      <ul>
        <li>
          <button id="goBack" onClick={toggleSidebar}>
            {<GrClear />} Close
          </button>
          <button id="title">Favourites</button>
        </li>
        {props.favourites.map((favourite) => (
          <FavouriteListItem
            key={favourite}
            favourite={favourite}
            onFavouriteClick={props.onFavouriteClick}
          />
        ))}
        <li>
          <button id="addCity" onClick={props.onAddToFavouriteClick}>
            Add Current City
            <br />
            <MdFavorite className="white-icon" />
          </button>
        </li>
        <li>
          <button id="clearAll" onClick={props.onClearFavourites}>
            Clear All <br />
            <GrClear className="white-icon" />
          </button>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favs: state.sidebarReducer.localData,
    isSideOpen: state.sidebarReducer.isSideOpen,
  };
};

export default connect(mapStateToProps)(SideBar);
