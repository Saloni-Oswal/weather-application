import React from "react";
import { formatToLocalTime } from "../services/weatherService";

const TimeAndLocation = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <>
      <div className='flex items-center justify-center md:my-6 my-3'>
        <p className='text-white font-extralight xs:text-xs sm:text-sm md:text-xl'>
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-white xs:text-xs sm:text-sm md:text-3xl font-medium'>{`${name}, ${country}`}</p>
      </div>
    </>
  );
};

export default TimeAndLocation;
