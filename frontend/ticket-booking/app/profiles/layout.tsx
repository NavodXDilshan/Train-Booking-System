"use client"
import {useState} from 'react';
import NavBar from "@/app/navbar/page";


export default function({
    children,
}:{
    children: React.ReactNode;
}){
    const [select, setSelect] = useState<string>("user");
    return(

        <div className="min-h-screen flex flex-col w-full ">
            
          <div className="">
            <NavBar selectTab={select} setSelectTab={setSelect} />
            <main className="flex-1">
                {children}
            </main>
          </div>
        </div>

    )
}
