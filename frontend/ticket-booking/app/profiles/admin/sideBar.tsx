"use client";

import React from "react";

interface SideBarProps {
  select: string;
  setSelect: (value: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ select, setSelect }) => {
  const baseClasses =
    "sm:flex-none sm:w-full sm:justify-start flex items-center justify-center " +
    "sm:text-lg text-xs font-inter text-gray-800 " +
    "px-[12px] py-[6px] sm:px-[16px] sm:py-[8px] " +
    "rounded-[6px] border border-transparent " +
    "hover:bg-gray-100 transition-colors cursor-pointer";

  const activeClasses = "bg-gray-300 text-gray-900 font-medium shadow-sm";
  const inactiveClasses = "bg-white hover:bg-gray-100";

  return (
    <div className="w-full">
      <h1 className="sticky text-gray-900 font-instrument-serif sm:text-7xl text-[40px]"></h1>

      <div className="flex-wrap px-[10px] sm:px-0 bg-white items-center justify-center sm:items-start sm:justify-start rounded-[6px] flex sm:flex-col flex-row sm:space-y-[12px] sm:mt-[39px] gap-[5px] py-1 md:sticky md:top-5 self-start">
        
        <div
          onClick={() => setSelect("trains")}
          className={`${baseClasses} ${select === "trains" ? activeClasses : inactiveClasses}`}
        >
          <p>Trains</p>
        </div>

        <div
          onClick={() => setSelect("departures")}
          className={`${baseClasses} ${select === "departures" ? activeClasses : inactiveClasses}`}
        >
          <p>Departures</p>
        </div>

        <div
          onClick={() => setSelect("stations")}
          className={`${baseClasses} ${select === "stations" ? activeClasses : inactiveClasses}`}
        >
          <p>Stations</p>
        </div>

        <div
          onClick={() => setSelect("fares")}
          className={`${baseClasses} ${select === "fares" ? activeClasses : inactiveClasses}`}
        >
          <p>Fares</p>
        </div>

        <div
          onClick={() => setSelect("revenue")}
          className={`${baseClasses} ${select === "revenue" ? activeClasses : inactiveClasses}`}
        >
          <p>Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;