import React from "react";
import { getLocalTime } from "../services/weatherService";

const TimeAndLocation = ({ weather: { timezone, name, country } }) => {
  return (
    <>
      <div className='flex items-center justify-center md:my-6 my-3'>
        <p className='text-white font-extralight xs:text-xs sm:text-sm md:text-xl'>
          {getLocalTime(timezone)}
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-white xs:text-xs sm:text-sm md:text-3xl font-medium'>{`${name}, ${country}`}</p>
      </div>
    </>
  );
};

export default TimeAndLocation;
