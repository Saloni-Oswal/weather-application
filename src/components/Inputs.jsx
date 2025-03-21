import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

const Inputs = ({ setCurrentCity, units, setUnits, isDisabled }) => {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    if (units !== e.currentTarget.name) {
      setUnits(e.currentTarget.name);
    }
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setCurrentCity({ q: city });
      setCity("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching your location...");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location successfully fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setCurrentCity({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
          disabled={isDisabled}
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type='text'
          placeholder='search for a city....'
          className='xs:text-xs sm:text-sm  md:text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearch
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button
          disabled={isDisabled}
          name='metric'
          className='xs:text-xs sm:text-sm  md:text-xl text-white font-light transition ease-out hover:scale-125'
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className='text-xl text-white mx-1'>|</p>
        <button
          disabled={isDisabled}
          name='imperial'
          className='txs:text-xs sm:text-sm md:text-xl text-white font-light transition ease-out hover:scale-125'
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
