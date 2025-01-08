import React from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Context>
);
