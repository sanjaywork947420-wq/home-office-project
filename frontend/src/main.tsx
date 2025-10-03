import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./tailwind.css";
import cssVariables from "./assets/colorsToCSS";
import { AppProvider } from "./CustomComponents/GLOBAL CONTEXT/GlobalContext";
const style = document.createElement("style");
style.innerHTML = cssVariables;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
