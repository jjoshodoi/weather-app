import React, { useState } from "react";

const GoogleDropDown = () => {
  [collection, setCollection] = useState(null);
  [place, setPlace] = useState("");
  [allowCountry, setAllowCountry] = useState("");
  [location, setLocation] = useState("");
  [returnData, setReturnData] = useState({});
  [collectionShow, setCollectionShow] = useState(false);
  [currentCoordinates, setCollectionShow] = useState({});
  [collectionShow, setCollectionShow] = useState(false);
  [currentLocation, setCurrentLocation] = useState("")[
    (liStyle, setLiStyle)
  ] = useState("")[(proxyUrl, setProxyUrl)] = useState("");

  return (
    <form>
      <input        
        className="Search-Bar"
        type="text"
        value={search}
        onChange={update}> </input>
    </form>
  );
};

export default GoogleDropDown;
