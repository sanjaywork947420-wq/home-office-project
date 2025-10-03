import React from "react";
import { SideBar } from "../../../CustomComponents/NAVIGATION/SideBar";
import { NavBar } from "../../../CustomComponents/NAVIGATION/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="bg-blue-200 w-[100vw] h-[100vh]  grid overflow-hidden grid-cols-5">
        <div className="nav col-span-5">
          <NavBar />
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="outlet bg-blue-400 col-span-4 flex justify-center  mt-12">
          <div className="content flex items-center flex-col pt-32">
           
            <Outlet/>
          </div>
        </div>
      </div>
      
    </>
  );
}
