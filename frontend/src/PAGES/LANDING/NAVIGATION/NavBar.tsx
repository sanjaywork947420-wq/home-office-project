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

import { Link } from "react-router-dom";

export const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navItems = [
    { label: "Home", link: "#" },
    { label: "Dashboard", link: "#" },
    { label: "Assets", link: "#" },
    { label: "Complaints", link: "#" },
    { label: "Reports", link: "/resets" },
   
  ];
  const dropdowns = {
    
    Management: [
      { label: "Task Assignment", link: "#" },
      { label: "AMC Requests", link: "#" },
      { label: "BR Certificates", link: "#" },
    ],
    Resources: [
      { label: "Knowledge Base", link: "#" },
      { label: "Manuals & Drivers", link: "#" },
      { label: "IT Guidelines", link: "#" },
    ],
    Admin: [
      { label: "Notifications", link: "#" },
      { label: "Admin Panel", link: "#" },
      { label: "Developer Tools", link: "#" },
    ],
   
  };

  return (
    <div className="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-3 h-full shadow-md ">
      <h2 className="text-xl font-bold">Centralized IT Portal</h2>

      <div className="flex gap-6 items-center">
        {navItems.map((item, idx) => (
          <Link key={idx} to={item.link} className="hover:text-gray-300">
            {item.label}
          </Link>
        ))}

        {Object.keys(dropdowns).map((key, idx) => (
          <div key={idx} className="relative">
            <button
              onClick={() => setDropdownOpen(dropdownOpen === key ? null : key)}
              className="flex items-center gap-1 hover:text-gray-300"
            >
              {key} <ChevronDown size={16} />
            </button>

            {dropdownOpen === key && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-xl shadow-lg overflow-hidden z-50"
              >
                {dropdowns[key].map((item, i) => (
                  <Link
                    key={i}
                    to={item.link}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}


          <Link  to="/" className="hover:bg-red-500 bg-red-400 p-2 rounded ">
            logout
          </Link>
      </div>
    </div>
  );
};
