import React from 'react';

interface FareProps {
  fare: string | null;
}

const FareBox: React.FC<FareProps> = ({ fare }) => {
  return (
    <div className="
      w-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 px-6
      py-5 rounded-xl space-y-4 ">
      <p className="  text-gray-500 text-sm font-medium tracking-wide uppercase ">
        Fare for the journey</p>

      {
        fare ? (
          <div className="flex items-baseline gap-2">
            <span className="text-gray-700 font-semibold text-xl font-sans">
              LKR
            </span>

            <span className="text-black font-black text-5xl font-mono tracking-tight ">
              {fare}
            </span>
          </div>
        ) : (
          <p className="text-gray-400 text-4xl font-bold">
            -
          </p>
        )
      }
    </div>
  );
};

export default FareBox;