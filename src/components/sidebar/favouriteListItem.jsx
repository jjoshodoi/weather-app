import React from "react";

const FavouriteListItem = (props) => {
  const handleClick = () => {
    props.onFavouriteClick(props.favourite);
  };

  return (
    <li>
      <button onClick={handleClick}>{props.favourite}</button>
    </li>
  );
};

export default FavouriteListItem;
