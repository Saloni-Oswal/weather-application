const API_KEY = "ebdd5f63c4600762df5ce530b888ae98";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  if (data && data.cod !== 200) {
    return data;
  }
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    timezone,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams)
    .then(formatCurrentWeather)
    .catch(() => console.log("Error"));
  return { ...formattedCurrentWeather };
};

const getFormattedTime = (shiftedTime, options) => {
  const shiftedDate = new Date(shiftedTime);
  const offset = shiftedDate.getTimezoneOffset(); // offset in minutes
  shiftedDate.setHours(shiftedDate.getHours() + offset / 60); // adjust hours
  return shiftedDate.toLocaleString("en-US", options); // return local time
};

const getSunriseAndSunsetTimings = (secs, zone, options) => {
  const shiftedTime = new Date((secs + zone) * 1000); // Convert seconds to milliseconds
  return getFormattedTime(shiftedTime, options);
};

const getLocalTime = (
  zone,
  options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
) => {
  const shiftedTime = Date.now() + zone * 1000; // Convert seconds to milliseconds
  return getFormattedTime(shiftedTime, options);
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { getLocalTime, iconUrlFromCode, getSunriseAndSunsetTimings };
