import React from "react";

// Need to revisit these buttons --- May not need them
const GeoButtons = (GEOCODING_API_KEY) => {
  const getGeoLocation = () => {
    const googleData = fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOCODING_API_KEY}`
    );
    // console.log(googleData);
  };

  const getTimeZone = (long, lat) => {
    const timeZoneData = fetch(
      // `https://maps.googleapis.com/maps/api/timezone/json?location=${39.603481},${-119.682251}&timestamp=${1331161200}&key=${GOOGLE_GEOCODING_API_KEY}`
      `https://maps.googleapis.com/maps/api/timezone/json?location=51.5135808,0.0244542&timestamp=1331766000&key=${GEOCODING_API_KEY}`
    );
    // console.log(timeZoneData);
  };

  //   function seconds_since_epoch(d) {
  //     return Math.floor(d / 1000);
  //   }
  return (
    <div>
      <span onClick={getGeoLocation}>GeoLocation</span>
      <span onClick={getTimeZone}>TimeZoneData</span>
    </div>
  );
};

export default GeoButtons;
