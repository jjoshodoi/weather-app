import React from "react";

import { MdFavorite } from "react-icons/md";
import { GrClear } from "react-icons/gr";

import FavouriteListItem from "./favouriteListItem";

const SideBar = (props) => {
  return (
    <div className={props.sidebarEnabled ? "sidenav" : "sidenav-inactive"}>
      <ul>
        <li>
          <button id="goBack" onClick={props.onSidebarClose}>
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

export default SideBar;
