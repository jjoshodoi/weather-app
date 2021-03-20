const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

export const getCurrentWeatherData = async (query) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${WEATHER_API_KEY}`;
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  throw new Error(response.statusText);
};

export const getCurrentForecast = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}`;
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  throw new Error(response.statusText);
};
