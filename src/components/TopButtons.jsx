import React from "react";

const cities = [
  {
    id: 1,
    title: "London",
  },
  {
    id: 2,
    title: "Singapore",
  },
  {
    id: 3,
    title: "Tokyo",
  },
  {
    id: 4,
    title: "Paris",
  },
];

const TopButtons = ({ setCurrentCity, isDisabled }) => {
  return (
    <div className='flex items-center justify-between my-6'>
      {cities.map((city) => (
        <button
          disabled={isDisabled}
          key={city.id}
          className='text-lg font-medium text-white'
          onClick={() => setCurrentCity({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
