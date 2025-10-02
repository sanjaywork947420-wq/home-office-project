import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Settings,
  User,
  ChevronDown,
  Laptop,
  Database,
  Bell,
  FileText,
  BarChart2,
  Wrench,
  BookOpen,
  Code,
  Network,
} from "lucide-react";


import { KeyRound } from "lucide-react";
import { check } from "zod";
// Sidebar Component (Laptop/Desktop Oriented)
export const SideBar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <Home />, link: "/dashboard" },
    { name: "Profile", icon: <User />, link: "/profile" },
    { name: "Colors", icon: <Database />, link: "/colorsTempo" },
    { name: "Complaints ", icon: <Wrench />, link: "#" },
    { name: "Tasks", icon: <Laptop />, link: "#" },
    { name: "Resets", icon: <KeyRound />, link: "/resets", count: 5 ,check:true},
    { name: "Reports", icon: <BarChart2 />, link: "/reports" },
    { name: "Notifications", icon: <Bell />, link: "#" },
    
   
    { name: "Network Monitoring", icon: <Network />, link: "#" },
  ];

  return (
    <motion.div
      animate={{ width: open ? 260 : 70 }}
      className="hidden md:flex h-screen bg-gray-900 text-white flex-col shadow-xl"
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-lg font-bold transition-opacity ${open ? "opacity-100" : "opacity-0 hidden"}`}>
          IT Portal
        </h1>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-gray-800">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center justify-between  gap-4 p-3 mx-2 rounded-xl hover:bg-gray-800 transition"
          >
           <div className="left flex items-center gap-4 ">
             {item.icon}
            <span className={`${!open && "hidden"} `}>{item.name}</span>
           </div>

           <div className="right">
            { item.count > 0 && (<div className="right rounded-2xl text-sm bg-red-600 w-[20px] h-[20px] flex items-center justify-center ">
              {item.count}
            </div>)}
           </div>
          </a>
        ))}
      </nav>
    </motion.div>
  );
};
