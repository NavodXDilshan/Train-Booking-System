"use client"
import React, { useState } from 'react'
import SideBar from "@/app/profiles/admin/sideBar";
import Content from "@/app/profiles/admin/content";

const page = () => {
  const [select , setSelect] = useState<string>("trains");
  return (
    <div className='min-h-screen bg-white px-5 grid grid-cols-10'>
      <div className='grid col-span-3 '>
        <SideBar select={select} setSelect={setSelect} />
      </div>
      <div className='grid col-span-7 '>
        <Content select={select}/>

      </div>
    </div>
  )
}

export default page