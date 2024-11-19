import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm flex justify-between items-center mx-auto">
      <div className="text-gray-500 font-semibold text-sm mt-2 uppercase tracking-wider w-1/2">
        {title}
      </div>
      <div className="text-gray-900 font-bold text-2xl mt-2 text-right w-1/2 break-words">
        {icon} {value}
      </div>
    </div>
  );
};

export default Card;
