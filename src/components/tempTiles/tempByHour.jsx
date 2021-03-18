import React from "react";
import TempCard from "./tempcard";

const TempByHour = ({ oneCallDataFromApi, kelvinToCelcius, tomorrow }) => {
  // Finds Current Hour
  const currentHour = new Date().getHours();

  // Finds hours from now to 12AM
  const differenceFrom12AM = 24 - currentHour;

  const timeDifference =
    oneCallDataFromApi && oneCallDataFromApi.timezone_offset / 3600;

  // var weatherAttributeForCard = findMainWeatherAttribute(oneCallDataFromApi);
  return (
    <div className="temp-tile">
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              oneCallDataFromApi &&
              oneCallDataFromApi.hourly.slice(0, 24).map((
                hour,
                index //increment with the card
              ) => (
                <TempCard
                  key={index} // Uniquely identify each Card we make
                  indexNum={index}
                  hour={hour}
                  currentHour={currentHour}
                  timeDifference={timeDifference}
                  oneCallDataFromApi={oneCallDataFromApi}
                  kelvinToCelcius={kelvinToCelcius}
                  differenceFrom12AM={differenceFrom12AM}
                  tomorrow={tomorrow}
                />
              ))
            );
          case true:
            return (
              oneCallDataFromApi &&
              oneCallDataFromApi.hourly
                .slice(differenceFrom12AM, differenceFrom12AM + 24)
                .map((
                  hour,
                  index //How many values are we to display
                ) => (
                  <TempCard
                    key={index} // Uniquely identify each Card we make
                    indexNum={index}
                    hour={hour}
                    currentHour={currentHour}
                    timeDifference={timeDifference}
                    oneCallDataFromApi={oneCallDataFromApi}
                    kelvinToCelcius={kelvinToCelcius}
                    differenceFrom12AM={differenceFrom12AM}
                    tomorrow={tomorrow}
                  />
                ))
            );
          default:
            return "Couldnt Generate Temperature Tiles";
        }
      })()}
    </div>
  );
};

export default TempByHour;
