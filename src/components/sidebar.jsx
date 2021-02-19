import React from "react";

import { MdFavorite } from "react-icons/md";
import { GrClear } from "react-icons/gr";

const SideBar = ({
  sidebar,
  setSideBar,
  favourites,
  handleDropDownClick,
  addToFav,
  clearFavourites,
}) => {
  return (
    <div className={sidebar ? "sidenav" : "sidenav-inactive"}>
      <ul>
        <li>
          <button id="goBack" onClick={() => setSideBar(!sidebar)}>
            {<GrClear />} Close
          </button>
          <button id="title">Favourites</button>
        </li>
        {favourites.map((item) => (
          <li>
            <button onClick={() => handleDropDownClick(item)}>{item}</button>
          </li>
        ))}
        <li>
          <button id="addCity" onClick={addToFav}>
            Add Current City
            <br />
            <MdFavorite className="white-icon" />
          </button>
        </li>
        <li>
          <button id="clearAll" onClick={clearFavourites}>
            Clear All <br />
            <GrClear className="white-icon" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
