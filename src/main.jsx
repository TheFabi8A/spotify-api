import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const accessToken = localStorage.getItem("spotifyAccessToken");

import ContextProvider from "./Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ContextProvider>
              <App />
              <Analytics />
            </ContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
