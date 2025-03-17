import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import getFormattedWeatherData from "./services/weatherService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currencyCity, setCurrencyCity] = useState({ q: "New York" });
  const [showLoader, setShowLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const infoToastId = useRef(null);

  const fetchWeather = async (currencyCity, units) => {
    const message = currencyCity.q ? currencyCity.q : "current location.";

    infoToastId.current = toast.info("Fetching weather for " + message, {
      hideProgressBar: true,
    });

    const formattedWeatherData = await getFormattedWeatherData({
      ...currencyCity,
      units,
    });
    return formattedWeatherData;
  };

  useEffect(() => {
    setShowLoader(true);
    setWeather(null);
    setErrorMessage(null);
    const weatherData = fetchWeather(currencyCity, units);
    weatherData.then((data) => {
      setTimeout(() => {
        toast.dismiss(infoToastId.current);
        setShowLoader(false);
        if (data.message) {
          setWeather(null);
          setErrorMessage(data.message);
          return;
        }
        setWeather(data);
        toast.update(infoToastId.current, {
          type: "success",
          autoClose: 2000,
          render: `Successfully fetched weather for ${data.name}, ${data.country}.`,
        });
      }, 2000); // adding some delay for the weather to be displayed
    });
  }, [currencyCity, units]);

  const formatBackground = () => {
    if (!weather) {
      return "from-cyan-700 to-blue-700";
    }
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700";
    }
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`max-w-screen-md w-full py-5 px-6 sm:px-10 md:px-16 lg:px-24 bg-gradient-to-br rounded-3xl shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setCurrencyCity={setCurrencyCity} isDisabled={showLoader} />
      <Inputs
        isDisabled={showLoader}
        setCurrencyCity={setCurrencyCity}
        units={units}
        setUnits={setUnits}
        inputSize='sm'
        fontSize='sm'
        rounded='md'
      />

      <div className='h-100 md:mt-8 md:h-80'>
        {showLoader ? (
          <div className='flex items-center justify-center md:my-6 xs:my-2'>
            <p className='text-white text-xl font-extralight'>{"Loading..."}</p>
          </div>
        ) : errorMessage ? (
          <div className='flex items-center justify-center md:my-6 xs:my-2'>
            <p className='text-white text-xl font-extralight'>{errorMessage}</p>
          </div>
        ) : (
          <>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
          </>
        )}
      </div>

      <ToastContainer autoClose={2000} theme='colored' newestOnTop={false} />
    </div>
  );
}

export default App;
