import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

const TemperatureAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) => {
  return (
    <>
      <div className='flex items-center justify-center my-6 text-xl text-cyan-300'>
        <p>{details}</p>
      </div>

      <div className='flex flex-row items-center justify-between text-white my-3'>
        <img src={iconUrlFromCode(icon)} alt='' className='w-20' />
        <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
        <div className='flex flex-col space-y-2 items-start'>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilTemperature size={18} className='mr-1' />
            Real feel:
            <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilTear size={18} className='mr-1' />
            Humidity:
            <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
          </div>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilWind size={18} className='mr-1' />
            Wind:
            <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className='flex md:flex-row flex-col md:items-center justify-between text-white text-sm py-3'>
        <div className='flex items-center justify-between xs:flex-row md:w-3/5 '>
          <span className='flex items-center'>
            <UilSun />
            <p className='font-light ml-1'>
              Rise:
              <span className='font-medium ml-1'>
                {formatToLocalTime(sunrise, timezone, "hh:mm a")}
              </span>
            </p>
          </span>
          <p className='font-light'>|</p>

          <span className='flex items-center'>
            <UilSunset />
            <p className='font-light ml-1'>
              Set:
              <span className='font-medium ml-1'>
                {formatToLocalTime(sunset, timezone, "hh:mm a")}
              </span>
            </p>
          </span>
        </div>
        <p className='font-light invisible md:visible ml-5 mr-5'>|</p>
        <div className='flex items-center justify-between xs:flex-row md:w-2/5'>
          <span className='flex items-center'>
            <UilSun />
            <p className='font-light ml-1'>
              High:
              <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
            </p>
          </span>
          <p className='font-light'>|</p>

          <span className='flex items-center'>
            <UilSun />
            <p className='font-light ml-1'>
              Low:
              <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default TemperatureAndDetails;
