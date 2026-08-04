"use client"

import React from "react"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

interface DropDownMenuProps {
  title: string
  options: number[] | undefined
  labels: string[] | undefined
  styleMenu: string
  styleItem: string
  select: number | null
  setSelect: (value: number) => void
}

const DropdownMenu: React.FC<DropDownMenuProps> = ({
  title,
  options,
  labels,
  styleMenu,
  styleItem,
  select,
  setSelect,
}) => {
  const ChevronUpDownThinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`size-2 ${props.className ?? ""}`}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  )

  const hasSelection = select !== null && select !== undefined
  const displayLabel =
    hasSelection && labels
      ? labels[options?.indexOf(select) ?? -1] ?? title
      : title

  return (
    <Menu>
      <MenuButton
        className={`
          flex flex-row items-center justify-between gap-5 
          ${styleMenu} 
          outline-none border border-muted-border 
          py-2.5 px-4 rounded-lg font-inter shadow-sm
          transition duration-150 ease-in-out
          data-[hover]:bg-gray-50 data-[open]:bg-gray-50
        `}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronUpDownThinIcon className="text-gray-500 w-[20px] h-[20px]" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom"
        className={`
          ${styleItem}
          min-w-[var(--button-width)]   
          mt-1.5 bg-white border border-gray-200 rounded-lg 
          shadow-lg ring-1 ring-black/5
          transition duration-100 ease-out
          data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:-translate-y-1
          data-[enter]:duration-100
          data-[leave]:duration-75
          focus:outline-none
          origin-top
        `}
      >
        {options &&
          labels &&
          options.map((item, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => setSelect(item)}
                  className={`
                    flex w-full items-center px-4 py-2.5 text-sm font-inter text-gray-900
                    transition-colors duration-100
                    ${active ? "bg-gray-100 text-gray-900" : ""}
                    ${select === item ? "bg-gray-50 font-medium" : ""}
                  `}
                >
                  {labels[index]}
                </button>
              )}
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  )
}

export default DropdownMenu