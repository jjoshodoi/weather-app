import React from "react";

const DisplayTemp = ({
  kelvinToCelcius,
  oneCallDataFromApi,
  cwDataFromApi,
  tomorrow,
}) => {
  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              <div>
                <h1>{`${kelvinToCelcius(
                  oneCallDataFromApi && oneCallDataFromApi.current.temp
                )} °C`}</h1>
                <h4>{`Feels Like ${kelvinToCelcius(
                  oneCallDataFromApi && oneCallDataFromApi.current.feels_like
                )}°C`}</h4>
              </div>
            );
          default:
            return (
              <div className="time-of-day-tile">
                <div className="tile-border">
                  <div>Morning</div>
                  <div>
                    {`${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].temp.morn
                    )} °C`}
                    <h5>{`Feels Like ${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].feels_like.morn
                    )}°C`}</h5>
                  </div>
                </div>
                <div className="tile-border">
                  <div>Afternoon</div>
                  <div>
                    {`${kelvinToCelcius(
                      oneCallDataFromApi && oneCallDataFromApi.daily[1].temp.day
                    )} °C`}
                  </div>
                  <h5>{`Feels Like ${kelvinToCelcius(
                    oneCallDataFromApi &&
                      oneCallDataFromApi.daily[1].feels_like.day
                  )}°C`}</h5>
                </div>
                <div className="tile-border">
                  <div>Evening</div>
                  <div>
                    {`${kelvinToCelcius(
                      oneCallDataFromApi && oneCallDataFromApi.daily[1].temp.eve
                    )} °C`}
                  </div>
                  <h5>{`Feels Like ${kelvinToCelcius(
                    oneCallDataFromApi &&
                      oneCallDataFromApi.daily[1].feels_like.eve
                  )}°C`}</h5>
                </div>
                <div className="tile-border">
                  <div>Night</div>
                  <div>
                    {`${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].temp.night
                    )} °C`}
                  </div>
                  <h5>{`Feels Like ${kelvinToCelcius(
                    oneCallDataFromApi &&
                      oneCallDataFromApi.daily[1].feels_like.night
                  )}°C`}</h5>
                </div>
              </div>
            );
        }
      })()}
      <h3>
        {cwDataFromApi && cwDataFromApi.name},{" "}
        {cwDataFromApi && cwDataFromApi.sys.country}
      </h3>
    </div>
  );
};

export default DisplayTemp;
