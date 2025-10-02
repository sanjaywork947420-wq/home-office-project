import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ColorPalette } from "./CustomComponents/ColorPalette";
import { colors } from "./assets/ColorsObject";
import Home from "./PAGES/HOME/Home";

import LandingSample from "./PAGES/LANDING/LandingSample";
import SignupForm from "./CustomComponents/FORMS/SignupForm";

import styles from "./CustomComponents/css styles/NavbarStyles.module.css";
import SetPassword from "./CustomComponents/FORMS/SetPassword";
import ApplyPasswordReset from "./CustomComponents/FORMS/ApplyPasswordReset";
import SampleTable from "./CustomComponents/Tables/Profile";
import ResetTable from "./CustomComponents/SideBar components/PasswordReset/ResetTable";
import Layout from "./PAGES/LANDING/LAYOUT/Layout";

import ResetPasswordWithSecurityQuestion from "./PAGES/AUTH/ResetPasswordWithSecurityQuestion";
import SignUp from "./PAGES/AUTH/SignUp";
import DashBoard from "./PAGES/DASHBOARD/DashBoard";

// Flatten nested colors to key-value pairs for CSS variables
const flattenColors = Object.entries(colors).reduce(
  (acc, [category, group]) => {
    Object.entries(group).forEach(([name, value]) => {
      acc[name] = value;
    });
    return acc;
  },
  {} as Record<string, string>
);

export default function App() {
  // Generate CSS variable string
  const cssVars = Object.entries(flattenColors)
    .map(([name, value]) => `--color-${name}: ${value};`)
    .join("\n");

  return (
    <>
      {/* Inject CSS variables globally */}
      <style>{`:root { ${cssVars} }`}</style>

      <div
        className="
          flex flex-col
          h-[100vh]
          justify-center
        "
      >
        {/* Navigation */}
        {/* <nav className="mb-6 space-x-4 p-6 fixed h-[50px] top-[0] text-white bg-brand-primary-dark w-[100%] flex items-center ">
          <Link to="/" className={`${styles.navbarlink}`}>
            Home
          </Link>
          <Link to="/colors" className={`${styles.navbarlink}`}>
            Color Palette
          </Link>
          <Link to="/landing" className={`${styles.navbarlink}`}>
            Landing page
          </Link>
          <Link to="/table">table</Link>
        </nav> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/forgot-password"
            element={<ResetPasswordWithSecurityQuestion />}
          />{" "}
          {/* here the above path is directly rendering a ui form but later on u should make a page which can be called dynamically to render all thee kind o f form don not use teh form directly in the pages as to make them re-useable */}
          <Route path="/password-reset" element={<SetPassword />} />{" "}
          {/* here the above path is directly rendering a ui form but later on u should make a page which can be called dynamically to render all thee kind o f form don not use teh form directly in the pages as to make them re-useable */}
          <Route
            path="/apply-for-pasword-reset"
            element={<ApplyPasswordReset />}
          />{" "}
          {/* here the above path is directly rendering a ui form but later on u should make a page which can be called dynamically to render all thee kind o f form don not use teh form directly in the pages as to make them re-useable */}
          {/* this is a tempory elemt s */}
          <Route path="/colorsTempo" element={<ColorPalette />} />
          <Route element={<Layout />}>
            <Route path="/landing" element={<LandingSample />} />
            <Route path="/resets" element={<ResetTable />} />
            <Route path="/profile" element={<SampleTable />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
