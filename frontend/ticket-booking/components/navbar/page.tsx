"use client";

import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface NavBarProps {
  selectTab: string;
  setSelectTab: Dispatch<SetStateAction<string>>;
}

const NavigationBar: React.FC<NavBarProps> = ({
  selectTab,
  setSelectTab,
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 py-4">
        <Link href="/profiles/user">
          <button
            onClick={() => setSelectTab("user")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectTab === "user"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            👤 User
          </button>
        </Link>

        <Link href="/profiles/admin">
          <button
            onClick={() => setSelectTab("admin")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectTab === "admin"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            🛠 Admin
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;