import { useAppContext } from '@/CustomComponents/GLOBAL CONTEXT/GlobalContext';
import { NavBar } from '@/PAGES/LANDING/NAVIGATION/NavBar'
import { SideBar } from '@/PAGES/LANDING/NAVIGATION/SideBar'
import "./layout.css"
import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion';

export default function Layout() {
  const {state,updateState}=useAppContext();
  const open =state.open;
  return (
    
   <motion.div
  className="grid h-[100vh] grid-rows-[60px_1fr] overflow-hidden layout"
  animate={{ gridTemplateColumns: open ? "260px 1fr" : "70px 1fr" }}
  transition={{ type: "spring", stiffness: 200, damping: 25 }}
>


      <div className="top-nav bg-amber-200  col-span-12">
        <NavBar/>


      </div>

      <div className="sidebar  bg-red-600">
        <SideBar/>
      </div>

      <div className="outlet bg-blue-700 overflow-scroll ">
        bwlow is outlet
        <Outlet/>
      </div>
    </motion.div>
  )
}
