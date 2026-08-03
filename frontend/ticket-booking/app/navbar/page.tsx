"use client"
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'

interface NavBarProps {
  selectTab: string;
  setSelectTab: Dispatch<SetStateAction<string>>;
}

const NavigationBar: React.FC<NavBarProps> = ({ selectTab, setSelectTab }) => {
  return (
    <div className="flex flex-row gap-10 items-center justify-center py-3 bg-gray-500 sticky">
      <Link href="/profiles/user">
        <button
          type="button"
          onClick={() => setSelectTab("user")}
          className={`${selectTab === "user" ? 'font-bold' : 'font-light'}`}
        >
          User Tab
        </button>
      </Link>

      <Link href="/profiles/admin">
        <button
          type="button"
          onClick={() => setSelectTab("admin")}
          className={`${selectTab === "admin" ? 'font-bold' : 'font-light'}`}
        >
          Admin Tab
        </button>
      </Link>
    </div>
  )
}

export default NavigationBar